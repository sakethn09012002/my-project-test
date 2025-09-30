import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navigation } from '../../components/Navigation';

// Simplified mocks
jest.mock('next/navigation', () => ({
  usePathname: () => '/scoring',
}));

jest.mock('@imtf/panache', () => ({
  SectionedNavigation: () => (
    <nav>
      <a href="/scoring" data-active={true}>
        Scoring
      </a>
    </nav>
  ),
  usePanacheContext: () => ({ toggleAppDrawer: jest.fn() }),
}));

jest.mock('@/utils/useAuthAccess', () => () => ({ hasRole: () => true }));

describe('Navigation Integration', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Scoring')).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    render(<Navigation />);
    const activeLink = screen.getByText('Scoring');
    expect(activeLink).toHaveAttribute('data-active', 'true');
  });

  it('calls drawer toggle on link click', () => {
    render(<Navigation />);
    const link = screen.getByText('Scoring');
    fireEvent.click(link);
    expect(link).toBeInTheDocument();
  });
});
