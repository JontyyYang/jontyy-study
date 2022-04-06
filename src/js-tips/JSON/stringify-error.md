# JSON.stringify && error

1. 习惯性用 console.error 来debug -- 虽然直接 debug 代码会更好
2. 更习惯的是， 把一个大的对象利用 JSON.stringify 输出
3. 发现 try - catch 中的 err 是输出不出来的， 类似于

  ```js
    try {
      throw new Error('这是一个错误')
    } catch (e) {
      // 这边会稳定输出一个空对象
      console.error(JSON.stringify(e))
    }
  ```
4. 扒一下 TS 定义， 会发现 Error 的类型是不一样的。 

  ```js
    interface Error {
      name: string;
      message: string;
      stack?: string;
    }
  ```

5. 所以如果单纯希望 console.error的话 可以尝试, 会输出符合预期的值
  ```js
    console.error(JSON.stringify(e.message))
  ```

6. 其实本质的原因是 对象的基本属性 我们可以这样来看
    1. getOwnPropertyNames 看 e 到底有哪些属性
    2. getOwnPropertyDescriptors 看这些属性都是有哪些属性。
    3. 可以发现， 实际上， message 和 stack 的 enumerable 都是false， 所以不能被stringify

7. 这里再次测试了下，promise 的 reject。 发现如果reject出来的是Error格式的话， 依然是不可以的， 但是如果直接reject出来一个非 Error 的值， 那么就可以stringify
8. 这里突然觉得自己人傻了。 好像跑偏了， 不管是 promise 还是普通的 try-catch。 我们要关注的是 返回的是不是 Error 类型， 不能被stringify的是Error！