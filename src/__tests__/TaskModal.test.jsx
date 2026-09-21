import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskModal } from '../components/TaskModal';

describe('TaskModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(<TaskModal isOpen={false} onClose={() => {}} onSave={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with required form fields when open', () => {
    render(<TaskModal isOpen={true} onClose={() => {}} onSave={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Task/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitted empty', () => {
    const handleSave = vi.fn();
    render(<TaskModal isOpen={true} onClose={() => {}} onSave={handleSave} />);

    fireEvent.click(screen.getByRole('button', { name: /Save Task/i }));

    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('calls onSave with valid input data', () => {
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(<TaskModal isOpen={true} onClose={handleClose} onSave={handleSave} />);

    fireEvent.change(screen.getByLabelText(/Task Title/i), {
      target: { value: 'Refactor Redux to Hooks' }
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Replace dispatch boilerplate with modern React hooks' }
    });
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: 'HIGH' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Save Task/i }));

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Refactor Redux to Hooks',
        description: 'Replace dispatch boilerplate with modern React hooks',
        priority: 'HIGH'
      })
    );
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
