'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getData = function getData($obj, string) {
  return $obj.currentTarget.dataset[string];
};
exports.default = Page({
  data: {
    searchStr: "",
    NAV_HEIGHT: 0,
    scrollTop: 0,
    ColorIndex: 0,
    allData: [],
    dataLength: 0,
    showType: '',
    index: 1,
    size: 6,
    bookId: "",
    url: "",
    urlArry: ['node/getNodePaging', 'node/getNodePagingAll'],
    userId: wx.getLocalUserPhoto().userId
  },
  onPageScroll: function onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },

  onLoad: function onLoad(options) {
    var SsearchStr = options.searchStr,
        that = this;
    this.setData({
      searchStr: options.searchStr,
      bookId: options.bookId,
      url: that.data.urlArry[options.showType]
    });
    that.showConts();
  },
  //搜索值获取/赋值
  searchTxtIn: function searchTxtIn(e) {
    this.setData({
      searchStr: e.detail.value
    });
  },
  //搜索事件
  searchACT: function searchACT() {
    var $str = this.data.searchStr,
        that = this;
    if ($str == "") {
      wx.showModal({
        content: "请输入搜索关键字进行搜索",
        showCancel: false,
        confirmText: "确定"
      });
    } else {

      //处理本地搜索历史；
      var menSearch = [];
      try {
        var value = wx.getStorageSync('menSearch');
        value = value.split("")[0] == "," ? value.substring(1) : value;
        menSearch = value.split(',');
      } catch (e) {}
      var havaSearch = true;
      for (var i in menSearch) {
        if ($str == menSearch[i]) {
          havaSearch = false;
        }
      }
      if (havaSearch) {
        menSearch.push($str);
      }
      if (menSearch.length > 8) menSearch = menSearch.splice(menSearch.length - 8);
      try {
        wx.setStorageSync('menSearch', menSearch.toString());
      } catch (e) {}
      that.setData({
        searchStr: $str,
        index: 1
      });
      that.showConts();
    }
  },
  //上拉加载
  onReachBottom: function onReachBottom() {
    var that = this;
    if (that.data.allData.length < that.data.dataLength) {
      that.setData({
        index: that.data.index + 1
      });
      that.showConts();
    }
  },
  showConts: function showConts() {
    var that = this;
    wx.request({
      url: wx.url + that.data.url,
      header: {
        'content-type': 'application/json'
      },
      data: {
        index: that.data.index,
        size: that.data.size,
        bookId: that.data.bookId,
        userId: that.data.userId,
        str: that.data.searchStr
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
          dataLength: noderes.data.limitCount,
          allData: that.data.allData
        });
        wx.hideToast();
      }
    });
  },
  turnToUsers: function turnToUsers(e) {
    wx.redirectTo({
      url: 'nodeDetail?nodeId=' + e.currentTarget.dataset.tid
    });
  }
});