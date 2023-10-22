const appInstance = getApp();
Page({
  data: {
    // 秘语
    inputMiYu: '',
    // 答案  为空[]的提示
    answerList: [],
    isShowAnswer: false,
  },
  // 秘语输入
  inputMiChange(e) {
    this.setData({
      inputMiYu: e.detail.value,
      isShowAnswer: false
    });
  },
  // 点击解析
  analyzeInput() {
    const inputMiYu = this.data.inputMiYu;
    if (!inputMiYu) {
      return wx.showToast({
        title: '请先输入秘语',
        duration: 1000,
        icon: 'error',
        mask: true
      })
    }
    wx.showLoading({
      title: '解析中',
    })
    wx.cloud.callFunction({
      name: 'homeFuns',
      config: {
        env: appInstance?.globalData?.envId || ''
      },
      data: {
        type: 'getAnswerByMiYu',
        params: {
          inputMiYu
        },
      }
    }).then((resp) => {
      const answerList = resp?.result?.data?.[0]?.answer || [];
      console.log(answerList)
      if (answerList.length <= 0) {
        return wx.showToast({
          title: '秘语有误！',
          duration: 1000,
          icon: 'error',
          mask: true
        })
      }
      this.setData({
        answerList: answerList,
        isShowAnswer: true
      })
      wx.hideLoading();
    }).catch((e) => {
      wx.hideLoading();
    });
  },
  // 复制文字
  copyAnswer(e) {
    // 显示误导的文字，复制为正确的url
    if (e?.target?.dataset?.text) {
      wx.setClipboardData({
        data: e.target.dataset.text,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        },
        fail() {
          wx.showToast({
            title: '复制失败',
            duration: 1000,
            icon: 'error',
            mask: true
          })
        },
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})