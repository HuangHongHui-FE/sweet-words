const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const inputMiYu = event?.params?.inputMiYu || '';
    const {
      OPENID,
    } = cloud.getWXContext();

    const userList = await db.collection('sweet-words-user').where({
      OPENID,
    }).get();

    // 新用户
    if (userList?.data?.length === 0) {
      await db.collection('sweet-words-user').add({
        data: {
          OPENID,
          time: new Date(),
        },
      });
      // 搜索历史添加下__todo
    }
    const answerList = await db.collection('sweet-words-miyu').where({
      secret: inputMiYu,
    }).get();

    return answerList;
  } catch {
  }
};