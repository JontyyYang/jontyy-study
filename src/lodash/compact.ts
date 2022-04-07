/**
 * @description: 过滤数组中所有假值元素
 * @param {any} array
 * @return {*}
 */
const compact = (array: any[]): any[] => {
  return array.filter(item => Boolean(item));
};

export default compact;
