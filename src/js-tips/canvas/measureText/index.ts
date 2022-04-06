export function measureText() {
  const dom = document.createElement('span');
  const body = document.querySelector("body");
  return (text: string, fontSize: number) => {
    dom.style.fontSize = fontSize + 'px';
    const textDom = document.createTextNode(text);
    dom.appendChild(textDom);
    
    body?.appendChild(dom);
    const size = dom.offsetWidth;
    body?.removeChild(dom);
    return size;
  }
}


export function measureTextByCanvas() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return (text: string, fontSize: number) => {
    if(!ctx) {
      return;
    }
    ctx.font = fontSize + 'px PingFang SC'; // 字体要和实际使用字体一致
    return ctx.measureText(text).width;
  }
}

const textArray = [...]; // length为54

useEffect(() => {
  const t1 = performance.now();
  const _measure = measureText();
  //const _measure = measureTextByCanvas();
  for(var i = 0; i < textArray.length;i++) {
    const text = textArray[i];
    _measure(text, 13)
  }
  console.log(performance.now()-t1);
}, [])