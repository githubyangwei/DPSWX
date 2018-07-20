'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function onLoad() {
    console.log(this.data.msg);
    console.log(wx.canIUse('button.open-type.getUserInfo'));
    wx.getSetting({
      success: function success(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function success(res) {
              console.log(res.userInfo);
            }
          });
        }
      }
    });

    wx.login({
      success: function success(res) {
        console.log(res);
        if (res.code) {
          var sendCode = res.code;
          // var sendSecret="ffcc2a4affd3243c1f01ce15252c7a78";  //test程序

          var sendAppid = "wx7ce84b7d926d08b9";
          var sendSecret = "a2d35cbf9fbe672bed8e4fe6b936ee90";
          var authorization_code = "authorization_code";

          // var openid="o1xgJ44hnMMADEHzzdnRYpIw9Mvo";

          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + sendAppid + '&secret=' + sendSecret + '&js_code=' + sendCode + '&grant_type=' + authorization_code,
            header: {
              'content-type': 'application/json'
            },
            success: function success(rs) {

              console.log(rs);
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
  QrDownLoad: function QrDownLoad() {
    wx.showToast({
      title: "下载二维码",
      icon: "success",
      duration: 2000
    });
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  },
  getPhoneNumber: function getPhoneNumber(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
  }
});