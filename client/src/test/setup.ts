import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Check if we are in a test environment and mock the scroll function
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}
