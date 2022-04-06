// 错误用法
useEffect(async () => {
  try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      const json = await response.json();
      setPosts(json.data.children.map(it => it.data));
  } catch (e) {
      console.error(e);
  }
}, []);


// 正确用法
function Example() {
  const [data, setData] = useState<unknown>(null)

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('api/data')
      response = await response.json()
      setData(response)
    }

    fetchMyAPI()
  }, [])

  return <div>{JSON.stringify(data)}</div>
}

// 也可以这样用
function OutsideUsageExample({ userId }) {
  const [data, dataSet] = useState<any>(null)

  const fetchMyAPI = useCallback(async () => {
    let response = await fetch('api/data/' + userId)
    response = await response.json()
    dataSet(response)
  }, [userId]) 
  // if userId changes, useEffect will run again
  // if you want to run only once, just leave array empty []

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  return (
    <div>
      <div>data: {JSON.stringify(data)}</div>
      <div>
        <button onClick={fetchMyAPI}>manual fetch</button>
      </div>
    </div>
  )
}
