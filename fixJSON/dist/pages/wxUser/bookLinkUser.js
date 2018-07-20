"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var page = 1;

exports.default = Page({
  data: {},
  // 下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    page = 1;
    console.log(page);

    // wx.request({
    //   url: 'https://xxx/?page=0',
    //   method: "GET",
    //   header: {
    //     'content-type': 'application/text'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       moment: res.data.data
    //     });
    //     // 设置数组元素
    //     that.setData({
    //       moment: that.data.moment
    //     });
    //     console.log(that.data.moment);
    //     // 隐藏导航栏加载框
    //     wx.hideNavigationBarLoading();
    //     // 停止下拉动作
    //     wx.stopPullDownRefresh();
    //   }
    // })

    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }, 1000);
  },
  //上拉加载
  onReachBottom: function onReachBottom() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: "玩命加载中"
    });
    // 页数+1
    page = page + 1;
    console.log(page);
    // wx.request({
    //   url: "https://xxx/?page=" + page,
    //   method: "GET",
    //   // 请求头部
    //   header: {
    //     "content-type": "application/text"
    //   },
    //   success: function(res) {
    //     // 回调函数
    //     var moment_list = that.data.moment;

    //     for (var i = 0; i < res.data.data.length; i++) {
    //       moment_list.push(res.data.data[i]);
    //     }
    //     // 设置数据
    //     that.setData({
    //       moment: that.data.moment
    //     });
    //     // 隐藏加载框
    //     wx.hideLoading();
    //   }
    // });

    setTimeout(function () {
      // 隐藏加载框
      wx.hideLoading();
    }, 1000);
  }
});