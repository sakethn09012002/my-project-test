import { theme } from '../../theme';
describe('theme', () => {
  it('exports a theme object', () => {
    expect(theme).toBeDefined();
    expect(typeof theme).toBe('object');
  });
});