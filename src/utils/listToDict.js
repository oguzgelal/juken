export default (list = []) => list.reduce((acc, item) => ({
  ...acc,
  [item.id]: item
}), {});
