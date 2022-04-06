@testable
class MyTestableClass {
  // ...
}

function testable(target: any) {
  target.isTestable = true;
}

// @ts-ignore
const a = MyTestableClass.isTestable;
console.error(a, 'jontyyang 22-05');
