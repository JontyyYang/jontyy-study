/**
 * @description: 返回一个新的数组， 这个数组里的元素是第一个数组中所有不在第二个数组中的元素
 * @param {any} array
 * @param {any} values
 * @return {*}
 */
type AnyType = any[];

// 从线上效果来看，引用类型的都会被当做不是相同元素， 所以可以直接比较基本数据类型
const difference = (array: AnyType, values: AnyType): AnyType => {
  const result: AnyType = [];

  array.forEach(item => {
    values.findIndex(value => value === item) === -1 && result.push(item);
  });

  return result;
};

export default difference;
