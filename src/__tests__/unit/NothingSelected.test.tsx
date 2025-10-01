import { render, screen } from '@testing-library/react';
import { NothingSelected } from '../../components/NothingSelected';

describe('NothingSelected', () => {
  it('renders correctly', () => {
    render(<NothingSelected />);
    expect(screen.getByText(/nothing selected/i)).toBeInTheDocument();
  });
});
