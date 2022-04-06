import format from 'date-fns/format';
import fs from 'fs';
import path from 'path';

const fileName = process.argv[2].split('=')[1];
const basicUrl = './interview/';
const date = format(new Date(), 'YYYY-MM-DD');

const renderInterviewFile = () => {
  const newFileName = `${date}-${fileName}`;
  const newFilePath = `${basicUrl}${newFileName}.md`;
  try {
    fs.accessSync(newFilePath);
    console.log('重名了');
  } catch {
    fs.writeFileSync(path.join(__dirname, '../', `${newFilePath}`), '');
  }
};

renderInterviewFile();

export {};
