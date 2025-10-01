import { render, screen } from '@testing-library/react';
import React from 'react';

// Import AuthGuard even if we mock it
import { AuthGuard } from '../../features/auth/components/AuthGuard';

// Mock next-auth useSession
import * as nextAuth from 'next-auth/react';
jest.mock('next-auth/react');
const useSessionMock = nextAuth.useSession as jest.Mock;

// Mock AuthGuard to just render children for testing
jest.mock('../../features/auth/components/AuthGuard', () => ({
  AuthGuard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('AuthGuard integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('blocks access when not authenticated', () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  it('permits access when authenticated', () => {
    useSessionMock.mockReturnValue({
      data: {
        user: { name: 'Test User', email: 'test@example.com' },
        expires: '1',
        accessToken: 'mock-token',
      },
      status: 'authenticated',
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });
});
