
// pages/personal/personal.js
import request from '../../utils/requset'
let startY;
let endY;
let MoveDistance;
let MoveY;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Covertranform: `translateY(0)`,
    Covertransition: '',
    UserInfo: {},
    RecentPlayList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let UserInfo = wx.getStorageSync('UserInfo');
    if (UserInfo) {
      this.setData({
        UserInfo: JSON.parse(UserInfo)
      });
      this.getUserRecentPlayList(this.data.UserInfo.userId);
      console.log(this.data.RecentPlayList);
    }
  },
  // 跳转到登陆界面
  loginPage() {
    let UserInfo = wx.getStorageSync('UserInfo');
    if (!UserInfo)
      wx.navigateTo({ url: "/pages/login/login" });
  },

  async getUserRecentPlayList(userId) {
    let RecentPlayData = await request('/user/record', { uid: userId, type: 0 });
    let index = 0;
    console.log(RecentPlayData);
    let RecentPlayList = RecentPlayData.allData.splice(0, 10).map(item => {
      item.id = index++;
      return item;
    });

    this.setData({
      RecentPlayList
    });
  },

  handleTouchstart(event) {
    // 获取手指点击开始坐标
    this.setData({
      Covertransition: ''
    })
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event) {
    MoveY = event.touches[0].clientY;
    MoveDistance = MoveY - startY;
    if (MoveDistance < 0)
      return;
    if (MoveDistance > 80) {
      return;
    }
    // 动态更新covertransform的值
    this.setData({
      Covertranform: `translateY(${MoveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    // console.log("end");
    this.setData({
      Covertranform: `translateY(0)`,
      Covertransition: 'transform 1s linear'
    })

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