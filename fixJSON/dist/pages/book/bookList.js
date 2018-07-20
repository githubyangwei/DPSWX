'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({

  data: {
    searchStr: "",
    searchCont: "",
    searchPage: 1,
    searchSize: 6,
    listData: [], //bookData
    NAV_HEIGHT: 0,
    scrollTop: 0,
    allLength: 0,
    typeNum: 3,
    bookId: '',
    urlArry: ['book/getBookPagingPid', '', 'book/getBookPaging'],
    userId: wx.getLocalUserPhoto().userId
  },
  onPageScroll: function onPageScroll(e) {

    this.setData({
      scrollTop: e.scrollTop
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
    var $this = this;

    $this.setData({
      listData: [],
      allLength: 0,
      searchSize: 6,
      searchStr: $this.data.searchStr,
      searchPage: 1

    });
    wx.request({
      url: wx.url + $this.data.urlArry[$this.data.urlArry],
      header: {
        'content-type': 'application/json'
      },
      data: {
        str: $this.data.searchStr,
        index: $this.data.searchPage,
        size: $this.data.searchSize,
        bookId: $this.data.bookId

      },
      success: function success(listRes) {

        var getData = listRes.data.pageData;
        for (var is = 0; is < getData.length; is++) {
          if (getData[is].BOOK_LOGO_IMG == null) {
            getData[is].BOOK_LOGO_IMG = '../../static/image/bookFM.png';
          }
          $this.data.listData.push(getData[is]);
        }
        $this.setData({
          listData: $this.data.listData,
          allLength: listRes.data.limitCount,
          searchPage: listRes.data.page + 1
        });

        wx.hideToast();
      }
    });
    console.log(this.data.searchStr);
  },
  // ----------------------搜索结束
  //打开谱书
  openBook: function openBook(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/book/bookDetail?bookId=' + e.currentTarget.id
    });
  },

  onLoad: function onLoad(options) {
    var $this = this;
    console.log(options);
    wx.showToast({
      title: "加载中，请稍后...",
      icon: "loading",
      duration: 108000
    });

    $this.setData({
      listData: []
    });

    if (options.totalName != undefined) {
      //修改标题     对应总谱和我的收藏
      wx.setNavigationBarTitle({
        title: options.totalName,
        success: function success() {},
        fail: function fail(err) {}
      });

      wx.hideShareMenu(); //关闭转发

      var getType = options.totalType; //页面类型    1.总谱    2.我的收藏
      var getId = options.totalKey; //对应的ID  
      if (getType == 1) {
        $this.setData({
          typeNum: 1,
          bookId: getId
        });
      }
    } else {
      //全部家谱带上搜索
      this.setData({
        searchCont: 'listSearchShow',
        typeNum: 3
      });
    }

    wx.request({
      url: wx.url + $this.data.urlArry[$this.data.typeNum - 1],
      header: {
        'content-type': 'application/json'
      },
      data: {
        str: $this.data.searchStr,
        index: $this.data.searchPage,
        size: $this.data.searchSize,
        bookId: $this.data.bookId
      },
      success: function success(listRes) {

        var getData = listRes.data.pageData;
        for (var is = 0; is < getData.length; is++) {
          if (getData[is].BOOK_LOGO_IMG == null) {
            getData[is].BOOK_LOGO_IMG = '../../static/image/bookFM.png';
          }
          $this.data.listData.push(getData[is]);
        }
        $this.setData({
          listData: $this.data.listData,
          allLength: listRes.data.limitCount,
          searchPage: listRes.data.page + 1
        });

        wx.hideToast();
      }
    });

    wx.hideToast();
  },
  // 下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var $this = this;

    $this.setData({
      searchPage: 1,
      allLength: 0,
      listData: []
    });

    wx.request({
      url: wx.url + $this.data.urlArry[$this.data.typeNum - 1],
      header: {
        'content-type': 'application/json'
      },
      data: {
        str: $this.data.searchStr,
        index: $this.data.searchPage,
        size: $this.data.searchSize,
        bookId: $this.data.bookId

      },
      success: function success(listRes) {
        console.log(listRes);
        var getData = listRes.data.pageData;
        for (var is = 0; is < getData.length; is++) {
          if (getData[is].BOOK_LOGO_IMG == null) {
            getData[is].BOOK_LOGO_IMG = '../../static/image/bookFM.png';
          }
          $this.data.listData.push(getData[is]);
        }
        $this.setData({
          listData: $this.data.listData,
          allLength: listRes.data.limitCount,
          searchPage: listRes.data.page + 1
        });
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    });
  },
  //上拉加载
  onReachBottom: function onReachBottom() {
    var $this = this;

    if ($this.data.listData.length < $this.data.allLength) {
      // 显示加载图标
      wx.showToast({
        title: "加载中，请稍后...",
        icon: "loading",
        duration: 88000
      });
      wx.request({
        url: wx.url + $this.data.urlArry[$this.data.typeNum - 1],
        header: {
          'content-type': 'application/json'
        },
        data: {
          str: $this.data.searchStr,
          index: $this.data.searchPage,
          size: $this.data.searchSize
        },
        success: function success(listRes) {

          var getData = listRes.data.pageData;

          for (var is = 0; is < getData.length; is++) {
            if (getData[is].BOOK_LOGO_IMG == null) {
              getData[is].BOOK_LOGO_IMG = '../../static/image/bookFM.png';
            }
            $this.data.listData.push(getData[is]);
          }
          $this.setData({
            listData: $this.data.listData,
            allLength: listRes.data.limitCount,
            searchPage: listRes.data.page + 1
          });
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
          wx.hideToast();
        }
      });
    }
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

  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: "测试-我要分享",
      desc: "测试",
      path: "http://wap.baidu.com",
      success: function success() {}
    };
  }
});