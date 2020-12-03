// pages/login/login.js
import request from '../../utils/requset'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleInput(event) {
    // 获取data-type对应key的值然后更新Data
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    });

  },
  async login() {
    // 得到表单值
    let { phone, password } = this.data;
    if (!phone) {
      wx.showToast({
        title: '手机不能为空',
        icon: 'none'
      });
      return;
    }
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机格式不正确',
        icon: 'none'
      });
      return;
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      });
      return;
    }
    let LoginResult = await request('/login/cellphone', { phone, password });
    if (LoginResult.code === 200) {
      wx.showToast({
        title: '登陆成功'
      });
      // 将用户信息存储到本地
      wx.setStorageSync('UserInfo', JSON.stringify(LoginResult.profile));
      // 使用reLaunch 关闭所有界面，跳转到指定页面，
      
      // 使用该方法的原因在于使得指定的界面重新运行reload函数，载入更新后的数据
      wx.reLaunch({
        url: "/pages/personal/personal"
      });
    }
    else if (LoginResult.code === 501) {
      wx.showToast({
        title: '账号不存在',
        icon: 'none'
      });
    }
    else if (LoginResult.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      });
    }
    else {
      wx.showToast({
        title: '登陆失败',
        icon: 'none'
      });
    }
    return;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})