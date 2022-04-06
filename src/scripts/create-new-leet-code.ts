// node-js的文件系统
import fs = require('fs');
import Path = require('path');

const getFileName = (path: string): void => {
  // 因为leet-code的算法题都是以code-数字的，所以我提出所有的名称，组成数组
  const filesName: number[] = [];
  const files = fs.readdirSync(path);
  files.forEach(item => {
    // 存在一个.DS_Store的隐藏文件需要过滤，其实应该判断字符串是否以code开头。这种if判断不是很合理
    // 已经修复
    // item !== '.DS_Store' && filesName.push(Number.parseInt(item.split('-')[1]));
    item.startsWith('code-') && filesName.push(Number.parseInt(item.split('-')[1]));
  });

  // 计算出新的文件夹的名字
  const newFileName = `code-${Math.max(...filesName) + 1}`;

  // 创建文件夹
  fs.mkdirSync(Path.join(__dirname, '../', 'leet-code', newFileName));
  fs.mkdirSync(Path.join(__dirname, '../', 'leet-code', newFileName, 'jontyy'));

  // 新建文件
  fs.writeFileSync(Path.join(__dirname, '../', 'leet-code', newFileName, 'jontyy', 'index.ts'), '');
  fs.writeFileSync(
    Path.join(__dirname, '../', 'leet-code', newFileName, 'jontyy', 'README.md'),
    ''
  );
  fs.writeFileSync(Path.join(__dirname, '../', 'leet-code', newFileName, 'README.md'), '');
};

getFileName('./leet-code');
