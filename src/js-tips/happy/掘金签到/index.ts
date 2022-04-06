// https://juejin.cn/post/7000580115159597070
// pushPlus openApi

// 轻服务的结构
module.exports = async function (params, context) {
  // pushPlus的openApi， 用来推送消息到微信
  const pushUrl = 'http://www.pushplus.plus/send';
  // token是用来绑定pushPlus的，可以在pushPlus后台查看
  const token = '';
  // sessionId 和 cookie 在 README.md 中有说明
  const sessionId = '';
  const cookie = '';

  // 推送消息
  const sendMessage = ({title, content}) => {
    axios.post(pushUrl, {
      token,
      title,
      content,
    });
  };

  // 封装掘金请求
  const request = axios.create({
    baseURL: 'https://api.juejin.cn',
    headers: {
      cookie: `sessionid=${sessionId}`,
    },
  });

  // 查询今天是否已经签到
  const detectWeatherCheckIn = async () => {
    const res = await request.get(`/growth_api/v1/get_today_status?${cookie}`);
    return res.data.data;
  };

  // 查询今天是否还可以面否抽奖
  const detectWeatherlottery = async () => {
    const res = await request.get(`/growth_api/v1/lottery_config/get?${cookie}`);
    return res?.data?.data?.free_count === 0;
  };

  // 签到
  const checkIn = async () => {
    const res = await request.post(`/growth_api/v1/check_in/?${cookie}`);
    if (res.data?.data?.err_no !== 0) {
      sendMessage({
        title: '签到成功',
        content: '签到成功',
      });
    } else {
      sendMessage({
        title: '签到失败',
        content: JSON.stringify(res.data?.data),
      });
    }
  };

  // 抽奖
  const draw = async () => {
    const res = await request.post(`/growth_api/v1/lottery/draw/?${cookie}`);
    if (res?.data?.data.err_no !== 0) {
      sendMessage({
        title: '免费抽奖失败',
        content: '免费抽奖失败',
      });
    } else {
      sendMessage({
        title: '免费抽奖成功',
        content: '`恭喜抽到：${draw.data.lottery_name}`',
      });
    }
  };

  const run = async () => {
    const isCheckIn = await detectWeatherCheckIn();
    const isLottery = await detectWeatherlottery();

    if (isCheckIn && isLottery) {
      sendMessage({
        title: '全部完成',
        content: '已签到&已抽奖',
      });
      return;
    }

    if (!isCheckIn) {
      checkIn();
    }

    if (!isLottery) {
      draw();
    }
  };

  run();
};
