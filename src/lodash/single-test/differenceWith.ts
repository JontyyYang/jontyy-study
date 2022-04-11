import _ from '../index';

const test = (val: any, othVal: any) => {
  console.error(val + 2, othVal + 1, 'jontyyang 29-27');

  return val + 2 === othVal + 1;
};
const res = _.differenceWith([3.1, 2.2, 1.3, 1], [3.1, 2.5, 2], test);
console.error(res, 'jontyyang 36-42');
