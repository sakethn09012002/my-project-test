import { render, screen, fireEvent } from '@testing-library/react';
import { DetailsView } from '../../components/DetailsView'; // ✅ named import

describe('DetailsView', () => {
  it('renders the Return button', () => {
    render(
      <DetailsView onClose={() => {}} classes={{}}>
        <div>Mock Content</div> {}
      </DetailsView>
    );
    expect(screen.getByRole('button', { name: /return/i })).toBeInTheDocument();
  });

  it('calls onClose when Return button is clicked', () => {
    const onClose = jest.fn();
    render(
      <DetailsView onClose={onClose} classes={{}}>
        <div>Mock Content</div> {}
      </DetailsView>
    );
    fireEvent.click(screen.getByRole('button', { name: /return/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
