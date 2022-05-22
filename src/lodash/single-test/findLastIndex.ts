import _ from '../index';

const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

const res1 = _.findLastIndex(users, function (o) {
  return o.user === 'pebbles';
});
console.error(res1, 'jontyyang 15-30');

// => 2

// The `_.matches` iteratee shorthand.
const res2 = _.findLastIndex(users, { user: 'barney', active: true });
console.error(res2, 'jontyyang 15-42');

// => 0

// The `_.matchesProperty` iteratee shorthand.
const res3 = _.findLastIndex(users, ['active', false]);
console.error(res3, 'jontyyang 15-50');

// => 2

// The `_.property` iteratee shorthand.
const res4 = _.findLastIndex(users, 'active');
console.error(res4, 'jontyyang 16-01');

// => 0
