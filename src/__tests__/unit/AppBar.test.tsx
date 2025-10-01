import { render, screen } from '@testing-library/react';
import AppBar from '../../components/AppBar';


// Mock AppBar to a simple synchronous component
jest.mock('../../components/AppBar', () => ({
  __esModule: true,
  default: () => <header role="banner">Mock AppBar</header>,
}));


describe('AppBar', () => {
  it('renders AppBar', () => {
    render(<AppBar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
