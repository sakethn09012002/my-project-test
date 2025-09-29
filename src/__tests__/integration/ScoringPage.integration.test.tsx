import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScoringPage from '../../app/scoring/page';

describe('ScoringPage Integration', () => {
  it('renders the schedule scoring UI', () => {
    render(<ScoringPage />);
    expect(screen.getByText('Schedule the Scoring')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /schedule/i })).toBeInTheDocument();
  });

  it('shows alert with selected date when scheduled', () => {
    window.alert = jest.fn();
    render(<ScoringPage />);
    const dateInput = screen.getByLabelText('Select Date');
    const scheduleButton = screen.getByRole('button', { name: /schedule/i });
    fireEvent.change(dateInput, { target: { value: '2025-09-15' } });
    fireEvent.click(scheduleButton);
    expect(window.alert).toHaveBeenCalledWith('Scoring scheduled for 2025-09-15');
  });

  it('shows alert with [no date selected] if no date', () => {
    window.alert = jest.fn();
    render(<ScoringPage />);
    const scheduleButton = screen.getByRole('button', { name: /schedule/i });
    fireEvent.click(scheduleButton);
    expect(window.alert).toHaveBeenCalledWith('Scoring scheduled for [no date selected]');
  });
});
