import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('initializes with the default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 'initial_value'));
    expect(result.current[0]).toBe('initial_value');
  });

  it('updates state and persists to localStorage on setState', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 'initial_value'));

    act(() => {
      result.current[1]('updated_value');
    });

    expect(result.current[0]).toBe('updated_value');
    expect(JSON.parse(window.localStorage.getItem('test_key'))).toBe('updated_value');
  });

  it('hydrates from existing localStorage value', () => {
    window.localStorage.setItem('stored_key', JSON.stringify({ count: 42 }));
    const { result } = renderHook(() => useLocalStorage('stored_key', { count: 0 }));

    expect(result.current[0]).toEqual({ count: 42 });
  });
});
