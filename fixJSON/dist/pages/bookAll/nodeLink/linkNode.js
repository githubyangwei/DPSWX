"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    lineStep: 1
  },
  changeStep: function changeStep() {
    var that = this;
    var NUm = that.data.lineStep;
    NUm++;
    if (NUm >= 4) {
      NUm = 1;
    }
    this.setData({
      lineStep: NUm
    });
  }
});