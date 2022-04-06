import fs = require('fs');
import Path = require('path');

// process.argv返回一个数组
// 数组第一个元素返回启动node.js进程的可执行文件的绝对路径 '/Users/jontyy/Desktop/life/Daily-Study/node_modules/.bin/ts-node',
// 第二个参数是当前执行的js文件路径'/Users/jontyy/Desktop/life/Daily-Study/scripts/create-new-topic.ts',
// 第三个参数是命令行参数

const runCreateNewTopic = (path: string) => {
  console.log(
    `命令行应该采用下面这种规范
    yarn topic topic="topicName"
    🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫🛫
    topicName是要具体新建的主题名`
  );
  const args = process.argv;

  const topicNameArr: string[] = args.splice(2);
  if (!topicNameArr) {
    console.log('请输入topicName');
    return;
  }
  if (topicNameArr.length > 1) {
    console.log('请只传一个参数');
    return;
  }
  const [topic, topicFolder] = topicNameArr[0].split('=');
  if (topic !== 'topic') {
    console.log('索引名应该是topic');
    return;
  }
  if (!topicFolder) {
    console.log('请输入新建的主题名');
    return;
  }
  // 获取topic下面主题名，不能重复，重复直接退出

  const files = fs.readdirSync(path);

  const exists = files.includes(topicFolder);

  if (exists) {
    console.log('已经存在同样名字的文件夹了，请确认');
    return;
  }
  fs.mkdirSync(Path.join(__dirname, '../', 'topic', topicFolder));
  console.log('成功创建', topicFolder, '文件夹', '😁');
};

runCreateNewTopic('./topic');
