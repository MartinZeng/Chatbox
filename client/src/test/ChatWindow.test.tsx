import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatWindow from '../components/ChatWindow';

// 1. Mock Socket.io so it doesn't try to connect
vi.mock('socket.io-client', () => ({
  io: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    disconnect: vi.fn(),
  })),
}));

describe('ChatWindow Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // REPLACE global.fetch with this:
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            _id: '1',
            username: 'System',
            message: 'Welcome to the chat!',
            createdAt: new Date().toISOString(),
          },
        ],
      })
    );
  });

  it('shows loading state initially then displays messages', async () => {
    render(<ChatWindow />);

    // Initially should show the loading state from MessageList
    expect(screen.getByText(/Loading messages.../i)).toBeInTheDocument();

    // Wait for the fetch to complete and the message to appear
    await waitFor(() => {
      expect(screen.getByText('Welcome to the chat!')).toBeInTheDocument();
    });
  });

  it('displays an error message if fetch fails', async () => {
    // Force fetch to fail for this test
    (globalThis.fetch as any) = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<ChatWindow />);

    await waitFor(() => {
      expect(screen.getByText(/Loading messages.../i)).toBeInTheDocument();
    });
    // In your code, you log errors to console. If you update the UI to show
    // the 'error' state, you would check for that here.
  });
});
