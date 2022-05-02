const drop = (array: any[], length = 1) => {
  if (!Array.isArray(array)) {
    return [];
  }
  const res = array.splice(0, length);
  console.error('裁剪的长度是', length);
  console.error('裁剪的内容是', res);
  console.error('结果是', array);

  return array;
};

export default drop;
