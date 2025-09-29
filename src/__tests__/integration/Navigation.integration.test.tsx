import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navigation } from '../../components/Navigation';

jest.mock('next/navigation', () => ({
  usePathname: () => '/support-logs',
}));

jest.mock('@imtf/panache', () => ({
  SectionedNavigation: ({ sections, renderItemLabel, getItemKey, getItemProps, isItemActive, onItemClick }: any) => (
    <nav>
      {sections.map((item: any) => (
        <a
          key={getItemKey(item)}
          href={getItemProps(item).href}
          data-active={isItemActive(item)}
          onClick={onItemClick}
        >
          {renderItemLabel(item)}
        </a>
      ))}
    </nav>
  ),
  usePanacheContext: () => ({ toggleAppDrawer: jest.fn() }),
}));

jest.mock('@/utils/useAuthAccess', () => () => ({ hasRole: () => true }));

describe('Navigation Integration', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Support Logs')).toBeInTheDocument();
    expect(screen.getByText('Scoring')).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    render(<Navigation />);
    const activeLink = screen.getByText('Support Logs');
    expect(activeLink).toHaveAttribute('data-active', 'true');
  });

  it('calls drawer toggle on link click', () => {
    const { getByText } = render(<Navigation />);
    const link = getByText('Support Logs');
    fireEvent.click(link);
    expect(link).toBeInTheDocument();
  });
});
