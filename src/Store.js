export class Store {
  #items;

  constructor(initialItems = []) {
    this.#items = Array.isArray(initialItems) ? [...initialItems] : [];
  }

  get count() {
    return this.#items.length;
  }

  add(item) {
    if (!item || typeof item.name !== 'string' || typeof item.price !== 'number' || typeof item.qty !== 'number') {
      throw new TypeError('Invalid item structure');
    }
    if (item.price < 0 || item.qty < 0) {
      throw new RangeError('Price and qty cannot be negative');
    }
    this.#items.push({ ...item });
  }

  remove(name) {
    const prevLen = this.#items.length;
    this.#items = this.#items.filter((i) => i.name !== name);
    return this.#items.length !== prevLen;
  }

  find(name) {
    const found = this.#items.find((i) => i.name === name);
    return found ? { ...found } : null;
  }

  total() {
    return this.#items.reduce((sum, { price, qty }) => sum + price * qty, 0);
  }

  getItems() {
    return this.#items.map((i) => ({ ...i }));
  }

  static createItem(name, price, qty = 1) {
    return { name, price, qty };
  }
}

export class SortedStore extends Store {
  total() {
    const baseTotal = super.total();
    return Number(baseTotal.toFixed(2));
  }

  getSortedByName() {
    return this.getItems().sort((a, b) => a.name.localeCompare(b.name));
  }
}
