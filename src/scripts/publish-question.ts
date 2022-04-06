import fs = require('fs');
import path = require('path');
import axios from 'axios';
// 18岁群机器人地址
const webHookUrl =
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=2f393c30-8a4f-4f50-b27a-c8cf033c210f';

const {question} = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../question.json')).toString()
);
let questionText = '冲冲冲！！！\n\n本周双指针问题哦！！！\n\n';
for (const item of question) {
  let temp = '';
  if (item.url !== '') {
    temp = `题目是：${item.title}\n题目地址是：${item.url}\n\n`;
  } else {
    temp = `题目是：${item.title}\n题目是：${item.question}\n\n`;
  }
  questionText += temp;
}
questionText += '请本周出题人记得周五定晚上会议室，互相吐槽各自写的代码哦';

const params = {
  msgtype: 'text',
  text: {
    content: questionText,
    mentioned_list: ['@all'],
  },
};

axios
  .post(webHookUrl, params)
  .then(() => {
    console.log('成功推送');
  })
  .catch(e => {
    console.log(e);
    console.log('推送失败');
  });
