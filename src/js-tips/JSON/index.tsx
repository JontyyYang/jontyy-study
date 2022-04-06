try {
  // throw new Error('这是一个错误')
  throw 1;
} catch (e) {
  console.error(e, 'jontyyang 32-44');
  console.error(JSON.stringify(e), 'jontyyang 33-02');
  console.error(JSON.stringify(e.message), 'jontyyang 33-10');
  console.error(Object.getOwnPropertyNames(e), 'jontyyang 33-17');
  console.error(Object.getOwnPropertyDescriptors(e), 'jontyyang 33-23');
}

// const a = new Promise((resolve, reject) => {
//   // reject(new Error('这是一个错误'))
//   // reject(1)
//   reject({
//     name:'jontyyang',
//     age:18
//   })
// })

// a.catch(e => {
//   console.error(Object.getOwnPropertyDescriptors(e), 'jontyyang 34-11');
//   console.error(JSON.stringify(e), 'jontyyang 31-41');
// })
