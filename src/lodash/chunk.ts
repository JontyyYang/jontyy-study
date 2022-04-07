/**
 * @description: 将数组拆分成多个 size 长度的数组，并且将这些数组组合成一个新的数组， 如果数组不能被分割成等长度的小数据，那么最后剩余的元素会合成一个数组
 * @param {*} originArray 原始数组
 * @param {*} size 分割长度
 * @return {*}
 */
const chunk = <T>(originArray: T[], size = 1): T[][] | T[] => {
  // 长度小于 1 的话， 应该设为默认值 1
  const sliceSize = size < 1 ? 1 : size;

  // 如果传入的是空数组， 那么就直接返回空数组
  if (!Array.isArray(originArray) || originArray.length === 0) {
    return [];
  }

  const result: T[][] = [];

  for (let i = 0; i < originArray.length; i += sliceSize) {
    result.push(originArray.slice(i, i + size));
  }
  return result;
};

export default chunk;
