'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = Page({
  data: (_data = {
    userId: wx.getLocalUserPhoto().userId,
    bookId: "",

    bookAuthor: "",
    bookHallCode: ""
  }, _defineProperty(_data, 'bookId', ""), _defineProperty(_data, 'bookLogoImg', ""), _defineProperty(_data, 'bookSurname', ""), _defineProperty(_data, 'bookName', ""), _defineProperty(_data, 'bookTime', ""), _defineProperty(_data, 'bookSize', 0), _defineProperty(_data, 'logMap', []), _defineProperty(_data, 'nodeSize', 0), _defineProperty(_data, 'userConnMapSize', 0), _defineProperty(_data, 'userConnMapData', []), _data),
  //跳转向目录详情
  menuTurn: function menuTurn() {},
  onLoad: function onLoad(option) {
    var that = this,
        bookId = option.bookId;

    wx.showToast({
      title: "加载中，请稍后...",
      icon: "loading",
      duration: 108000
    });

    this.setData({
      bookId: bookId
    });

    wx.request({
      url: wx.url + 'book/getBookIndex',
      header: {
        'content-type': 'application/json'
      },
      data: {
        userId: that.data.userId,
        bookId: bookId,
        acceptOr: ''
      },
      success: function success(bookres) {
        bookres = bookres.data;

        // 设置标题 
        wx.setNavigationBarTitle({
          title: bookres.bookMap.bookName,
          success: function success() {},
          fail: function fail(err) {}
        });

        var ChangeJson = JSON.parse(JSON.stringify(bookres.logMap));
        ChangeJson = wx.formatTree(ChangeJson, 'CATALOG_ID', 'CATALOG_PARENT_ID', 'child');
        var fixedJSON = wx.prseTree(ChangeJson, 'child', 1);
        for (var i in bookres.logMap) {
          for (var j in fixedJSON) {
            if (fixedJSON[j].CATALOG_ID == bookres.logMap[i].CATALOG_ID) {
              bookres.logMap[i].lv = fixedJSON[j].$lv;
            }
          }
        }
        console.log(bookres.logMap);
        that.setData({
          bookAuthor: bookres.bookMap.bookAuthor,
          bookHallCode: bookres.bookMap.bookHallCode,
          bookLogoImg: bookres.bookMap.bookLogoImg == null ? '../../static/image/bookFM.png' : bookres.bookMap.bookLogoImg,
          bookName: bookres.bookMap.bookName,
          bookSurname: bookres.bookMap.bookSurname,
          bookTime: bookres.bookMap.bookTime,

          bookSize: bookres.bookSizeMap.bookSize,

          logMap: bookres.logMap,
          nodeSize: bookres.nodeSizeMap.nodeSize,

          userConnMapSize: bookres.userConnMap.userSize,
          userConnMapData: bookres.userConnMap.userData
        });

        wx.hideToast();
      }
    });
  },
  openQrCode: function openQrCode() {
    wx.navigateTo({
      url: "bookQrCode"
    });
  },
  addCollect: function addCollect() {
    wx.showToast({
      title: "收藏成功",
      icon: "success",
      duration: 2000,
      complete: function complete() {
        wx.redirectTo({
          url: "bookList?totalName=我的收藏&totalKey=userId&totalType=2"
        });
      }
    });
  },
  readNow: function readNow() {
    wx.navigateTo({
      url: "../bookAll/lineAndPage/page"
    });
  }
});