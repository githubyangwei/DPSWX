"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    CodeThis: 222
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: "测试-我要分享",
      desc: "测试",
      path: "http://wap.baidu.com",
      success: function success() {}
    };
  },
  //调用系统二维码扫描
  scanCodeClick: function scanCodeClick() {
    var _this = this;

    var that = this;
    var show;
    wx.scanCode({
      success: function success(res) {
        _this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        console.log(_this.show);
        that.setData({
          CodeThis: _this.show
        });
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 2000
        });
      },
      fail: function fail(res) {
        wx.showToast({
          title: "失败",
          icon: "success",
          duration: 2000
        });
      },
      complete: function complete(res) {}
    });
  },
  turnTo: function turnTo() {
    wx.navigateTo({
      url: '/pages/book/bookList?type=search'
    });
  }
  // onGotUserInfo:function(e){
  //   console.log(e)
  // },
  // onGotPhoneNumber:function(e){
  //   console.log(e)
  // }
});