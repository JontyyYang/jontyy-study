### 简单的hook过时闭包

```js
const Component = (props) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}> 加1 </button>
    </div>
  );
}
```

表现： 不断的点击按钮， 不断的输出0

原因：这个useEffect只在这个组件第一次加载的时候加载， 这个时候获取到的count是0，并且useEffect形成了一个闭包。 所以始终输出0

解决：useEffect增加一个依赖，当依赖变更的时候也变更

```js
const Component = (props) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [count]); // 看这里

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}> 加1 </button>
    </div>
  );
}
```



### 当不光js需要，页面【setState】渲染也需要

```js
const Component = (props) => {
  const [count, setCount] = React.useState(0);

  function handle1() {
    setTimeout(function delay() {
      setCount(count + 2);
      console.log(`Count: ${count}`);
    }, 2000);
  }

  function handle2() {
    setCount(count + 1);
  }

  return (
    <div>
      {count}
      <button onClick={handle1}>Increase1</button>
      <button onClick={handle2}>Increase2</button>
    </div>
  );
}
```

表现： 点击Increase1 快速点击Increase2  页面会先变成1 在变成2，但是始终输出0

原因：setState都是异步的， 先点击， 输出了0，再点击，这个时候获取的还是之前的0， 0+2是2， 但是，由于，setCount(count+2)是在console之后， 所以输出的还是0

初步解决：setState参数使用函数

```js
const Component = (props) => {
  const [count, setCount] = React.useState(0);

  function handle1() {
    setTimeout(function delay() {
      setCount(count => count + 2); // 看这里
      console.log(`Count: ${count}`);
    }, 2000);
  }

  function handle2() {
    setCount(count + 1);
  }

  return (
    <div>
      {count}
      <button onClick={handle1}>Increase1</button>
      <button onClick={handle2}>Increase2</button>
    </div>
  );
}
```

表现：页面从0变成1，在变成3， 单数输出的依然是0 

原因： setCount 的参数变成了函数， 它不在取闭包里的值，但是console依然是， 所以依然是一开始的值

解决： 引入ref

```js
const Component = (props) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(count);

  function handle1() {
    setTimeout(function delay() {
      countRef.current += 2;
      console.log(`CountRef: ${countRef.current}`); // 看这里
    }, 2000);
  }

  function handle2() {
    countRef.current += 1;
  }

  return (
    <div>
      {countRef.current}
      <button onClick={handle1}>Increase1</button>
      <button onClick={handle2}>Increase2</button>
    </div>
  );
}
```

表现： 输出正确， 但是页面渲染的始终是0

原因： ref不影响页面渲染

解决： setState和Ref结合使用

```js
const Component = (props) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(count);

  function handle1() {
    setTimeout(function delay() {
      setCount(count => count + 2);
      countRef.current += 2;
      console.log(`Count: ${count}`);
      console.log(`CountRef: ${countRef.current}`)
    }, 2000);
  }

  function handle2() {
    setCount(count + 1);
    countRef.current += 1;
  }

  return (
    <div>
      {count}
      <button onClick={handle1}>Increase1</button>
      <button onClick={handle2}>Increase2</button>
    </div>
  );
}
```