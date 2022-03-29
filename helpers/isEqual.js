const isEqual = (iteratee = [], array, prop = null) => {
  return prop
    ? iteratee.filter((value, idx) => {
        if (idx < array.length) return value !== array[idx][prop];
      })
    : iteratee.filter((value, idx) => {
        if (idx < array.length) return value !== array[idx];
      });
};

module.exports = isEqual;
