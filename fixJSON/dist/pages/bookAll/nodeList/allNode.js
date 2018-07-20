"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getData = function getData($obj, string) {
  return $obj.currentTarget.dataset[string];
};
exports.default = Page({
  data: {
    showType: 0,
    NAV_HEIGHT: 0,
    scrollTop: 0,
    allData: [],
    thisData: [],
    index: 1,
    index2: 1,
    size: 6,
    size2: 6,
    ColorIndex: 0,
    thiaAllNum: 0,
    thiaAllNum2: 0,
    bookId: "",
    userId: wx.getLocalUserPhoto().userId
  },
  onPageScroll: function onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },

  //上拉加载
  onReachBottom: function onReachBottom() {
    var that = this;
    if (that.data.showType == 0) {
      if (that.data.thisData.length < that.data.thiaAllNum) {
        that.setData({
          index: that.data.index + 1
        });
        that.loadThisBookConts();
      }
    } else {
      if (that.data.thisData.length < that.data.thiaAllNum) {
        that.setData({
          index2: that.data.index2 + 1
        });
        that.loadThisProCont();
      }
    }
  },
  topClick: function topClick(e) {
    this.setData({
      showType: getData(e, "index")
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 200
    });
  },
  turnToSearch: function turnToSearch() {
    var that = this;
    wx.redirectTo({
      url: 'nodeSearch?showType=' + that.data.showType + '&bookId=' + that.data.bookId
    });
  },
  turnToUsers: function turnToUsers(e) {
    wx.redirectTo({
      url: 'nodeDetail?nodeId=' + e.currentTarget.dataset.tid
    });
  },
  onLoad: function onLoad(option) {
    wx.showToast({
      title: "加载中，请稍后...",
      icon: "loading",
      duration: 88000
    });
    var bookId = option.bookId;
    this.setData({
      bookId: bookId,
      allData: []
    });
    this.loadThisBookConts();
    this.loadThisProCont();
  },
  loadThisBookConts: function loadThisBookConts() {
    var that = this;
    wx.request({
      url: wx.url + 'node/getNodePaging',
      header: {
        'content-type': 'application/json'
      },
      data: {
        index: that.data.index,
        size: that.data.size,
        bookId: that.data.bookId,
        userId: that.data.userId

      },
      success: function success(noderes) {
        var getData = noderes.data.pageData;
        for (var i in getData) {
          that.data.ColorIndex++;
          var AllName = getData[i].NODE_SURNAME.replace(/\s|\xA0/g, "") + getData[i].NODE_NAME.replace(/\s|\xA0/g, "");
          console.log(AllName, AllName.length);
          getData[i].NODE_SpsNode = AllName.length > 2 ? AllName.substring(AllName.length - 2) : AllName;
          getData[i].Color = wx.colorArry[that.data.ColorIndex % 11];
          that.data.thisData.push(getData[i]);
        }
        that.setData({
          thiaAllNum: noderes.data.limitCount,
          thisData: that.data.thisData
        });
        wx.hideToast();
      }
    });
  },
  loadThisProCont: function loadThisProCont() {
    var that = this;
    wx.request({
      url: wx.url + 'node/getNodePagingAll',
      header: {
        'content-type': 'application/json'
      },
      data: {
        index: that.data.index2,
        size: that.data.size2,
        bookId: that.data.bookId,
        userId: that.data.userId
      },
      success: function success(noderes) {
        var getData = noderes.data.pageData;
        for (var i in getData) {
          that.data.ColorIndex++;
          var AllName = getData[i].NODE_SURNAME.replace(/\s|\xA0/g, "") + getData[i].NODE_NAME.replace(/\s|\xA0/g, "");
          console.log(AllName, AllName.length);
          getData[i].NODE_SpsNode = AllName.length > 2 ? AllName.substring(AllName.length - 2) : AllName;
          getData[i].Color = wx.colorArry[that.data.ColorIndex % 11];
          that.data.allData.push(getData[i]);
        }
        that.setData({
          thiaAllNum2: noderes.data.limitCount,
          allData: that.data.allData
        });
        wx.hideToast();
      }
    });
  }
});