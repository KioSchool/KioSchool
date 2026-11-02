import { Heading } from '@tiptap/extension-heading';
import { Extension, InputRule, Node, textblockTypeInputRule } from '@tiptap/react';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { MAIL_TEMPLATE_VALUES } from '@constants/data/mailData';
import { isMailLinkValid, MAIL_VALUE_PATTERN } from '@utils/mailEditor';
import { getPastedMarkdown, markdownToHtml } from './mailMarkdown';

const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)$/;

const ALIGN_ATTRIBUTE = 'data-align';

export type MailButtonVariant = 'solid' | 'line';
export type MailAlignment = 'center' | 'right';

export interface MailButtonAttributes {
  label: string;
  href: string;
  variant: MailButtonVariant;
}

export const MailButton = Node.create({
  name: 'mailButton',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      label: { default: '' },
      href: { default: '' },
      variant: { default: 'solid' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-mail-button]',
        // 같은 우선순위면 일반 링크 규칙이 먼저 읽어 버튼이 링크로 바뀐다
        priority: 60,
        getAttrs: (element) => ({
          label: element.textContent,
          href: element.getAttribute('href'),
          variant: element.getAttribute('data-mail-button'),
        }),
      },
    ];
  },

  renderHTML({ node }) {
    return ['a', { 'data-mail-button': node.attrs.variant, href: node.attrs.href }, node.attrs.label];
  },

  // 수정할 수 없는 칸 안의 링크라 그대로 두면 누를 때 그 주소로 이동한다
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            click: (_, event) => {
              if ((event.target as HTMLElement).closest('a[data-mail-button]')) event.preventDefault();
              return false;
            },
          },
        },
      }),
    ];
  },
});

export const MailAlign = Extension.create({
  name: 'mailAlign',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          align: {
            default: null,
            parseHTML: (element) => element.getAttribute(ALIGN_ATTRIBUTE),
            renderHTML: (attributes) => {
              if (!attributes.align) return {};
              return { [ALIGN_ATTRIBUTE]: attributes.align };
            },
          },
        },
      },
    ];
  },
});

function getValueClass(value: string): string {
  if (MAIL_TEMPLATE_VALUES.includes(value)) return 'mail-value';
  return 'mail-value-unknown';
}

function buildValueDecorations(doc: ProseMirrorNode): DecorationSet {
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.isText || !node.text) return;

    Array.from(node.text.matchAll(MAIL_VALUE_PATTERN)).forEach((match) => {
      const start = position + match.index;
      decorations.push(Decoration.inline(start, start + match[0].length, { class: getValueClass(match[0]) }));
    });
  });

  return DecorationSet.create(doc, decorations);
}

export const MailValueHighlight = Extension.create({
  name: 'mailValueHighlight',

  addProseMirrorPlugins() {
    const key = new PluginKey<DecorationSet>('mailValueHighlight');

    return [
      new Plugin<DecorationSet>({
        key,
        state: {
          init: (_, { doc }) => buildValueDecorations(doc),
          apply: (transaction, previous) => {
            if (!transaction.docChanged) return previous;
            return buildValueDecorations(transaction.doc);
          },
        },
        props: {
          decorations: (state) => key.getState(state),
        },
      }),
    ];
  },
});

// 메일 제목은 두 단계뿐이라 # ## 는 큰 제목으로, 그보다 작은 것은 작은 제목으로 받는다
export const MailHeading = Heading.extend({
  parseHTML() {
    return [
      { tag: 'h1', attrs: { level: 2 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 3 } },
      { tag: 'h5', attrs: { level: 3 } },
      { tag: 'h6', attrs: { level: 3 } },
    ];
  },

  addInputRules() {
    return [
      textblockTypeInputRule({ find: /^#{1,2}\s$/, type: this.type, getAttributes: { level: 2 } }),
      textblockTypeInputRule({ find: /^#{3,6}\s$/, type: this.type, getAttributes: { level: 3 } }),
    ];
  },
});

export const MailMarkdown = Extension.create({
  name: 'mailMarkdown',

  addInputRules() {
    return [
      new InputRule({
        find: MARKDOWN_LINK_PATTERN,
        handler: ({ state, range, match }) => {
          const [, label, href] = match;
          if (!isMailLinkValid(href)) return null;

          state.tr.replaceWith(range.from, range.to, state.schema.text(label, [state.schema.marks.link.create({ href })]));
          return undefined;
        },
      }),
    ];
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        props: {
          handlePaste: (_, event) => {
            const text = getPastedMarkdown(event);
            if (text === null) return false;

            editor.commands.insertContent(markdownToHtml(text), { parseOptions: { preserveWhitespace: false } });
            return true;
          },
        },
      }),
    ];
  },
});
