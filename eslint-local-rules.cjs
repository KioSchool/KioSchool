const ts = require('typescript');

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
};
