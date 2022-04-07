import _ from '../index';

const chunkRes1 = _.chunk([1, 2, 3], 2);
// => [[1, 2], [3]]
console.error(chunkRes1, 'jontyyang 46-21');

const chunkRes2 = _.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
console.error(chunkRes2, 'jontyyang 47-20');

const chunkRes3 = _.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
console.error(chunkRes3, 'jontyyang 47-29');
