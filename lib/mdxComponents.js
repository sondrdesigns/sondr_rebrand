import { PullQuote } from '@/components/blog/PullQuote';
import { ExhibitionImage } from '@/components/blog/ExhibitionImage';

export const mdxComponents = {
  pullquote: ({ children }) => <PullQuote>{children}</PullQuote>,
  exhibitionimage: (props) => <ExhibitionImage {...props} />,
};
