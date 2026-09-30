import { describe, it, expect } from 'vitest';
import { Store, SortedStore } from '../src/Store.js';

describe('Store & SortedStore Classes', () => {
  it('adds item and computes total', () => {
    const store = new Store();
    store.add(Store.createItem('Table', 50000, 2));
    expect(store.total()).toBe(100000);
    expect(store.count).toBe(1);
  });

  it('removes item by name', () => {
    const store = new Store();
    store.add({ name: 'Chair', price: 15000, qty: 4 });
    expect(store.remove('Chair')).toBe(true);
    expect(store.count).toBe(0);
  });

  it('handles edge case: find non-existent item', () => {
    const store = new Store();
    expect(store.find('Bed')).toBeNull();
  });

  it('throws RangeError on negative price', () => {
    const store = new Store();
    expect(() => store.add({ name: 'Sofa', price: -10, qty: 1 })).toThrow(RangeError);
  });

  it('SortedStore uses super.total() and sorts items', () => {
    const sorted = new SortedStore();
    sorted.add({ name: 'Table', price: 100.555, qty: 1 });
    sorted.add({ name: 'Armchair', price: 50, qty: 1 });

    expect(sorted.total()).toBe(150.56);
    expect(sorted.getSortedByName()[0].name).toBe('Armchair');
  });
});
