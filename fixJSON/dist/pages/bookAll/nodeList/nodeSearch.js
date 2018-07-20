"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    searchStr: "",
    searchHitory: [],
    bookId: '',
    showType: ''
  },
  onLoad: function onLoad(option) {
    var getHistory = [];
    var value = wx.getStorageSync('menSearch');
    value = value.split("")[0] == "," ? value.substring(1) : value;
    if (value == "") {
      getHistory = [];
    } else {
      getHistory = value.split(',');
    }
    this.setData({
      searchHitory: getHistory,
      bookId: option.bookId,
      showType: option.showType
    });
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

      //处理本地搜索历史；end

      wx.redirectTo({
        url: 'searchResult?searchStr=' + $str + '&bookId=' + that.data.bookId + '&showType=' + that.data.showType
      });
    }
  },
  selectHistory: function selectHistory(e) {
    var getStr = e.currentTarget.dataset.text;
    this.setData({
      searchStr: getStr
    });
  }
});