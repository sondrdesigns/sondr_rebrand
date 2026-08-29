import { Node, mergeAttributes } from '@tiptap/core';

export const PullQuoteExtension = Node.create({
  name: 'pullQuote',
  group: 'block',
  content: 'block+',
  defining: true,

  parseHTML() {
    return [{ tag: 'pullquote' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['pullquote', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      togglePullQuote: () => ({ commands }) => commands.toggleWrap(this.name),
    };
  },
});
