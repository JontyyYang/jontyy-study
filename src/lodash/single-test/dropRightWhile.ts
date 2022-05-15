// import _ from '../index';
import lodash from '../index';

const users = [
  {user: 'barney', active: true},
  {user: 'fred', active: false},
  {user: 'pebbles', active: false},
];

// _.dropRightWhile(users, function (o) {
//   return !o.active;
// });
// // => objects for ['barney']

// // The `_.matches` iteratee shorthand.
// _.dropRightWhile(users, {user: 'pebbles', active: false});
// // => objects for ['barney', 'fred']

// // The `_.matchesProperty` iteratee shorthand.
// _.dropRightWhile(users, ['active', false]);
// // => objects for ['barney']

// // The `_.property` iteratee shorthand.
// _.dropRightWhile(users, 'active');
// // => objects for ['barney', 'fred', 'pebbles']

const res = lodash.dropRightWhile(users, function (o) {
  return !o.active;
});
console.error(res, 'jontyyang 28-48');

// => objects for ['barney']

// The `_.matches` iteratee shorthand.
lodash.dropRightWhile(users, {user: 'pebbles', active: false});
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
lodash.dropRightWhile(users, ['active', false]);
// => objects for ['barney']

// The `_.property` iteratee shorthand.
lodash.dropRightWhile(users, 'active');
