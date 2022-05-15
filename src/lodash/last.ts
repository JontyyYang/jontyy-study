const last = (array: any[]): any => {
  const length = array ? array.length : 0;
  return length > 0 ? array[array.length - 1] : undefined;
};

export default last;
