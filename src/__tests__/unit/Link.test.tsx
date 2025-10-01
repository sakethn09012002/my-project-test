import { render } from '@testing-library/react';
import Link from '../../components/Link';

describe('Link', () => {
  it('renders with link style', () => {
    const { container } = render(<Link href="/" />);
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('renders without link style', () => {
    const { container } = render(<Link href="/" noLinkStyle />);
    expect(container.querySelector('a')).toBeInTheDocument();
  });
});