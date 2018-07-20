"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    relativeStr: '',
    RlvArry: ['自己', '妻子', '丈夫', '父亲', '母亲', '儿子', '女儿', '哥哥', '姐姐', '爷爷', '奶奶', '叔父', '叔母', '伯父', '伯母', '姑夫', '姑母', '舅舅', '舅妈', '姨父', '姨母', '孙子', '孙女', '外孙', '外孙女']
  },
  bindKey: function bindKey(e) {
    this.setData({
      relativeStr: e.detail.value
    });
  },
  selatRlv: function selatRlv(e) {
    this.setData({
      relativeStr: e.currentTarget.dataset.str
    });
  }
});