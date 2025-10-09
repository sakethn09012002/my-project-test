import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignIn } from '../../features/auth/components/SignIn';

// Mock the auth module
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

describe('SignIn Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders the Sign In button', () => {
    render(<SignIn />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls signIn and stores tokens on successful login', async () => {
    const { signIn } = require('@/auth');
    signIn.mockImplementation(async () => {
      sessionStorage.setItem('access_token', 'fake-access-token');
      sessionStorage.setItem('refresh_token', 'fake-refresh-token');
    });

    render(<SignIn />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
      expect(sessionStorage.getItem('access_token')).toBe('fake-access-token');
      expect(sessionStorage.getItem('refresh_token')).toBe('fake-refresh-token');
    });
  });

  it('calls signIn on failed login', async () => {
    const { signIn } = require('@/auth');
    signIn.mockRejectedValue(new Error('Login failed'));

    render(<SignIn />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1);
    });
  });
});
