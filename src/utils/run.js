export default (fn, ...args) => {
  if (typeof fn !== 'function') return null;
  return fn(...args);
}