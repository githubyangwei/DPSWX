'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _echarts = require('../../../packages/ec-canvas/echarts.js');

var echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function initChart(canvas, width, height) {

  var chart = echarts.init(canvas, null, { width: width, height: height });
  canvas.setChart(chart);

  var option = {
    title: {
      text: ''
    },
    color: ['#ff7b52', '#4592ff'],
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 12
        }
      }
    },
    legend: {
      x: "center",
      show: false,
      data: ["朋友", "战友", '亲戚']
    },
    series: [{
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      focusNodeAdjacency: true,
      roam: true,
      categories: [{
        name: '朋友',
        itemStyle: {
          normal: {
            color: "#009800"
          }
        }
      }, {
        name: '战友',
        itemStyle: {
          normal: {
            color: "#4592FF"
          }
        }
      }, {
        name: '亲戚',
        itemStyle: {
          normal: {
            color: "#3592Ff"
          }
        }
      }],
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 10
          }
        }
      },
      force: {
        repulsion: 400
      },
      edgeSymbolSize: [4, 50],
      edgeLabel: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 10
          },
          formatter: "{c}"
        }
      },
      data: [{
        name: '徐贱云',
        draggable: true
      }, {
        name: '冯可梁',
        category: 1,
        draggable: true
      }, {
        name: '邓志荣',
        category: 1,
        draggable: true
      }, {
        name: '李荣庆',
        category: 1,
        draggable: true
      }, {
        name: '郑志勇',
        category: 1,
        draggable: true
      }, {
        name: '赵英杰',
        category: 1,
        draggable: true
      }],
      links: [{
        source: 0,
        target: 1,
        category: 0,
        value: '朋友'
      }, {
        source: 0,
        target: 2,
        value: '战友'
      }, {
        source: 0,
        target: 3,
        value: '房东'
      }, {
        source: 0,
        target: 4,
        value: '朋友'
      }, {
        source: 0,
        target: 5,
        value: '朋友'
      }, {
        source: 0,
        target: 12,
        value: '朋友'
      }],
      lineStyle: {
        normal: {
          opacity: 0.9,
          width: 1,
          curveness: 0
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

exports.default = Page({
  data: {
    ec: {
      onInit: initChart
    },
    authorStr: "active"
  },
  turnDx: function turnDx() {
    wx.redirectTo({
      url: '../lineAndPage/line?sid=f61261c97b8f42b5b90f92ef8eff32fe'
    });
  }
});