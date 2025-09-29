import { parseJwt } from '../../utils/parseJwt';

describe('parseJwt', () => {
  it('parses a valid JWT payload', () => {
    const token = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJmb28iOiJiYXIifQ',
      'signature',
    ].join('.');
    const result = parseJwt(token);
    expect(result).toHaveProperty('foo', 'bar');
  });

  it('returns empty object for invalid JWT', () => {
    const result = parseJwt('invalid.token');
    expect(result).toEqual({});
  });
});
