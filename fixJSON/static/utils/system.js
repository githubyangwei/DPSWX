export default {
  attachInfo() {
    let res = wx.getSystemInfoSync()
    wx.url = 'http://192.168.11.88:8380/';
    wx.colorArry = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
    wx.WIN_WIDTH = res.screenWidth
    wx.WIN_HEIGHT = res.screenHeight
    wx.IS_IOS = /ios/i.test(res.system)
    wx.IS_ANDROID = /android/i.test(res.system)
    wx.STATUS_BAR_HEIGHT = res.statusBarHeight
    wx.DEFAULT_HEADER_HEIGHT = 46 // res.screenHeight - res.windowHeight - res.statusBarHeight
    wx.DEFAULT_CONTENT_HEIGHT = res.screenHeight - res.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT
    wx.IS_APP = true

    wx.showAlert = (options) => {
      options.showCancel = false
      wx.showModal(options)
    }

    wx.showConfirm = (options) => {
      wx.showModal(options)
    }

    wx.getCurrentPageUrl = (options) => { //当前页面url
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      var url = currentPage.route
      return url
    }

    wx.getCurrentPageUrlWithArgs = (options) => { //当前页面url带参
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      var url = currentPage.route
      var options = currentPage.options

      var urlWithArgs = url + '?'
      for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
      }
      urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
      return urlWithArgs
    }

    wx.getLocalUserPhoto = (option) => { //获取缓存中的数据并返回  主要是用户头像
      var userObj = [];
      try {
        var value = wx.getStorageSync('userObj');
        userObj = (value.split("")[0] == undefined ? {
          userPhoto: ""
        } : JSON.parse(value))
      } catch (e) {}
      return userObj;
    }

    wx.intToChinese = (str) => { //转数字为汉字
      str = str + '';
      var len = str.length - 1;
      var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
      var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
        var pos = 0;
        if ($1[0] != '0') {
          pos = len - idx;
          if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
            return idxs[len - idx];
          }
          return num[$1[0]] + idxs[len - idx];
        } else {
          var left = len - idx;
          var right = len - idx + $1.length;
          if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
            pos = left - left % 4;
          }
          if (pos) {
            return idxs[pos] + num[$1[0]];
          } else if (idx + $1.length >= len) {
            return '';
          } else {
            return num[$1[0]]
          }
        }
      });
    }
    //格式化为树状结构
    wx.formatTree = function (as, idStr, pidStr, chindrenStr) {
      //格式化数据
      as.sort(function (a, b) {
        return a.RELATION_SORT - b.RELATION_SORT;
      });
      var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        a = JSON.parse(JSON.stringify(as)),
        len = a.length;
      for (; i < len; i++) {
        hash[a[i][id]] = a[i];
      }
      for (; j < len; j++) {
        var aVal = a[j],
          hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          r.push(aVal);
        }
      }
      return r;
    };
    //解构树状结构
    wx.prseTree = function (argument, chindrenStr,num) {
      var key = chindrenStr;
      var sp = [];
      for (var a = 0; a < argument.length; a++) {
        argument[a][key]=argument[a][key]==undefined?[]:argument[a][key]
        if (argument[a][key].length > 0) {
          var sc = wx.prseTree(argument[a][key],chindrenStr, (num+1));
          for (var i = 0; i < sc.length; i++) {
            sp.push(sc[i]);
          }
        }
        argument[a].$lv=num;
        argument[a][key] = '';
        sp.push(argument[a]);

      };
      return sp;
    }
  }
}