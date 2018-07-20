'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    nodes: '',
    menuControl: "",
    titleArry: [],
    lineData: ""
  },
  showLog: function showLog() {
    wx.showConfirm("asfasfasf");
    return false;
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
  onLoad: function onLoad(option) {
    console.log(option.sid);
    var that = this;
    wx.request({
      url: 'https://githubyangwei.github.io/resource/plug/test', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        var getData = res.data;
        getData = wx.formatTree(getData, 'NODE_ID', 'RELATION_RELATED_ID', 'children');
        console.log(wx.prseTree(getData, 'children', 1));
        var startNum = getData[0].NODE_NUMBER;
        var titleArry = [];
        for (var i = 0; i < 5; i++) {
          titleArry.push(wx.intToChinese(startNum));
          startNum++;
        }
        console.log(getData);
        that.setData({
          titleArry: titleArry,
          lineData: getData
        });
      }
    });
  },
  turnToNode: function turnToNode() {
    wx.navigateTo({
      url: '../nodeList/nodeDetail'
    });
  }

});