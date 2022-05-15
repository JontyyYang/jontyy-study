const dropRight = (array: any[], length = 1): any[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  const arrayLength = array.length;
  const startIndex = arrayLength - length > 0 ? arrayLength - length : 0;
  const spliceLength = length > arrayLength ? length : arrayLength;
  const res = array.splice(startIndex, spliceLength);
  console.error('裁剪的长度是', length);
  console.error('裁剪的内容是', res);
  console.error('结果是', array);

  return array;
};

export default dropRight;
