import _ from '../index';

const compactRes = _.compact([0, 1, false, 2, '', 3, undefined, null, 'a', NaN]);
// => [1, 2, 3]
console.error(compactRes, 'jontyyang 53-55');
