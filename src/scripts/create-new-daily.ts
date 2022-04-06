import fs = require('fs');
import path = require('path');
import {UserNameToFolderNameType, nameType} from './interface';

const basicUrl = './daily';

const name = process.argv.slice(2, 3)[0].split('=')[1] as nameType;

const userNameToFolderName: UserNameToFolderNameType = {
  jontyy: 'jontyy',
  hcy: 'hcy',
  yujie: 'yujie',
};

const detect = (name: nameType): boolean => {
  return !!userNameToFolderName[name];
};

const createFile = (): void => {
  // 姓名匹配，创建对应文件夹
  if (detect(name)) {
    // 获取当前年月日
    const date = new Date();
    const Year = date.getFullYear();
    const Month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;

    // 查看是否有今年的文件夹，如果没有，新建
    const YearFolder = `${basicUrl}/${Year}`;
    try {
      fs.accessSync(YearFolder);
    } catch (e) {
      fs.mkdirSync(path.join(__dirname, '../', YearFolder));
    }

    // 查看是否有当月文件夹，如果没有，新建
    const MonthFolder = `${basicUrl}/${Year}/${Year}-${Month}`;
    try {
      fs.accessSync(MonthFolder);
    } catch (e) {
      fs.mkdirSync(path.join(__dirname, '../', MonthFolder));
    }

    // 查看是否有当天文件夹，如果没有，新建
    const DayFolder = `${basicUrl}/${Year}/${Year}-${Month}/${Year}-${Month}-${day}`;
    try {
      fs.accessSync(DayFolder);
    } catch (e) {
      fs.mkdirSync(path.join(__dirname, '../', DayFolder));
    }

    // 新建对应人的文件夹，以及TODO
    try {
      fs.accessSync(`${DayFolder}/${name}`);
    } catch (e) {
      fs.mkdirSync(path.join(__dirname, '../', DayFolder, name));
    }

    const writerName = `${DayFolder}/${name}`;

    // 查看是否有ts文件，如果有，新增ts文件
    try {
      fs.accessSync(`${writerName}/index.ts`);
      console.log('已经存在index.ts文件，请手动新建需要的文件');
    } catch (e) {
      fs.writeFileSync(path.join(__dirname, '../', `${writerName}/index.ts`), 'export {};\n');
      fs.writeFileSync(path.join(__dirname, '../', `${writerName}/question.md`), '');
    }
  } else {
    console.error('请正确输入姓名，可以查看scripts文件夹下的create-new-daily.ts文件');
  }
};

createFile();
