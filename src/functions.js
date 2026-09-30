
export function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  return [...new Set(arr)];
}


export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr) || typeof keyFn !== 'function') {
    throw new TypeError('Invalid arguments');
  }
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}


export function chunk(arr, size) {
  if (!Array.isArray(arr) || typeof size !== 'number' || size <= 0) {
    return [];
  }
  return arr.reduce((acc, _, index) => {
    if (index % size === 0) {
      acc.push(arr.slice(index, index + size));
    }
    return acc;
  }, []);
}


export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (Array.isArray(obj)) return obj.map((item) => deepClone(item));

  const copy = {};
  for (const [key, value] of Object.entries(obj)) {
    copy[key] = deepClone(value);
  }
  return copy;
}


export function memoize(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Argument must be a function');
  }
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function counter(initialValue = 0) {
  let count = typeof initialValue === 'number' ? initialValue : 0;
  return {
    inc() { count += 1; return count; },
    dec() { count -= 1; return count; },
    value() { return count; }
  };
}
