function createIncrement(i: number) {
  let value = 0;
  function increment() {
    value += i;
    console.log(value);
    // const message = `${value}`

    return function log() {
      const message = `${value}`;
      console.log(message, 'jontyyang');
    };
  }
  return increment;
}
const f = createIncrement(1);

const log = f();

f();
f();

log();

// "3"
