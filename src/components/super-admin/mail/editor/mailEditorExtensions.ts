import { Extension, Node } from '@tiptap/react';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { MAIL_TEMPLATE_VALUES } from '@constants/data/mailData';
import { MAIL_VALUE_PATTERN } from '@utils/mailEditor';

export type MailButtonVariant = 'solid' | 'line';

export interface MailButtonAttributes {
  label: string;
  href: string;
  variant: MailButtonVariant;
}

export const MailButton = Node.create({
  name: 'mailButton',
  group: 'block',
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
        getAttrs: (element) => ({
          label: element.textContent,
          href: element.getAttribute('href'),
          variant: element.getAttribute('data-mail-button'),
        }),
      },
    ];
  },

  renderHTML({ node }) {
    return ['p', {}, ['a', { 'data-mail-button': node.attrs.variant, href: node.attrs.href }, node.attrs.label]];
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
