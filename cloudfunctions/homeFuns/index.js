// 通过秘语 解析 拿到结果
const getAnswerByMiYu = require('./getAnswerByMiYu/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getAnswerByMiYu':
      return await getAnswerByMiYu.main(event, context);
  }
};
