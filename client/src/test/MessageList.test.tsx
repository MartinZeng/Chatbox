import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MessageList from '../components/MessageList';

describe('MessageList Component', () => {
  const mockMessages = [
    {
      _id: '1',
      username: 'Alice',
      message: 'Hello World',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      username: 'Bob',
      message: 'Hey Alice!',
      createdAt: new Date().toISOString(),
    },
  ];

  const mockRef = { current: null };

  it('renders "Loading messages..." when list is empty', () => {
    render(<MessageList messages={[]} bottomRef={mockRef} />);
    expect(screen.getByText(/Loading messages.../i)).toBeInTheDocument();
  });

  it('renders the correct number of messages', () => {
    render(<MessageList messages={mockMessages} bottomRef={mockRef} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
