const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
  const inputMiYu = event?.params?.inputMiYu || '';
  
  return await db.collection('sweet-words-miyu').where({
    secret: inputMiYu,
  }).get();
};