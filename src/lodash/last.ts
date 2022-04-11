const last = (array: any[]) => {
  const length = Boolean(array) ? array.length : 0;
  return length > 0 ? array[array.length - 1] : undefined;
};

export default last;
