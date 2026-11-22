const ts = require('typescript');

const FLEX_MIXINS = new Set(['colFlex', 'rowFlex']);
const MEDIA_QUERY_NAME = /MediaQuery$/;
const BLANK_LINE_AT_END = /\n[ \t]*\n[ \t]*$/;

const isStyledTag = (tag) => {
  if (tag.type === 'Identifier') return tag.name === 'css';
  if (tag.type === 'MemberExpression') return tag.object.type === 'Identifier' && tag.object.name === 'styled';
  if (tag.type === 'CallExpression') return tag.callee.type === 'Identifier' && tag.callee.name === 'styled';
  return false;
};

const kindOf = (expression) => {
  if (expression.type === 'CallExpression' && expression.callee.type === 'Identifier' && FLEX_MIXINS.has(expression.callee.name)) return 'flex';
  if (expression.type === 'Identifier' && MEDIA_QUERY_NAME.test(expression.name)) return 'media';
  return 'other';
};

const isDeclaration = (text) => /^[\w-]+\s*:/.test(text.trim());

// 최상위(중괄호 밖) 기준으로 일반 속성·flex·미디어쿼리가 어떤 순서로 나오는지 모은다.
const collectTopLevelEvents = (quasis, expressions) => {
  const events = [];
  let depth = 0;
  let statement = '';
  const flushStatement = () => {
    if (depth === 0 && isDeclaration(statement)) events.push({ kind: 'declaration' });
    statement = '';
  };
  quasis.forEach((quasi, index) => {
    for (const char of quasi.value.raw) {
      if (char === '{') {
        if (depth === 0) statement = '';
        depth += 1;
      } else if (char === '}') {
        depth = Math.max(0, depth - 1);
        if (depth === 0) statement = '';
      } else if (char === ';') {
        flushStatement();
      } else if (depth === 0) {
        statement += char;
      }
    }
    const expression = expressions[index];
    if (!expression || depth !== 0) return;
    const kind = kindOf(expression);
    if (kind === 'other') {
      statement += 'x';
      return;
    }
    statement = '';
    events.push({ kind, node: expression });
  });
  flushStatement();
  return events;
};

const isDomElement = (name) => name.type === 'JSXIdentifier' && /^[a-z]/.test(name.name);

const isMotionValueType = (type) => {
  if (type.isUnion()) return type.types.every((member) => member.flags & ts.TypeFlags.Undefined || isMotionValueType(member));
  return type.getSymbol()?.getName() === 'MotionValue';
};

module.exports = {
  'style-motion-values-only': {
    meta: {
      type: 'problem',
      docs: { description: '컴포넌트의 style에는 framer-motion의 MotionValue만 넘긴다' },
      messages: {
        notObject: 'style에는 객체 리터럴로 framer-motion의 MotionValue만 넘긴다.',
        notMotionValue:
          'style의 {{key}} 값이 MotionValue가 아니다. 정적인 값은 Styled 컴포넌트에 두고, 바뀌는 값은 props로 넘긴다. style에는 framer-motion의 MotionValue만 넘긴다.',
      },
      schema: [],
    },
    create(context) {
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      const services = sourceCode.parserServices ?? context.parserServices;
      if (!services?.program) return {};
      const checker = services.program.getTypeChecker();
      const typeOf = (node) => checker.getTypeAtLocation(services.esTreeNodeToTSNodeMap.get(node));

      return {
        JSXAttribute(node) {
          if (node.name.type !== 'JSXIdentifier' || node.name.name !== 'style') return;
          if (isDomElement(node.parent.name)) return;
          if (node.value?.type !== 'JSXExpressionContainer' || node.value.expression.type !== 'ObjectExpression') {
            context.report({ node, messageId: 'notObject' });
            return;
          }
          node.value.expression.properties.forEach((property) => {
            if (property.type !== 'Property') {
              context.report({ node: property, messageId: 'notObject' });
              return;
            }
            if (isMotionValueType(typeOf(property.value))) return;
            context.report({ node: property, messageId: 'notMotionValue', data: { key: sourceCode.getText(property.key) } });
          });
        },
      };
    },
  },
  'styled-flex-order': {
    meta: {
      type: 'layout',
      fixable: 'whitespace',
      docs: { description: 'styled 안에서 일반 CSS 속성 → colFlex/rowFlex → mediaQuery 순서를 지킨다' },
      messages: {
        declarationAfterFlex: '일반 CSS 속성은 {{flex}}() 앞에 둔다. 배치 순서: 일반 속성 → colFlex/rowFlex → mediaQuery.',
        mediaBeforeFlex: '{{media}}는 colFlex/rowFlex 뒤에 둔다. 배치 순서: 일반 속성 → colFlex/rowFlex → mediaQuery.',
        blankLineBeforeFlex: '{{flex}}() 앞에 빈 줄을 두지 않는다.',
      },
      schema: [],
    },
    create(context) {
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      return {
        TaggedTemplateExpression(node) {
          if (!isStyledTag(node.tag)) return;
          const { quasis, expressions } = node.quasi;

          expressions.forEach((expression, index) => {
            if (kindOf(expression) !== 'flex') return;
            const before = quasis[index].value.raw;
            if (!BLANK_LINE_AT_END.test(before)) return;
            context.report({
              node: expression,
              messageId: 'blankLineBeforeFlex',
              data: { flex: expression.callee.name },
              fix(fixer) {
                const quasiEnd = quasis[index].range[1] - 2;
                const text = sourceCode.text.slice(quasis[index].range[0], quasiEnd);
                const trimmed = text.replace(/\n[ \t]*\n([ \t]*)$/, '\n$1');
                return fixer.replaceTextRange([quasis[index].range[0], quasiEnd], trimmed);
              },
            });
          });

          const events = collectTopLevelEvents(quasis, expressions);
          const firstFlex = events.findIndex((event) => event.kind === 'flex');
          if (firstFlex === -1) return;
          const flexName = events[firstFlex].node.callee.name;
          events.forEach((event, index) => {
            if (event.kind === 'media' && index < firstFlex) {
              context.report({ node: event.node, messageId: 'mediaBeforeFlex', data: { media: event.node.name } });
            }
          });
          if (events.slice(firstFlex + 1).some((event) => event.kind === 'declaration')) {
            context.report({ node: events[firstFlex].node, messageId: 'declarationAfterFlex', data: { flex: flexName } });
          }
        },
      };
    },
  },
};
