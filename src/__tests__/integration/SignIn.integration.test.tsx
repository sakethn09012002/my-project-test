import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignIn } from '../../features/auth/components/SignIn';
import '@testing-library/jest-dom';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('SignIn Integration', () => {
  it('renders the sign-in form', () => {
    render(<SignIn />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error on invalid login', async () => {
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid credentials' }),
      text: async () => JSON.stringify({ error: 'invalid_grant', error_description: 'Invalid credentials' }),
    });
    render(<SignIn />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'baduser' } });
  fireEvent.change(screen.getAllByLabelText(/password/i)[0], { target: { value: 'badpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('logs in successfully and redirects', async () => {
    
    const fakeAccessToken = [
      'header',
      btoa(JSON.stringify({
        resource_access: {
          'support-tool-client': { roles: ['admin'] },
        },
      })),
      'signature',
    ].join('.');
    const fakeRefreshToken = 'refresh.token';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: fakeAccessToken,
        refresh_token: fakeRefreshToken,
        token_type: 'bearer',
        expires_in: 3600,
      }),
    });
    
    const originalLocation = window.location;
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {
      ...originalLocation,
      replace: jest.fn(),
      href: '',
      assign: jest.fn(),
      reload: jest.fn(),
      toString: () => '',
    };
    
    sessionStorage.clear();
    render(<SignIn />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'gooduser' } });
  fireEvent.change(screen.getAllByLabelText(/password/i)[0], { target: { value: 'goodpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(sessionStorage.getItem('access_token')).toBe(fakeAccessToken);
      expect(sessionStorage.getItem('refresh_token')).toBe(fakeRefreshToken);
    });

  });
});
