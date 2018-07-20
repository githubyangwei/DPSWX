'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    nodes: '',
    menuControl: ""
  },
  richTap: function richTap(e) {
    var that = this;
    var wWidth = wx.WIN_WIDTH;
    var wHeight = wx.WIN_HEIGHT;
    var xl = wWidth / 4,
        xh = xl * 3,
        yl = wHeight / 4,
        yh = yl * 3;
    var x = e.changedTouches["0"].clientX,
        y = e.changedTouches["0"].clientY;
    console.log(x, y);
    console.log(e);
    if (x > xl && x < xh && y > yl && y < yh) {
      that.setData({
        menuControl: that.data.menuControl == "" ? "active" : ""
      });
    } else {
      that.setData({
        menuControl: ""
      });
    }
  },
  turnToMenu: function turnToMenu() {
    wx.redirectTo({
      url: 'bookMenu'
    });
  },
  turnDown: function turnDown() {
    wx.redirectTo({
      url: 'line'
    });
  },
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: 'https://githubyangwei.github.io/test', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        var getData = res.data;
        wx.setNavigationBarTitle({
          title: getData.articleName,
          success: function success() {
            console.log('setNavigationBarTitle success');
          },
          fail: function fail(err) {
            console.log('setNavigationBarTitle fail, err is', err);
          }
        });

        //屏蔽&ldquo;   &mdash;   &rdquo;

        that.setData({
          nodes: getData.articleConetent
        });
      }
    });
  }
});