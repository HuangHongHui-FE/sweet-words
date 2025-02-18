// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'sweet-words-test-4fbkdgwd2395221',
        traceUser: true,
      });
    }

    this.globalData = {
      envId: 'sweet-words-test-4fbkdgwd2395221',
      // appid: 'wx4daaa035791760f0',
      // secret: '7a31ceda4e334b16ebb5c166f4df357b',
    };
  }
});
