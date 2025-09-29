
import { fetcher } from '../../utils/fetcher';

// Mock @/auth only
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('fetcher', () => {
  const globalAny: any = global;
  const mockFetch = jest.fn();
  const mockAuth = require('@/auth').auth;

  beforeEach(() => {
    mockFetch.mockClear();
    mockAuth.mockClear();
    globalAny.fetch = mockFetch;
    process.env.API_URL = 'http://test-api';
  });

  afterAll(() => {
    delete globalAny.fetch;
    delete process.env.API_URL;
  });

  it('should call fetch with correct URL and headers', async () => {
    mockAuth.mockResolvedValue({ accessToken: 'abc123' });
    mockFetch.mockResolvedValue({
      ok: true,
      body: true,
      json: async () => ({ data: 42 }),
    });
    const result = await fetcher('test-endpoint');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api/licensing/api/test-endpoint',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer abc123',
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(result).toEqual({ data: 42 });
  });

  it('should throw 404 error', async () => {
    mockAuth.mockResolvedValue({ accessToken: 'abc123' });
    mockFetch.mockResolvedValue({ ok: false, status: 404 });
    await expect(fetcher('not-found')).rejects.toThrow('404, Not found');
  });

  it('should throw 500 error', async () => {
    mockAuth.mockResolvedValue({ accessToken: 'abc123' });
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    await expect(fetcher('server-error')).rejects.toThrow('500, internal server error');
  });

  it('should throw generic error for other status', async () => {
    mockAuth.mockResolvedValue({ accessToken: 'abc123' });
    mockFetch.mockResolvedValue({ ok: false, status: 403 });
    await expect(fetcher('forbidden')).rejects.toThrow('403');
  });

  it('should handle missing accessToken', async () => {
    mockAuth.mockResolvedValue(null);
    mockFetch.mockResolvedValue({
      ok: true,
      body: true,
      json: async () => ({ data: 'no token' }),
    });
    const result = await fetcher('no-token');
    expect(result).toEqual({ data: 'no token' });
  });
});
