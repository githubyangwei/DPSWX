"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CodeLenth = 60;
//还未注册过的微信 显示登录相关 隐藏微信一键登录
// 已登录过的微信  只显示一键登录 
exports.default = Page({
  data: {
    turn: "",
    userPhone: "",
    userVcode: "",
    yzmStr: '获取验证码',
    yzmClass: '',
    yzmSend: false,
    sskey: '',
    md5Key: '',
    openid: ''
  },
  onLoad: function onLoad(option) {
    this.setData({
      turn: option.turnUrl,
      sskey: unescape(option.ssk),
      openid: unescape(option.openid)
    });
    console.log(this.data.openid);
  },
  bindPhoneKey: function bindPhoneKey(e) {
    this.setData({
      userPhone: e.detail.value
    });
  },
  bindYzmKey: function bindYzmKey(e) {
    this.setData({
      userVcode: e.detail.value
    });
  },
  getYzm: function getYzm(e) {
    var that = this;
    if (that.data.userPhone == "" || that.data.userPhone.length < 11) {
      wx.showModal({
        content: "请输入正确的手机号",
        showCancel: false,
        confirmText: "确定"
      });
      return false;
    }
    if (e.currentTarget.dataset.send) {
      //倒计时中
      return false;
    } else {
      //验证用户手机号是否存在
      wx.request({
        url: wx.url + 'appUser/existsUserPhone',
        header: {
          'content-type': 'application/json'
        },
        data: {
          userPhone: that.data.userPhone
        },
        success: function success(phoneRes) {
          if (phoneRes.data.res) {} else {
            //发送验证码
            wx.request({
              url: wx.url + 'appUser/sendUserCode',
              header: {
                'content-type': 'application/json'
              },
              data: {
                userPhone: that.data.userPhone
              },
              success: function success(yzmres) {
                that.setData({
                  md5Key: yzmres.data.res
                });
                var CodeIntel = setInterval(function () {
                  if (CodeLenth > 0) {
                    that.setData({
                      yzmStr: CodeLenth,
                      yzmClass: 'loadNums',
                      yzmSend: true
                    });
                    CodeLenth--;
                  } else {
                    that.setData({
                      yzmStr: '获取验证码',
                      yzmClass: '',
                      yzmSend: false
                    });
                    clearInterval(CodeIntel);
                    CodeLenth = 60;
                  }
                }, 1000);
              }
            });
          }
        }
      });
    }
    console.log(e);
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    var that = this;
    var getOpenId = this.data.openid;
    var getUser = e.detail.userInfo;

    var sendInfo = {
      userNickName: getUser.nickName,
      userPhone: that.data.userPhone,
      userPhoto: getUser.avatarUrl,
      openId: getOpenId,
      userSex: getUser.gender,
      userCountry: getUser.country,
      userProvince: getUser.province,
      userCity: getUser.city
    };

    wx.request({
      url: wx.url + 'appUser/verifyUserCode',
      header: {
        'content-type': 'application/json'
      },
      data: {
        userPhone: that.data.userPhone,
        codePhone: that.data.userVcode,
        md5Key: that.data.md5Key
      },
      success: function success(VcoedBol) {
        if (!VcoedBol.data) {
          wx.showModal({
            content: "验证码错误，请输入正确的验证码",
            showCancel: false,
            confirmText: "确定"
          });
        } else {
          wx.request({
            url: wx.url + 'appUser/addAppUser',
            header: {
              'content-type': 'application/json'
            },
            data: sendInfo,
            success: function success(addUserRes) {
              if (addUserRes.data) {
                try {
                  wx.setStorageSync('userObj', JSON.stringify(addUserRes.data.res));
                } catch (e) {}

                wx.reLaunch({
                  url: '/' + unescape(that.data.turn)
                });
              } else {
                wx.showModal({
                  content: "注册失败，请重新注册",
                  showCancel: false,
                  confirmText: "确定"
                });
              }
            }
          });
        }
      }
    });
  },
  getPhoneNumber: function getPhoneNumber(e) {
    var that = this;
    wx.request({
      url: wx.url + 'wechat/getWeChatPhone',
      header: {
        'content-type': 'application/json'
      },
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionkey: that.data.sskey
      },
      success: function success(pNumberRes) {
        that.setData({
          userPhone: pNumberRes.data.res.phoneNumber
        });
      }
    });
  }
});