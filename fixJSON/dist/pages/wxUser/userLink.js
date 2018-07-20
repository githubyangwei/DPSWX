"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getData = function getData($obj, string) {
  return $obj.currentTarget.dataset[string];
};
exports.default = Page({
  data: {
    thisData: "",
    allData: "",
    titleStr: "",
    titleShowBol: ""
  },
  onLoad: function onLoad(option) {
    var type = option.linkType; //显示类型   1.用户连接 2.我的连接
    var userId = option.linkId; //获取用户ID
    var setTitle = "用户信息";
    if (type == "2") {
      setTitle = "我的连接";
    } else {
      this.setData({
        titleStr: "他连接的",
        titleShowBol: "active"
      });
    }
    wx.setNavigationBarTitle({
      title: setTitle,
      success: function success() {},
      fail: function fail(err) {}
    });
  }

});