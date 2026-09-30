import { describe, it, expect, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';

describe('Functions & Closures', () => {
  it('unique: removes duplicates', () => {
    expect(unique([1, 1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('unique: throws on wrong type', () => {
    expect(() => unique(null)).toThrow(TypeError);
  });

  it('groupBy: groups by key', () => {
    const res = groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], (x) => x.type);
    expect(res.a.length).toBe(2);
  });

  it('chunk: splits array', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it('deepClone: deep copy of object and date', () => {
    const obj = { d: new Date(), a: [1] };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });

  it('memoize: caches execution', () => {
    const fn = vi.fn((x) => x + 1);
    const m = memoize(fn);
    m(2);
    m(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('counter: closure works', () => {
    const c = counter(5);
    expect(c.inc()).toBe(6);
    expect(c.dec()).toBe(5);
    expect(c.value()).toBe(5);
  });
});
