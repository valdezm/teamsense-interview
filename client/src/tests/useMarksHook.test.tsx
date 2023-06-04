import { renderHook } from '@testing-library/react'
import { describe, expect, it } from "vitest"
import { act } from 'react-dom/test-utils';
import useMarksHook from '../useMarksHook';

describe('useMarksHook', () => {
  it('should return the initial count value', () => {
    const { result } = renderHook(() => useMarksHook(10));
    expect(result.current[0]).toBe(10);
  });

  it('should increment the count value', () => {
    const { result } = renderHook(() => useMarksHook(10));
    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(20);
  });
});