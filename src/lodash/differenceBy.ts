/**
 * @description: 返回一个新的数组，首先使用迭代器对原数组和要排除的数组中每一个成员做处理，然后去除掉处理后的结果中的重复成员。返回的主体是原数组的成员
 * @param {*} array  原数组
 * @param {*} values  需要排除的数组
 * @param {*} iteratee  迭代器，是一个函数 |  字符串 | 数组 | 对象
 * @return {*}
 */
const differenceBy = (array: any[], values: any[], iteratee: ((target: any) => any) | string) => {
  const result: any[] = [];
  if (typeof iteratee === 'string') {
    // 如果是一个字符串， 那么我们认为, 前后两个数组都是数组对象
    array.forEach((item, idx) => {
      values.findIndex(value => value[iteratee] === item[iteratee]) === -1 &&
        result.push(array[idx]);
    });
  } else if (typeof iteratee === 'function') {
    const newArray = array.map(item => iteratee(item));
    const newValues = values.map(item => iteratee(item));

    newArray.forEach((item, idx) => {
      newValues.findIndex(value => value === item) === -1 && result.push(array[idx]);
    });
  }

  return result;
};

export default differenceBy;
