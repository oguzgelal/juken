// return a random item from an array
export default (arr = []) => {
  if (arr.length === 0) return -1;
  return (arr.length * Math.random()) << 0;
}