import _ from '../index';

const result = _.difference([3, 2, 1, {name: 1}, []], [4, 2, {name: 1}, []]);
// [ 3, 1, { name: 1 }, [] ]
console.error(result, 'jontyyang 28-37');
