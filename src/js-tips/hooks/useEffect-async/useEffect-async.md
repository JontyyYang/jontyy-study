# useEffect-async

1. 有些时候， 希望 useEffect 里的异步不走 then, 希望也走 async-await。 但是直接写会报错的额
2. Argument of type '() => Promise<void>' is not assignable to parameter of type 'EffectCallback'.
3. 这个时候，如果还希望继续使用 async-await ,需要在内部包装一个立即执行函数