const fill = (array: any[], value: any, startIndex = 0, endIndex = array.length): any[] => {
  const fillArray = [];
  const length = endIndex - startIndex;
  for (let i = 0; i !== length; i++) {
    fillArray.push(value);
  }
  array.splice(startIndex, length, ...fillArray);
  console.error(array, 'jontyyang 55-52');

  return array;
};

export default fill;
