'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  data: {
    imgUrl: wx.getLocalUserPhoto().userPhoto
  },
  created: function created() {
    var that = this;
    if (wx.getLocalUserPhoto().userId == undefined) {
      wx.reLaunch({
        url: '/pages/home/load?turnUrl=' + escape(wx.getCurrentPageUrlWithArgs())
      });
    } else {}
  },
  attached: function attached() {
    console.log(this.data.imgUrl);
    var getIMg = wx.getLocalUserPhoto().userId == undefined ? "" : wx.getLocalUserPhoto().userPhoto;
    this.setData({
      imgUrl: getIMg
    });
  },
  methods: {
    handleTap: function handleTap() {
      wx.navigateTo({
        url: '/pages/wxUser/userHome'
      });
    }
  }
});