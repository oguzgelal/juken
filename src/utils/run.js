export default (fn, ...args) => {
  if (typeof fn === 'function') {
    fn(...args);
  }
}