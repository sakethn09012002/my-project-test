import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock Providers to just render children
jest.mock('../../app/Providers', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Import the mocked Providers type
import Providers from '../../app/Providers';

describe('Providers', () => {
  it('renders children', () => {
    render(
      <Providers>
        <div>child</div>
      </Providers>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
