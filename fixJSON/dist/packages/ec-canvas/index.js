'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Component;

var _wxCanvas = require('./wx-canvas.js');

var _wxCanvas2 = _interopRequireDefault(_wxCanvas);

var _echarts = require('./echarts.js');

var echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ctx = void 0;
exports.default = Component((_Component = {
    data: {
        "usingComponents": {}
    },
    properties: {
        canvasId: {
            type: String,
            value: 'ec-canvas'
        },

        ec: {
            type: Object
        }
    }

}, _defineProperty(_Component, 'data', {}), _defineProperty(_Component, 'ready', function ready() {
    if (!this.data.ec) {
        console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' + 'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
        return;
    }

    if (!this.data.ec.lazyLoad) {
        this.init();
    }
}), _defineProperty(_Component, 'methods', {
    init: function init(callback) {
        var _this = this;

        var version = wx.version.version.split('.').map(function (n) {
            return parseInt(n, 10);
        });
        var isValid = version[0] > 1 || version[0] === 1 && version[1] > 9 || version[0] === 1 && version[1] === 9 && version[2] >= 91;
        if (!isValid) {
            console.error('微信基础库版本过低，需大于等于 1.9.91。' + '参见：https://github.com/ecomfe/echarts-for-weixin' + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
            return;
        }

        ctx = wx.createCanvasContext(this.data.canvasId, this);

        var canvas = new _wxCanvas2.default(ctx, this.data.canvasId);

        echarts.setCanvasCreator(function () {
            return canvas;
        });

        var query = wx.createSelectorQuery().in(this);
        query.select('.ec-canvas').boundingClientRect(function (res) {
            if (typeof callback === 'function') {
                _this.chart = callback(canvas, res.width, res.height);
            } else if (_this.data.ec && _this.data.ec.onInit) {
                _this.chart = _this.data.ec.onInit(canvas, res.width, res.height);
            }
        }).exec();
    },

    canvasToTempFilePath: function canvasToTempFilePath(opt) {
        var _this2 = this;

        if (!opt.canvasId) {
            opt.canvasId = this.data.canvasId;
        }

        ctx.draw(true, function () {
            wx.canvasToTempFilePath(opt, _this2);
        });
    },
    touchStart: function touchStart(e) {
        if (this.chart && e.touches.length > 0) {
            var touch = e.touches[0];
            this.chart._zr.handler.dispatch('mousedown', {
                zrX: touch.x,
                zrY: touch.y
            });
            this.chart._zr.handler.dispatch('mousemove', {
                zrX: touch.x,
                zrY: touch.y
            });
        }
    },
    touchMove: function touchMove(e) {
        if (this.chart && e.touches.length > 0) {
            var touch = e.touches[0];
            this.chart._zr.handler.dispatch('mousemove', {
                zrX: touch.x,
                zrY: touch.y
            });
        }
    },
    touchEnd: function touchEnd(e) {
        if (this.chart) {
            var touch = e.changedTouches ? e.changedTouches[0] : {};
            this.chart._zr.handler.dispatch('mouseup', {
                zrX: touch.x,
                zrY: touch.y
            });
            this.chart._zr.handler.dispatch('click', {
                zrX: touch.x,
                zrY: touch.y
            });
        }
    }
}), _Component));