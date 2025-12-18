export type Message = {
  _id?: string;
  message: string;
  username: string;
  createdAt?: string;
};

import { describe, it, expect } from 'vitest';

function formatTime(dateString: string | undefined) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

describe('formatTime utility', () => {
  it('returns empty string if date is undefined', () => {
    expect(formatTime(undefined)).toBe('');
  });

  it('formats a date string correctly', () => {
    const mockDate = '2023-10-27T10:30:00Z';
    // This result depends on your local timezone, but check if it's a string
    expect(typeof formatTime(mockDate)).toBe('string');
    expect(formatTime(mockDate)).toMatch(/\d{2}:\d{2}/);
  });
});

//cammbio/change(build message list)
interface MessageListProps {
  messages: Message[];
  currentUser?: string;
  bottomRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
  bottomRef,
}) => {
  // /Loading state
  if (messages.length === 0) {
    return <div> Loading messages...</div>;
  }

  return (
    <div className='message-list'>
      {messages.map((msg, index) => (
        <div key={msg._id || index} className='message-bubble'>
          <div className='message-header'>
            <span className='message-username'>{msg.username}</span>
            <span className='message-time'>{formatTime(msg.createdAt)}</span>
          </div>
          <div className='message-text'>{msg.message}</div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
