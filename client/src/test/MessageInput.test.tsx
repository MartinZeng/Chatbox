import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MessageInput from '../components/MessageInput';

describe('MessageInput Component', () => {
  const mockProps = {
    handleSend: vi.fn(),
    user: 'TestUser',
    message: '',
    setMessage: vi.fn(),
    setUser: vi.fn(),
  };

  it('renders both input fields and the send button', () => {
    render(<MessageInput {...mockProps} />);
    expect(screen.getByPlaceholderText(/Type your name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type your message/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('calls setUser when the username input changes', () => {
    render(<MessageInput {...mockProps} />);
    const nameInput = screen.getByPlaceholderText(/Type your name/i);

    fireEvent.change(nameInput, { target: { value: 'NewName' } });
    expect(mockProps.setUser).toHaveBeenCalledWith('NewName');
  });

  it('calls handleSend when the form is submitted', () => {
    render(<MessageInput {...mockProps} />);
    const form = screen.getByRole('button', { name: /send/i });

    fireEvent.click(form);
    expect(mockProps.handleSend).toHaveBeenCalledTimes(1);
  });
});
