export default (array, size) => {
  const chunks = [];
  
  let i = 0;
  while (i < array.length) {
    chunks.push(array.slice(i, size + i));
    i += size;
  }

  return chunks;
}
