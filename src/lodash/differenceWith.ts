/**
 * @description: 类似 difference， 但是可以额外接受一个 comparator 比较器。 可以调用比较 array 和 valuse 里面的元素，结果从第一个数组里找
 * @param {array} 原数组
 * @param {values} 需要排除的数组
 * @param {comparator} 比较器
 * @return {array}
 */

type AnyType = any[];

const differenceWith = (
  array: AnyType,
  values: AnyType,
  comparator: (oneItem: any, otherItem: any) => boolean
): AnyType => {
  const result: AnyType = [];

  // 这里依赖 comparator
  array.forEach(item => {
    values.findIndex(value => comparator(item, value)) === -1 && result.push(item);
  });

  return result;
};

export default differenceWith;
