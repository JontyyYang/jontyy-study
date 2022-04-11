import _ from '../index';

const res = _.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
console.error(res, 'jontyyang 36-42');

const res2 = _.differenceBy([{x: 2}, {x: 1}], [{x: 1}], 'x');
console.error(res2, 'jontyyang 55-47');

// => [{ 'x': 2 }]
