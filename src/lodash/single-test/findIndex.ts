import _ from '../index';

const users = [
  { user: 'barney', active: false },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true },
];

const res1 = _.findIndex(users, function (o) {
  return o.user === 'barney';
});
console.error(res1, 'jontyyang 39-07');

// => 0

// The `_.matches` iteratee shorthand.
const res2 = _.findIndex(users, { user: 'fred', active: false });
console.error(res2, 'jontyyang 55-33');

// => 1

// The `_.matchesProperty` iteratee shorthand.
const res3 = _.findIndex(users, ['active', false]);
console.error(res3, 'jontyyang 50-32');

// => 0

// The `_.property` iteratee shorthand.
const res4 = _.findIndex(users, 'active');
console.error(res4, 'jontyyang 32-04');

// => 2
