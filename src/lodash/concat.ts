const concat = (array: any[], ...args: any[]): any[] => {
  // JONTYY TODO
  // 这里后期需要改为深拷贝
  const newArray = [...array];

  args.forEach(item => {
    const pushItem = Array.isArray(item) ? item : [item];
    newArray.push(...pushItem);
  });

  return newArray;
};

export default concat;
