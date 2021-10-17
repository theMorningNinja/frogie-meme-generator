/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/app.js":
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _utils_preloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/preloader */ "./src/assets/js/utils/preloader.js");
/* harmony import */ var _utils_huebee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/huebee */ "./src/assets/js/utils/huebee.js");
/* harmony import */ var _utils_huebee__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_huebee__WEBPACK_IMPORTED_MODULE_1__);


function app() {
  /**
   * Preloader
   */
  var preloaderItems = {
    // gif - preloader
    gif: document.querySelector('.preloader-item'),
    // preloader - overlay
    overlay: document.querySelector('.preloader-overlay'),
    content: document.getElementById('content-wrapper'),
    // section item class for intro animation
    itemsIntro: document.querySelectorAll('.item__intro')
  };
  window.addEventListener('load', function () {
    (0,_utils_preloader__WEBPACK_IMPORTED_MODULE_0__.preloader)(preloaderItems.gif, preloaderItems.overlay, preloaderItems.content, preloaderItems.itemsIntro);
  });
  /**
   * Meme - generator
   */

  (function () {
    /**
     * Color picker - huebee
     */
    var textColorInput = document.getElementById('color__text-input');
    var strokeColorInput = document.getElementById('color__stroke-input');
    var colorTextHueb = new (_utils_huebee__WEBPACK_IMPORTED_MODULE_1___default())(textColorInput, {
      setText: true,
      notation: 'hex',
      saturations: 2
    });
    var strokeTextHueb = new (_utils_huebee__WEBPACK_IMPORTED_MODULE_1___default())(strokeColorInput, {
      setText: true,
      notation: 'hex',
      saturations: 2
    });
    /**
     * Meme - generator
     */
    // meme default properties

    var mediaQuery = window.matchMedia('screen and (max-width:1024px)'); // Set canvas width depending on window width

    function checkMedia(canvasItem) {
      if (!mediaQuery.matches) {
        canvasItem.width = 500;
        canvasItem.height = 500;
      } else {
        canvasItem.width = 320;
        canvasItem.height = 320;
      }

      return canvasItem.width, canvasItem.height;
    }

    var canvas = document.createElement('canvas');
    var canvasWrapper = document.querySelector('.canvas__wrapper');
    canvasWrapper.appendChild(canvas);
    checkMedia(canvas);
    var ctx = canvas.getContext('2d');
    var topTextInput = document.querySelector('#text__top');
    var bottomTextInput = document.querySelector('#text__bottom');
    var img = document.createElement('img');
    var exportBtn = document.querySelector('#export__btn');
    var font = 'Arial';
    var fontSize = '30';
    var colorText = '#cc59d2';
    var strokeColor = '#6EA4BF'; // Recreate canvas do untaint it / without this default img not showing

    img.onload = function (e) {
      canvas.outerHTML = '';
      canvas = document.createElement('canvas');
      canvasWrapper.appendChild(canvas);
      ctx = canvas.getContext('2d');
      draw();
    }; // Image reader


    function reader() {
      var imgReader = new FileReader();

      imgReader.onload = function (e) {
        img = new Image();
        img.src = imgReader.result;

        img.onload = function () {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      };

      imgReader.readAsDataURL(this.files[0]);
    } //Add trigger on upload image button


    document.querySelector('#img__input').addEventListener('change', reader); //Add trigger for the text inputs

    document.querySelectorAll('.text-input').forEach(function (e) {
      e.addEventListener('keyup', function () {
        draw();
      });
    }); // Draw img and text

    function draw() {
      checkMedia(canvas);
      img.width = canvas.width;
      img.height = canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = "bold ".concat(fontSize, "px ").concat(font);
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = colorText;
      ctx.textAlign = 'center';
      ctx.lineWidth = 1;
      ctx.textBaseline = 'top';
      addText(topTextInput.value, canvas.width / 2, fontSize / 2, canvas.width, fontSize * 1.2, 'push');
      ctx.textBaseline = 'bottom';
      addText(bottomTextInput.value, canvas.width / 2, canvas.height - fontSize / 2, canvas.width, -(fontSize * 1.2), 'unshift');
    } // Write the texts


    function addText(text, x, y, allowedWidth, lh, method) {
      var lines = [];
      var line = '';
      var words = text.split(' ');

      for (var i = 0; i < words.length; i++) {
        var measuredLine = line + ' ' + words[i];
        var measuredWidth = ctx.measureText(measuredLine).width;

        if (measuredWidth > allowedWidth) {
          lines[method](line);
          line = words[i] + ' ';
        } else {
          line = measuredLine;
        }
      }

      lines[method](line);

      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], x, y + j * lh, allowedWidth);
        ctx.strokeText(lines[j], x, y + j * lh, allowedWidth);
      }
    } // Change default font


    document.querySelector('#font-option').addEventListener('change', function () {
      font = this.value;
      draw();
    }); // Change font size

    document.querySelector('#text__size-input').addEventListener('change', function () {
      if (this.value < this.min) {
        this.value = this.min;
      } else if (this.value > this.max) {
        this.value = this.max;
      }

      fontSize = this.value;
      draw();
    }); // Change text color

    colorTextHueb.on('change', function (color) {
      colorText = color;
      draw();
    }); // Change stroke color

    strokeTextHueb.on('change', function (color) {
      strokeColor = color;
      draw();
    }); // Convert Canvas to image and export

    exportBtn.addEventListener('click', function () {
      var imgLink = canvas.toDataURL('image/png');
      var link = document.createElement('a');
      link.download = 'my-meme';
      link.href = imgLink;
      link.click();

      var win = function win() {
        var windowLink = window.open('', '_blank');
        windowLink.window.close('', '_blank');
      };
    }); //Set values on inputs

    img.src = 'https://drive.google.com/uc?export=view&id=1YWi5KrjCaRNi-zhd3M-sSQPJg2iurP5h';
    document.querySelector('#text__size-input').value = fontSize;
    document.querySelector('#color__text-input').style.backgroundColor = colorText;
    document.querySelector('#color__stroke-input').style.backgroundColor = strokeColor;
  })();
}

/***/ }),

/***/ "./src/assets/js/index.js":
/*!********************************!*\
  !*** ./src/assets/js/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/assets/js/app.js");

(0,_app__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./src/assets/js/utils/huebee.js":
/*!***************************************!*\
  !*** ./src/assets/js/utils/huebee.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__factory, __WEBPACK_LOCAL_MODULE_0__module;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Huebee PACKAGED v2.1.1
 * 1-click color picker
 * MIT license
 * https://huebee.buzz
 * Copyright 2020 Metafizzy
 */
(function (t, e) {
  if (true) {
    !(__WEBPACK_LOCAL_MODULE_0__factory = (e), (typeof __WEBPACK_LOCAL_MODULE_0__factory === 'function' ? ((__WEBPACK_LOCAL_MODULE_0__module = { id: "ev-emitter/ev-emitter", exports: {}, loaded: false }), (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__factory.call(__WEBPACK_LOCAL_MODULE_0__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_0__module.exports, __WEBPACK_LOCAL_MODULE_0__module)), (__WEBPACK_LOCAL_MODULE_0__module.loaded = true), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__module.exports)) : __WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__factory));
  } else {}
})(typeof window != 'undefined' ? window : this, function () {
  'use strict';

  function t() {}

  var e = t.prototype;

  e.on = function (t, e) {
    if (!t || !e) {
      return;
    }

    var i = this._events = this._events || {};
    var n = i[t] = i[t] || [];

    if (n.indexOf(e) == -1) {
      n.push(e);
    }

    return this;
  };

  e.once = function (t, e) {
    if (!t || !e) {
      return;
    }

    this.on(t, e);
    var i = this._onceEvents = this._onceEvents || {};
    var n = i[t] = i[t] || {};
    n[e] = true;
    return this;
  };

  e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (!i || !i.length) {
      return;
    }

    var n = i.indexOf(e);

    if (n != -1) {
      i.splice(n, 1);
    }

    return this;
  };

  e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (!i || !i.length) {
      return;
    }

    i = i.slice(0);
    e = e || [];
    var n = this._onceEvents && this._onceEvents[t];

    for (var o = 0; o < i.length; o++) {
      var s = i[o];
      var r = n && n[s];

      if (r) {
        this.off(t, s);
        delete n[s];
      }

      s.apply(this, e);
    }

    return this;
  };

  e.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return t;
});
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */


(function (e, i) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (t) {
      return i(e, t);
    }).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
  } else {}
})(window, function t(o, e) {
  'use strict';

  function i() {}

  function n() {}

  var s = n.prototype = Object.create(e.prototype);

  s.bindStartEvent = function (t) {
    this._bindStartEvent(t, true);
  };

  s.unbindStartEvent = function (t) {
    this._bindStartEvent(t, false);
  };

  s._bindStartEvent = function (t, e) {
    e = e === undefined ? true : e;
    var i = e ? 'addEventListener' : 'removeEventListener';
    var n = 'mousedown';

    if (o.PointerEvent) {
      n = 'pointerdown';
    } else if ('ontouchstart' in o) {
      n = 'touchstart';
    }

    t[i](n, this);
  };

  s.handleEvent = function (t) {
    var e = 'on' + t.type;

    if (this[e]) {
      this[e](t);
    }
  };

  s.getTouch = function (t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e];

      if (i.identifier == this.pointerIdentifier) {
        return i;
      }
    }
  };

  s.onmousedown = function (t) {
    var e = t.button;

    if (e && e !== 0 && e !== 1) {
      return;
    }

    this._pointerDown(t, t);
  };

  s.ontouchstart = function (t) {
    this._pointerDown(t, t.changedTouches[0]);
  };

  s.onpointerdown = function (t) {
    this._pointerDown(t, t);
  };

  s._pointerDown = function (t, e) {
    if (t.button || this.isPointerDown) {
      return;
    }

    this.isPointerDown = true;
    this.pointerIdentifier = e.pointerId !== undefined ? e.pointerId : e.identifier;
    this.pointerDown(t, e);
  };

  s.pointerDown = function (t, e) {
    this._bindPostStartEvents(t);

    this.emitEvent('pointerDown', [t, e]);
  };

  var r = {
    mousedown: ['mousemove', 'mouseup'],
    touchstart: ['touchmove', 'touchend', 'touchcancel'],
    pointerdown: ['pointermove', 'pointerup', 'pointercancel']
  };

  s._bindPostStartEvents = function (t) {
    if (!t) {
      return;
    }

    var e = r[t.type];
    e.forEach(function (t) {
      o.addEventListener(t, this);
    }, this);
    this._boundPointerEvents = e;
  };

  s._unbindPostStartEvents = function () {
    if (!this._boundPointerEvents) {
      return;
    }

    this._boundPointerEvents.forEach(function (t) {
      o.removeEventListener(t, this);
    }, this);

    delete this._boundPointerEvents;
  };

  s.onmousemove = function (t) {
    this._pointerMove(t, t);
  };

  s.onpointermove = function (t) {
    if (t.pointerId == this.pointerIdentifier) {
      this._pointerMove(t, t);
    }
  };

  s.ontouchmove = function (t) {
    var e = this.getTouch(t.changedTouches);

    if (e) {
      this._pointerMove(t, e);
    }
  };

  s._pointerMove = function (t, e) {
    this.pointerMove(t, e);
  };

  s.pointerMove = function (t, e) {
    this.emitEvent('pointerMove', [t, e]);
  };

  s.onmouseup = function (t) {
    this._pointerUp(t, t);
  };

  s.onpointerup = function (t) {
    if (t.pointerId == this.pointerIdentifier) {
      this._pointerUp(t, t);
    }
  };

  s.ontouchend = function (t) {
    var e = this.getTouch(t.changedTouches);

    if (e) {
      this._pointerUp(t, e);
    }
  };

  s._pointerUp = function (t, e) {
    this._pointerDone();

    this.pointerUp(t, e);
  };

  s.pointerUp = function (t, e) {
    this.emitEvent('pointerUp', [t, e]);
  };

  s._pointerDone = function () {
    this._pointerReset();

    this._unbindPostStartEvents();

    this.pointerDone();
  };

  s._pointerReset = function () {
    this.isPointerDown = false;
    delete this.pointerIdentifier;
  };

  s.pointerDone = i;

  s.onpointercancel = function (t) {
    if (t.pointerId == this.pointerIdentifier) {
      this._pointerCancel(t, t);
    }
  };

  s.ontouchcancel = function (t) {
    var e = this.getTouch(t.changedTouches);

    if (e) {
      this._pointerCancel(t, e);
    }
  };

  s._pointerCancel = function (t, e) {
    this._pointerDone();

    this.pointerCancel(t, e);
  };

  s.pointerCancel = function (t, e) {
    this.emitEvent('pointerCancel', [t, e]);
  };

  n.getPointerPoint = function (t) {
    return {
      x: t.pageX,
      y: t.pageY
    };
  };

  return n;
});
/*!
 * Huebee v2.1.1
 * 1-click color picker
 * MIT license
 * https://huebee.buzz
 * Copyright 2020 Metafizzy
 */


(function (i, n) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_1__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (t, e) {
      return n(i, t, e);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function t(e, i, n) {
  function s(t, e) {
    t = b(t);

    if (!t) {
      throw new Error('Bad element for Huebee: ' + t);
    }

    this.anchor = t;
    this.options = {};
    this.option(s.defaults);
    this.option(e);
    this.create();
  }

  s.defaults = {
    hues: 12,
    hue0: 0,
    shades: 5,
    saturations: 3,
    notation: 'shortHex',
    setText: true,
    setBGColor: true
  };
  var o = s.prototype = Object.create(i.prototype);

  o.option = function (t) {
    this.options = E(this.options, t);
  };

  var r = 0;
  var a = {};

  o.create = function () {
    var t = this.guid = ++r;
    this.anchor.huebeeGUID = t;
    a[t] = this;
    this.setBGElems = this.getSetElems(this.options.setBGColor);
    this.setTextElems = this.getSetElems(this.options.setText);
    this.outsideCloseIt = this.outsideClose.bind(this);
    this.onDocKeydown = this.docKeydown.bind(this);
    this.closeIt = this.close.bind(this);
    this.openIt = this.open.bind(this);
    this.onElemTransitionend = this.elemTransitionend.bind(this);
    this.isInputAnchor = this.anchor.nodeName == 'INPUT';

    if (!this.options.staticOpen) {
      this.anchor.addEventListener('click', this.openIt);
      this.anchor.addEventListener('focus', this.openIt);
    }

    if (this.isInputAnchor) {
      this.anchor.addEventListener('input', this.inputInput.bind(this));
    }

    var e = this.element = document.createElement('div');
    e.className = 'huebee ';
    e.className += this.options.staticOpen ? 'is-static-open ' : 'is-hidden ';
    e.className += this.options.className || '';
    var i = this.container = document.createElement('div');
    i.className = 'huebee__container';

    function n(t) {
      if (t.target == i) {
        t.preventDefault();
      }
    }

    i.addEventListener('mousedown', n);
    i.addEventListener('touchstart', n);
    this.createCanvas();
    this.cursor = document.createElement('div');
    this.cursor.className = 'huebee__cursor is-hidden';
    i.appendChild(this.cursor);
    this.createCloseButton();
    e.appendChild(i);

    if (!this.options.staticOpen) {
      var o = getComputedStyle(this.anchor.parentNode);

      if (o.position != 'relative' && o.position != 'absolute') {
        this.anchor.parentNode.style.position = 'relative';
      }
    }

    var s = this.getCustomLength();
    this.satY = s ? Math.ceil(s / this.options.hues) + 1 : 0;
    this.updateColors();
    this.setAnchorColor();

    if (this.options.staticOpen) {
      this.open();
    }
  };

  o.getSetElems = function (t) {
    if (t === true) {
      return [this.anchor];
    } else if (typeof t == 'string') {
      return document.querySelectorAll(t);
    }
  };

  o.getCustomLength = function () {
    var t = this.options.customColors;
    return t && t.length || 0;
  };

  o.createCanvas = function () {
    var t = this.canvas = document.createElement('canvas');
    t.className = 'huebee__canvas';
    this.ctx = t.getContext('2d');
    var e = this.canvasPointer = new n();

    e._bindStartEvent(t);

    e.on('pointerDown', this.canvasPointerDown.bind(this));
    e.on('pointerMove', this.canvasPointerMove.bind(this));
    this.container.appendChild(t);
  };

  var h = 'http://www.w3.org/2000/svg';

  o.createCloseButton = function () {
    if (this.options.staticOpen) {
      return;
    }

    var t = document.createElementNS(h, 'svg');
    t.setAttribute('class', 'huebee__close-button');
    t.setAttribute('viewBox', '0 0 24 24');
    t.setAttribute('width', '24');
    t.setAttribute('height', '24');
    var e = document.createElementNS(h, 'path');
    e.setAttribute('d', 'M 7,7 L 17,17 M 17,7 L 7,17');
    e.setAttribute('class', 'huebee__close-button__x');
    t.appendChild(e);
    t.addEventListener('click', this.closeIt);
    this.container.appendChild(t);
  };

  o.updateColors = function () {
    this.swatches = {};
    this.colorGrid = {};
    this.updateColorModer();
    var t = this.options.shades;
    var e = this.options.saturations;
    var o = this.options.hues;

    if (this.getCustomLength()) {
      var s = 0;
      this.options.customColors.forEach(function (t) {
        var e = s % o;
        var i = Math.floor(s / o);
        var n = g(t);

        if (n) {
          this.addSwatch(n, e, i);
          s++;
        }
      }.bind(this));
    }

    var i;

    for (i = 0; i < e; i++) {
      var n = 1 - i / e;
      var r = t * i + this.satY;
      this.updateSaturationGrid(i, n, r);
    }

    var a = this.getGrayCount();

    for (i = 0; i < a; i++) {
      var h = 1 - i / (t + 1);
      var u = this.colorModer(0, 0, h);
      var c = g(u);
      this.addSwatch(c, o + 1, i);
    }
  };

  o.getGrayCount = function () {
    return this.options.shades ? this.options.shades + 2 : 0;
  };

  o.updateSaturationGrid = function (t, e, i) {
    var n = this.options.shades;
    var o = this.options.hues;
    var s = this.options.hue0;

    for (var r = 0; r < n; r++) {
      for (var a = 0; a < o; a++) {
        var h = Math.round(a * 360 / o + s) % 360;
        var u = 1 - (r + 1) / (n + 1);
        var c = this.colorModer(h, e, u);
        var f = g(c);
        var d = r + i;
        this.addSwatch(f, a, d);
      }
    }
  };

  o.addSwatch = function (t, e, i) {
    this.swatches[e + ',' + i] = t;
    this.colorGrid[t.color.toUpperCase()] = {
      x: e,
      y: i
    };
  };

  var u = {
    hsl: function hsl(t, e, i) {
      e = Math.round(e * 100);
      i = Math.round(i * 100);
      return 'hsl(' + t + ', ' + e + '%, ' + i + '%)';
    },
    hex: C,
    shortHex: function shortHex(t, e, i) {
      var n = C(t, e, i);
      return S(n);
    }
  };

  o.updateColorModer = function () {
    this.colorModer = u[this.options.notation] || u.shortHex;
  };

  o.renderColors = function () {
    var t = this.gridSize * 2;

    for (var e in this.swatches) {
      var i = this.swatches[e];
      var n = e.split(',');
      var o = n[0];
      var s = n[1];
      this.ctx.fillStyle = i.color;
      this.ctx.fillRect(o * t, s * t, t, t);
    }
  };

  o.setAnchorColor = function () {
    if (this.isInputAnchor) {
      this.setColor(this.anchor.value);
    }
  };

  var c = document.documentElement;

  o.open = function () {
    if (this.isOpen) {
      return;
    }

    var t = this.anchor;
    var e = this.element;

    if (!this.options.staticOpen) {
      e.style.left = t.offsetLeft + 'px';
      e.style.top = t.offsetTop + t.offsetHeight + 'px';
    }

    this.bindOpenEvents(true);
    e.removeEventListener('transitionend', this.onElemTransitionend);
    t.parentNode.insertBefore(e, t.nextSibling);
    var i = getComputedStyle(e).transitionDuration;
    this.hasTransition = i && i != 'none' && parseFloat(i);
    this.isOpen = true;
    this.updateSizes();
    this.renderColors();
    this.setAnchorColor();
    var n = e.offsetHeight;
    e.classList.remove('is-hidden');
  };

  o.bindOpenEvents = function (t) {
    if (this.options.staticOpen) {
      return;
    }

    var e = (t ? 'add' : 'remove') + 'EventListener';
    c[e]('mousedown', this.outsideCloseIt);
    c[e]('touchstart', this.outsideCloseIt);
    document[e]('focusin', this.outsideCloseIt);
    document[e]('keydown', this.onDocKeydown);
    this.anchor[e]('blur', this.closeIt);
  };

  o.updateSizes = function () {
    var t = this.options.hues;
    var e = this.options.shades;
    var i = this.options.saturations;
    var n = this.getGrayCount();
    var o = this.getCustomLength();
    this.cursorBorder = parseInt(getComputedStyle(this.cursor).borderTopWidth, 10);
    this.gridSize = Math.round(this.cursor.offsetWidth - this.cursorBorder * 2);
    this.canvasOffset = {
      x: this.canvas.offsetLeft,
      y: this.canvas.offsetTop
    };
    var s, r;

    if (o && !n) {
      s = Math.min(o, t);
      r = Math.ceil(o / t);
    } else {
      s = t + 2;
      r = Math.max(e * i + this.satY, n);
    }

    var a = this.canvas.width = s * this.gridSize * 2;
    this.canvas.height = r * this.gridSize * 2;
    this.canvas.style.width = a / 2 + 'px';
  };

  o.outsideClose = function (t) {
    var e = this.anchor.contains(t.target);
    var i = this.element.contains(t.target);

    if (!e && !i) {
      this.close();
    }
  };

  var f = {
    13: true,
    27: true
  };

  o.docKeydown = function (t) {
    if (f[t.keyCode]) {
      this.close();
    }
  };

  var d = typeof c.style.transform == 'string';

  o.close = function () {
    if (!this.isOpen) {
      return;
    }

    if (d && this.hasTransition) {
      this.element.addEventListener('transitionend', this.onElemTransitionend);
    } else {
      this.remove();
    }

    this.element.classList.add('is-hidden');
    this.bindOpenEvents(false);
    this.isOpen = false;
  };

  o.remove = function () {
    var t = this.element.parentNode;

    if (t.contains(this.element)) {
      t.removeChild(this.element);
    }
  };

  o.elemTransitionend = function (t) {
    if (t.target != this.element) {
      return;
    }

    this.element.removeEventListener('transitionend', this.onElemTransitionend);
    this.remove();
  };

  o.inputInput = function () {
    this.setColor(this.anchor.value);
  };

  o.canvasPointerDown = function (t, e) {
    t.preventDefault();
    this.updateOffset();
    this.canvasPointerChange(e);
  };

  o.updateOffset = function () {
    var t = this.canvas.getBoundingClientRect();
    this.offset = {
      x: t.left + e.pageXOffset,
      y: t.top + e.pageYOffset
    };
  };

  o.canvasPointerMove = function (t, e) {
    this.canvasPointerChange(e);
  };

  o.canvasPointerChange = function (t) {
    var e = Math.round(t.pageX - this.offset.x);
    var i = Math.round(t.pageY - this.offset.y);
    var n = this.gridSize;
    var o = Math.floor(e / n);
    var s = Math.floor(i / n);
    var r = this.swatches[o + ',' + s];
    this.setSwatch(r);
  };

  o.setColor = function (t) {
    var e = g(t);
    this.setSwatch(e);
  };

  o.setSwatch = function (t) {
    var e = t && t.color;

    if (!t) {
      return;
    }

    var i = e == this.color;
    this.color = e;
    this.hue = t.hue;
    this.sat = t.sat;
    this.lum = t.lum;
    var n = this.lum - Math.cos((this.hue + 70) / 180 * Math.PI) * 0.15;
    this.isLight = n > 0.5;
    var o = this.colorGrid[e.toUpperCase()];
    this.updateCursor(o);
    this.setTexts();
    this.setBackgrounds();

    if (!i) {
      this.emitEvent('change', [e, t.hue, t.sat, t.lum]);
    }
  };

  o.setTexts = function () {
    if (!this.setTextElems) {
      return;
    }

    for (var t = 0; t < this.setTextElems.length; t++) {
      var e = this.setTextElems[t];
      var i = e.nodeName == 'INPUT' ? 'value' : 'textContent';
      e[i] = this.color;
    }
  };

  o.setBackgrounds = function () {
    if (!this.setBGElems) {
      return;
    }

    var t = this.isLight ? '#222' : 'white';

    for (var e = 0; e < this.setBGElems.length; e++) {
      var i = this.setBGElems[e];
      i.style.backgroundColor = this.color;
      i.style.color = t;
    }
  };

  o.updateCursor = function (t) {
    if (!this.isOpen) {
      return;
    }

    var e = t ? 'remove' : 'add';
    this.cursor.classList[e]('is-hidden');

    if (!t) {
      return;
    }

    var i = this.gridSize;
    var n = this.canvasOffset;
    var o = this.cursorBorder;
    this.cursor.style.left = t.x * i + n.x - o + 'px';
    this.cursor.style.top = t.y * i + n.y - o + 'px';
  };

  var v = e.console;

  function p() {
    var t = document.querySelectorAll('[data-huebee]');

    for (var e = 0; e < t.length; e++) {
      var i = t[e];
      var n = i.getAttribute('data-huebee');
      var o;

      try {
        o = n && JSON.parse(n);
      } catch (t) {
        if (v) {
          v.error('Error parsing data-huebee on ' + i.className + ': ' + t);
        }

        continue;
      }

      new s(i, o);
    }
  }

  var l = document.readyState;

  if (l == 'complete' || l == 'interactive') {
    p();
  } else {
    document.addEventListener('DOMContentLoaded', p);
  }

  s.data = function (t) {
    t = b(t);
    var e = t && t.huebeeGUID;
    return e && a[e];
  };

  var m;

  function g(t) {
    if (!m) {
      var e = document.createElement('canvas');
      e.width = e.height = 1;
      m = e.getContext('2d');
    }

    m.clearRect(0, 0, 1, 1);
    m.fillStyle = '#010203';
    m.fillStyle = t;
    m.fillRect(0, 0, 1, 1);
    var i = m.getImageData(0, 0, 1, 1).data;
    i = [i[0], i[1], i[2], i[3]];

    if (i.join(',') == '1,2,3,255') {
      return;
    }

    var n = _.apply(this, i);

    return {
      color: t.trim(),
      hue: n[0],
      sat: n[1],
      lum: n[2]
    };
  }

  function E(t, e) {
    for (var i in e) {
      t[i] = e[i];
    }

    return t;
  }

  function b(t) {
    if (typeof t == 'string') {
      t = document.querySelector(t);
    }

    return t;
  }

  function C(t, e, i) {
    var n = w(t, e, i);
    return y(n);
  }

  function w(t, e, i) {
    var n = (1 - Math.abs(2 * i - 1)) * e;
    var o = t / 60;
    var s = n * (1 - Math.abs(o % 2 - 1));
    var r, a;

    switch (Math.floor(o)) {
      case 0:
        r = [n, s, 0];
        break;

      case 1:
        r = [s, n, 0];
        break;

      case 2:
        r = [0, n, s];
        break;

      case 3:
        r = [0, s, n];
        break;

      case 4:
        r = [s, 0, n];
        break;

      case 5:
        r = [n, 0, s];
        break;

      default:
        r = [0, 0, 0];
    }

    a = i - n / 2;
    r = r.map(function (t) {
      return t + a;
    });
    return r;
  }

  function _(t, e, i) {
    t /= 255;
    e /= 255;
    i /= 255;
    var n = Math.max(t, e, i);
    var o = Math.min(t, e, i);
    var s = n - o;
    var r = 0.5 * (n + o);
    var a = s === 0 ? 0 : s / (1 - Math.abs(2 * r - 1));
    var h;

    if (s === 0) {
      h = 0;
    } else if (n === t) {
      h = (e - i) / s % 6;
    } else if (n === e) {
      h = (i - t) / s + 2;
    } else if (n === i) {
      h = (t - e) / s + 4;
    }

    var u = 60 * h;
    return [u, parseFloat(a), parseFloat(r)];
  }

  function y(t) {
    var e = t.map(function (t) {
      t = Math.round(t * 255);
      var e = t.toString(16).toUpperCase();
      e = e.length < 2 ? '0' + e : e;
      return e;
    });
    return '#' + e.join('');
  }

  function S(t) {
    return '#' + t[1] + t[3] + t[5];
  }

  return s;
});

/***/ }),

/***/ "./src/assets/js/utils/preloader.js":
/*!******************************************!*\
  !*** ./src/assets/js/utils/preloader.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "preloader": () => (/* binding */ preloader)
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");


var preloader = function preloader(gif, overlay, content, itemsIntro) {
  var preloaderAnim = gsap__WEBPACK_IMPORTED_MODULE_0__["default"].timeline({
    paused: true,
    defaults: {
      ease: 'expo'
    }
  }).to(gif, {
    opacity: 0,
    duration: 1.3
  }).to(overlay, {
    y: '-100%',
    duration: 2.5
  }, 0.2).set(gif, {
    display: 'none'
  }, 0.4).set(document.querySelector('.preloader'), {
    display: 'none'
  }, 3).set(content, {
    display: 'block'
  }, 1.2).from(itemsIntro, {
    autoAlpha: 0,
    duration: 1.5,
    y: 50,
    stagger: 0.2
  }, 1.21);
  setTimeout(function () {
    preloaderAnim.play();
  }, 1500);
};



/***/ }),

/***/ "./src/assets/sass/main.scss":
/*!***********************************!*\
  !*** ./src/assets/sass/main.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmeme_generator"] = self["webpackChunkmeme_generator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_gsap_index_js"], () => (__webpack_require__("./src/assets/js/index.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_gsap_index_js"], () => (__webpack_require__("./src/assets/sass/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvanMvbWFpbjZhNGYxMTQ1MjlhZWIzZGY2ZWM1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVlLFNBQVNFLEdBQVQsR0FBZTtBQUM1QjtBQUNGO0FBQ0E7QUFDRSxNQUFNQyxjQUFjLEdBQUc7QUFDckI7QUFDQUMsSUFBQUEsR0FBRyxFQUFFQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBRmdCO0FBSXJCO0FBQ0FDLElBQUFBLE9BQU8sRUFBRUYsUUFBUSxDQUFDQyxhQUFULENBQXVCLG9CQUF2QixDQUxZO0FBT3JCRSxJQUFBQSxPQUFPLEVBQUVILFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QixpQkFBeEIsQ0FQWTtBQVNyQjtBQUNBQyxJQUFBQSxVQUFVLEVBQUVMLFFBQVEsQ0FBQ00sZ0JBQVQsQ0FBMEIsY0FBMUI7QUFWUyxHQUF2QjtBQWFBQyxFQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDcENiLElBQUFBLDJEQUFTLENBQ1BHLGNBQWMsQ0FBQ0MsR0FEUixFQUVQRCxjQUFjLENBQUNJLE9BRlIsRUFHUEosY0FBYyxDQUFDSyxPQUhSLEVBSVBMLGNBQWMsQ0FBQ08sVUFKUixDQUFUO0FBTUQsR0FQRDtBQVNBO0FBQ0Y7QUFDQTs7QUFFRSxHQUFDLFlBQVk7QUFDWDtBQUNKO0FBQ0E7QUFDSSxRQUFNSSxjQUFjLEdBQUdULFFBQVEsQ0FBQ0ksY0FBVCxDQUF3QixtQkFBeEIsQ0FBdkI7QUFDQSxRQUFNTSxnQkFBZ0IsR0FBR1YsUUFBUSxDQUFDSSxjQUFULENBQXdCLHFCQUF4QixDQUF6QjtBQUNBLFFBQU1PLGFBQWEsR0FBRyxJQUFJZixzREFBSixDQUFXYSxjQUFYLEVBQTJCO0FBQy9DRyxNQUFBQSxPQUFPLEVBQUUsSUFEc0M7QUFFL0NDLE1BQUFBLFFBQVEsRUFBRSxLQUZxQztBQUcvQ0MsTUFBQUEsV0FBVyxFQUFFO0FBSGtDLEtBQTNCLENBQXRCO0FB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cGFjazovL21lbWUtZ2VuZXJhdG9yLy4vc3JjL2Fzc2V0cy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tZW1lLWdlbmVyYXRvci8uL3NyYy9hc3NldHMvanMvdXRpbHMvaHVlYmVlLmpzIiwid2VicGFjazovL21lbWUtZ2VuZXJhdG9yLy4vc3JjL2Fzc2V0cy9qcy91dGlscy9wcmVsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbWVtZS1nZW5lcmF0b3IvLi9zcmMvYXNzZXRzL3Nhc3MvbWFpbi5zY3NzP2Q5OTYiLCJ3ZWJwYWNrOi8vbWVtZS1nZW5lcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVtZS1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9tZW1lLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZW1lLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVtZS1nZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZW1lLWdlbmVyYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lbWUtZ2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL21lbWUtZ2VuZXJhdG9yL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWVtZS1nZW5lcmF0b3Ivd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL21lbWUtZ2VuZXJhdG9yL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmVsb2FkZXIgfSBmcm9tICcuL3V0aWxzL3ByZWxvYWRlcic7XHJcbmltcG9ydCBodWViZWUgZnJvbSAnLi91dGlscy9odWViZWUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwKCkge1xyXG4gIC8qKlxyXG4gICAqIFByZWxvYWRlclxyXG4gICAqL1xyXG4gIGNvbnN0IHByZWxvYWRlckl0ZW1zID0ge1xyXG4gICAgLy8gZ2lmIC0gcHJlbG9hZGVyXHJcbiAgICBnaWY6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXItaXRlbScpLFxyXG5cclxuICAgIC8vIHByZWxvYWRlciAtIG92ZXJsYXlcclxuICAgIG92ZXJsYXk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXItb3ZlcmxheScpLFxyXG5cclxuICAgIGNvbnRlbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LXdyYXBwZXInKSxcclxuXHJcbiAgICAvLyBzZWN0aW9uIGl0ZW0gY2xhc3MgZm9yIGludHJvIGFuaW1hdGlvblxyXG4gICAgaXRlbXNJbnRybzogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW1fX2ludHJvJyksXHJcbiAgfTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICBwcmVsb2FkZXIoXHJcbiAgICAgIHByZWxvYWRlckl0ZW1zLmdpZixcclxuICAgICAgcHJlbG9hZGVySXRlbXMub3ZlcmxheSxcclxuICAgICAgcHJlbG9hZGVySXRlbXMuY29udGVudCxcclxuICAgICAgcHJlbG9hZGVySXRlbXMuaXRlbXNJbnRyb1xyXG4gICAgKTtcclxuICB9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVtZSAtIGdlbmVyYXRvclxyXG4gICAqL1xyXG5cclxuICAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xvciBwaWNrZXIgLSBodWViZWVcclxuICAgICAqL1xyXG4gICAgY29uc3QgdGV4dENvbG9ySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JfX3RleHQtaW5wdXQnKTtcclxuICAgIGNvbnN0IHN0cm9rZUNvbG9ySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JfX3N0cm9rZS1pbnB1dCcpO1xyXG4gICAgY29uc3QgY29sb3JUZXh0SHVlYiA9IG5ldyBodWViZWUodGV4dENvbG9ySW5wdXQsIHtcclxuICAgICAgc2V0VGV4dDogdHJ1ZSxcclxuICAgICAgbm90YXRpb246ICdoZXgnLFxyXG4gICAgICBzYXR1cmF0aW9uczogMixcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc3Ryb2tlVGV4dEh1ZWIgPSBuZXcgaHVlYmVlKHN0cm9rZUNvbG9ySW5wdXQsIHtcclxuICAgICAgc2V0VGV4dDogdHJ1ZSxcclxuICAgICAgbm90YXRpb246ICdoZXgnLFxyXG4gICAgICBzYXR1cmF0aW9uczogMixcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVtZSAtIGdlbmVyYXRvclxyXG4gICAgICovXHJcbiAgICAvLyBtZW1lIGRlZmF1bHQgcHJvcGVydGllc1xyXG5cclxuICAgIGNvbnN0IG1lZGlhUXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYSgnc2NyZWVuIGFuZCAobWF4LXdpZHRoOjEwMjRweCknKTtcclxuXHJcbiAgICAvLyBTZXQgY2FudmFzIHdpZHRoIGRlcGVuZGluZyBvbiB3aW5kb3cgd2lkdGhcclxuICAgIGZ1bmN0aW9uIGNoZWNrTWVkaWEoY2FudmFzSXRlbSkge1xyXG4gICAgICBpZiAoIW1lZGlhUXVlcnkubWF0Y2hlcykge1xyXG4gICAgICAgIGNhbnZhc0l0ZW0ud2lkdGggPSA1MDA7XHJcbiAgICAgICAgY2FudmFzSXRlbS5oZWlnaHQgPSA1MDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FudmFzSXRlbS53aWR0aCA9IDMyMDtcclxuICAgICAgICBjYW52YXNJdGVtLmhlaWdodCA9IDMyMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNhbnZhc0l0ZW0ud2lkdGgsIGNhbnZhc0l0ZW0uaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIGxldCBjYW52YXNXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhc19fd3JhcHBlcicpO1xyXG4gICAgY2FudmFzV3JhcHBlci5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgY2hlY2tNZWRpYShjYW52YXMpO1xyXG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgbGV0IHRvcFRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0ZXh0X190b3AnKTtcclxuICAgIGxldCBib3R0b21UZXh0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGV4dF9fYm90dG9tJyk7XHJcbiAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBsZXQgZXhwb3J0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4cG9ydF9fYnRuJyk7XHJcbiAgICBsZXQgZm9udCA9ICdBcmlhbCc7XHJcbiAgICBsZXQgZm9udFNpemUgPSAnMzAnO1xyXG4gICAgbGV0IGNvbG9yVGV4dCA9ICcjY2M1OWQyJztcclxuICAgIGxldCBzdHJva2VDb2xvciA9ICcjNkVBNEJGJztcclxuXHJcbiAgICAvLyBSZWNyZWF0ZSBjYW52YXMgZG8gdW50YWludCBpdCAvIHdpdGhvdXQgdGhpcyBkZWZhdWx0IGltZyBub3Qgc2hvd2luZ1xyXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGNhbnZhcy5vdXRlckhUTUwgPSAnJztcclxuICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgIGNhbnZhc1dyYXBwZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICBkcmF3KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEltYWdlIHJlYWRlclxyXG4gICAgZnVuY3Rpb24gcmVhZGVyKCkge1xyXG4gICAgICBjb25zdCBpbWdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICBpbWdSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gaW1nUmVhZGVyLnJlc3VsdDtcclxuXHJcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpbWdSZWFkZXIucmVhZEFzRGF0YVVSTCh0aGlzLmZpbGVzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0FkZCB0cmlnZ2VyIG9uIHVwbG9hZCBpbWFnZSBidXR0b25cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWdfX2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcmVhZGVyKTtcclxuXHJcbiAgICAvL0FkZCB0cmlnZ2VyIGZvciB0aGUgdGV4dCBpbnB1dHNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWlucHV0JykuZm9yRWFjaChlID0+IHtcclxuICAgICAgZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkcmF3KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRHJhdyBpbWcgYW5kIHRleHRcclxuICAgIGZ1bmN0aW9uIGRyYXcoKSB7XHJcbiAgICAgIGNoZWNrTWVkaWEoY2FudmFzKTtcclxuXHJcbiAgICAgIGltZy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgaW1nLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgY3R4LmZvbnQgPSBgYm9sZCAke2ZvbnRTaXplfXB4ICR7Zm9udH1gO1xyXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcclxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yVGV4dDtcclxuICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuXHJcbiAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcclxuICAgICAgYWRkVGV4dChcclxuICAgICAgICB0b3BUZXh0SW5wdXQudmFsdWUsXHJcbiAgICAgICAgY2FudmFzLndpZHRoIC8gMixcclxuICAgICAgICBmb250U2l6ZSAvIDIsXHJcbiAgICAgICAgY2FudmFzLndpZHRoLFxyXG4gICAgICAgIGZvbnRTaXplICogMS4yLFxyXG4gICAgICAgICdwdXNoJ1xyXG4gICAgICApO1xyXG5cclxuICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdib3R0b20nO1xyXG4gICAgICBhZGRUZXh0KFxyXG4gICAgICAgIGJvdHRvbVRleHRJbnB1dC52YWx1ZSxcclxuICAgICAgICBjYW52YXMud2lkdGggLyAyLFxyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgLSBmb250U2l6ZSAvIDIsXHJcbiAgICAgICAgY2FudmFzLndpZHRoLFxyXG4gICAgICAgIC0oZm9udFNpemUgKiAxLjIpLFxyXG4gICAgICAgICd1bnNoaWZ0J1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdyaXRlIHRoZSB0ZXh0c1xyXG4gICAgZnVuY3Rpb24gYWRkVGV4dCh0ZXh0LCB4LCB5LCBhbGxvd2VkV2lkdGgsIGxoLCBtZXRob2QpIHtcclxuICAgICAgdmFyIGxpbmVzID0gW107XHJcbiAgICAgIHZhciBsaW5lID0gJyc7XHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoJyAnKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbWVhc3VyZWRMaW5lID0gbGluZSArICcgJyArIHdvcmRzW2ldO1xyXG4gICAgICAgIHZhciBtZWFzdXJlZFdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KG1lYXN1cmVkTGluZSkud2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChtZWFzdXJlZFdpZHRoID4gYWxsb3dlZFdpZHRoKSB7XHJcbiAgICAgICAgICBsaW5lc1ttZXRob2RdKGxpbmUpO1xyXG4gICAgICAgICAgbGluZSA9IHdvcmRzW2ldICsgJyAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaW5lID0gbWVhc3VyZWRMaW5lO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgbGluZXNbbWV0aG9kXShsaW5lKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGluZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBjdHguZmlsbFRleHQobGluZXNbal0sIHgsIHkgKyBqICogbGgsIGFsbG93ZWRXaWR0aCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZVRleHQobGluZXNbal0sIHgsIHkgKyBqICogbGgsIGFsbG93ZWRXaWR0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFuZ2UgZGVmYXVsdCBmb250XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcignI2ZvbnQtb3B0aW9uJylcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb250ID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBkcmF3KCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIENoYW5nZSBmb250IHNpemVcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcjdGV4dF9fc2l6ZS1pbnB1dCcpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb250U2l6ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgZHJhdygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2UgdGV4dCBjb2xvclxyXG4gICAgY29sb3JUZXh0SHVlYi5vbignY2hhbmdlJywgZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICAgIGNvbG9yVGV4dCA9IGNvbG9yO1xyXG4gICAgICBkcmF3KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2Ugc3Ryb2tlIGNvbG9yXHJcbiAgICBzdHJva2VUZXh0SHVlYi5vbignY2hhbmdlJywgZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICAgIHN0cm9rZUNvbG9yID0gY29sb3I7XHJcbiAgICAgIGRyYXcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvbnZlcnQgQ2FudmFzIHRvIGltYWdlIGFuZCBleHBvcnRcclxuICAgIGV4cG9ydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgaW1nTGluayA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xyXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBsaW5rLmRvd25sb2FkID0gJ215LW1lbWUnO1xyXG4gICAgICBsaW5rLmhyZWYgPSBpbWdMaW5rO1xyXG4gICAgICBsaW5rLmNsaWNrKCk7XHJcblxyXG4gICAgICBjb25zdCB3aW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHdpbmRvd0xpbmsgPSB3aW5kb3cub3BlbignJywgJ19ibGFuaycpO1xyXG4gICAgICAgIHdpbmRvd0xpbmsud2luZG93LmNsb3NlKCcnLCAnX2JsYW5rJyk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1NldCB2YWx1ZXMgb24gaW5wdXRzXHJcbiAgICBpbWcuc3JjID1cclxuICAgICAgJ2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS91Yz9leHBvcnQ9dmlldyZpZD0xWVdpNUtyakNhUk5pLXpoZDNNLXNTUVBKZzJpdXJQNWgnO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RleHRfX3NpemUtaW5wdXQnKS52YWx1ZSA9IGZvbnRTaXplO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbG9yX190ZXh0LWlucHV0Jykuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgY29sb3JUZXh0O1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbG9yX19zdHJva2UtaW5wdXQnKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxyXG4gICAgICBzdHJva2VDb2xvcjtcclxuICB9KSgpO1xyXG59XHJcbiIsImltcG9ydCBhcHAgZnJvbSAnLi9hcHAnO1xyXG5cclxuYXBwKCk7XHJcbiIsIi8qIVxyXG4gKiBIdWViZWUgUEFDS0FHRUQgdjIuMS4xXHJcbiAqIDEtY2xpY2sgY29sb3IgcGlja2VyXHJcbiAqIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vaHVlYmVlLmJ1enpcclxuICogQ29weXJpZ2h0IDIwMjAgTWV0YWZpenp5XHJcbiAqL1xyXG4oZnVuY3Rpb24gKHQsIGUpIHtcclxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZSgnZXYtZW1pdHRlci9ldi1lbWl0dGVyJywgZSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGUoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdC5FdkVtaXR0ZXIgPSBlKCk7XHJcbiAgfVxyXG59KSh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuICBmdW5jdGlvbiB0KCkge31cclxuICB2YXIgZSA9IHQucHJvdG90eXBlO1xyXG4gIGUub24gPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgaWYgKCF0IHx8ICFlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBpID0gKHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fSk7XHJcbiAgICB2YXIgbiA9IChpW3RdID0gaVt0XSB8fCBbXSk7XHJcbiAgICBpZiAobi5pbmRleE9mKGUpID09IC0xKSB7XHJcbiAgICAgIG4ucHVzaChlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcbiAgZS5vbmNlID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgIGlmICghdCB8fCAhZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uKHQsIGUpO1xyXG4gICAgdmFyIGkgPSAodGhpcy5fb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgfHwge30pO1xyXG4gICAgdmFyIG4gPSAoaVt0XSA9IGlbdF0gfHwge30pO1xyXG4gICAgbltlXSA9IHRydWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG4gIGUub2ZmID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgIHZhciBpID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1t0XTtcclxuICAgIGlmICghaSB8fCAhaS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIG4gPSBpLmluZGV4T2YoZSk7XHJcbiAgICBpZiAobiAhPSAtMSkge1xyXG4gICAgICBpLnNwbGljZShuLCAxKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcbiAgZS5lbWl0RXZlbnQgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgdmFyIGkgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW3RdO1xyXG4gICAgaWYgKCFpIHx8ICFpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpID0gaS5zbGljZSgwKTtcclxuICAgIGUgPSBlIHx8IFtdO1xyXG4gICAgdmFyIG4gPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbdF07XHJcbiAgICBmb3IgKHZhciBvID0gMDsgbyA8IGkubGVuZ3RoOyBvKyspIHtcclxuICAgICAgdmFyIHMgPSBpW29dO1xyXG4gICAgICB2YXIgciA9IG4gJiYgbltzXTtcclxuICAgICAgaWYgKHIpIHtcclxuICAgICAgICB0aGlzLm9mZih0LCBzKTtcclxuICAgICAgICBkZWxldGUgbltzXTtcclxuICAgICAgfVxyXG4gICAgICBzLmFwcGx5KHRoaXMsIGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuICBlLmFsbE9mZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHM7XHJcbiAgICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcclxuICB9O1xyXG4gIHJldHVybiB0O1xyXG59KTtcclxuLyohXHJcbiAqIFVuaXBvaW50ZXIgdjIuMy4wXHJcbiAqIGJhc2UgY2xhc3MgZm9yIGRvaW5nIG9uZSB0aGluZyB3aXRoIHBvaW50ZXIgZXZlbnRcclxuICogTUlUIGxpY2Vuc2VcclxuICovXHJcbihmdW5jdGlvbiAoZSwgaSkge1xyXG4gIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKCd1bmlwb2ludGVyL3VuaXBvaW50ZXInLCBbJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlciddLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICByZXR1cm4gaShlLCB0KTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBpKGUsIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGUuVW5pcG9pbnRlciA9IGkoZSwgZS5FdkVtaXR0ZXIpO1xyXG4gIH1cclxufSkod2luZG93LCBmdW5jdGlvbiB0KG8sIGUpIHtcclxuICAndXNlIHN0cmljdCc7XHJcbiAgZnVuY3Rpb24gaSgpIHt9XHJcbiAgZnVuY3Rpb24gbigpIHt9XHJcbiAgdmFyIHMgPSAobi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGUucHJvdG90eXBlKSk7XHJcbiAgcy5iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB0aGlzLl9iaW5kU3RhcnRFdmVudCh0LCB0cnVlKTtcclxuICB9O1xyXG4gIHMudW5iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB0aGlzLl9iaW5kU3RhcnRFdmVudCh0LCBmYWxzZSk7XHJcbiAgfTtcclxuICBzLl9iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICBlID0gZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGU7XHJcbiAgICB2YXIgaSA9IGUgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XHJcbiAgICB2YXIgbiA9ICdtb3VzZWRvd24nO1xyXG4gICAgaWYgKG8uUG9pbnRlckV2ZW50KSB7XHJcbiAgICAgIG4gPSAncG9pbnRlcmRvd24nO1xyXG4gICAgfSBlbHNlIGlmICgnb250b3VjaHN0YXJ0JyBpbiBvKSB7XHJcbiAgICAgIG4gPSAndG91Y2hzdGFydCc7XHJcbiAgICB9XHJcbiAgICB0W2ldKG4sIHRoaXMpO1xyXG4gIH07XHJcbiAgcy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB2YXIgZSA9ICdvbicgKyB0LnR5cGU7XHJcbiAgICBpZiAodGhpc1tlXSkge1xyXG4gICAgICB0aGlzW2VdKHQpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcy5nZXRUb3VjaCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICBmb3IgKHZhciBlID0gMDsgZSA8IHQubGVuZ3RoOyBlKyspIHtcclxuICAgICAgdmFyIGkgPSB0W2VdO1xyXG4gICAgICBpZiAoaS5pZGVudGlmaWVyID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgcy5vbm1vdXNlZG93biA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB2YXIgZSA9IHQuYnV0dG9uO1xyXG4gICAgaWYgKGUgJiYgZSAhPT0gMCAmJiBlICE9PSAxKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX3BvaW50ZXJEb3duKHQsIHQpO1xyXG4gIH07XHJcbiAgcy5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgdGhpcy5fcG9pbnRlckRvd24odCwgdC5jaGFuZ2VkVG91Y2hlc1swXSk7XHJcbiAgfTtcclxuICBzLm9ucG9pbnRlcmRvd24gPSBmdW5jdGlvbiAodCkge1xyXG4gICAgdGhpcy5fcG9pbnRlckRvd24odCwgdCk7XHJcbiAgfTtcclxuICBzLl9wb2ludGVyRG93biA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICBpZiAodC5idXR0b24gfHwgdGhpcy5pc1BvaW50ZXJEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuaXNQb2ludGVyRG93biA9IHRydWU7XHJcbiAgICB0aGlzLnBvaW50ZXJJZGVudGlmaWVyID1cclxuICAgICAgZS5wb2ludGVySWQgIT09IHVuZGVmaW5lZCA/IGUucG9pbnRlcklkIDogZS5pZGVudGlmaWVyO1xyXG4gICAgdGhpcy5wb2ludGVyRG93bih0LCBlKTtcclxuICB9O1xyXG4gIHMucG9pbnRlckRvd24gPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyh0KTtcclxuICAgIHRoaXMuZW1pdEV2ZW50KCdwb2ludGVyRG93bicsIFt0LCBlXSk7XHJcbiAgfTtcclxuICB2YXIgciA9IHtcclxuICAgIG1vdXNlZG93bjogWydtb3VzZW1vdmUnLCAnbW91c2V1cCddLFxyXG4gICAgdG91Y2hzdGFydDogWyd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnXSxcclxuICAgIHBvaW50ZXJkb3duOiBbJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCcsICdwb2ludGVyY2FuY2VsJ10sXHJcbiAgfTtcclxuICBzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIGlmICghdCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgZSA9IHJbdC50eXBlXTtcclxuICAgIGUuZm9yRWFjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICBvLmFkZEV2ZW50TGlzdGVuZXIodCwgdGhpcyk7XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyA9IGU7XHJcbiAgfTtcclxuICBzLl91bmJpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICBvLnJlbW92ZUV2ZW50TGlzdGVuZXIodCwgdGhpcyk7XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIGRlbGV0ZSB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHM7XHJcbiAgfTtcclxuICBzLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKHQsIHQpO1xyXG4gIH07XHJcbiAgcy5vbnBvaW50ZXJtb3ZlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIGlmICh0LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyKSB7XHJcbiAgICAgIHRoaXMuX3BvaW50ZXJNb3ZlKHQsIHQpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcy5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB2YXIgZSA9IHRoaXMuZ2V0VG91Y2godC5jaGFuZ2VkVG91Y2hlcyk7XHJcbiAgICBpZiAoZSkge1xyXG4gICAgICB0aGlzLl9wb2ludGVyTW92ZSh0LCBlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHMuX3BvaW50ZXJNb3ZlID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgIHRoaXMucG9pbnRlck1vdmUodCwgZSk7XHJcbiAgfTtcclxuICBzLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgIHRoaXMuZW1pdEV2ZW50KCdwb2ludGVyTW92ZScsIFt0LCBlXSk7XHJcbiAgfTtcclxuICBzLm9ubW91c2V1cCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB0aGlzLl9wb2ludGVyVXAodCwgdCk7XHJcbiAgfTtcclxuICBzLm9ucG9pbnRlcnVwID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIGlmICh0LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyKSB7XHJcbiAgICAgIHRoaXMuX3BvaW50ZXJVcCh0LCB0KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHMub250b3VjaGVuZCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB2YXIgZSA9IHRoaXMuZ2V0VG91Y2godC5jaGFuZ2VkVG91Y2hlcyk7XHJcbiAgICBpZiAoZSkge1xyXG4gICAgICB0aGlzLl9wb2ludGVyVXAodCwgZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzLl9wb2ludGVyVXAgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgdGhpcy5fcG9pbnRlckRvbmUoKTtcclxuICAgIHRoaXMucG9pbnRlclVwKHQsIGUpO1xyXG4gIH07XHJcbiAgcy5wb2ludGVyVXAgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgdGhpcy5lbWl0RXZlbnQoJ3BvaW50ZXJVcCcsIFt0LCBlXSk7XHJcbiAgfTtcclxuICBzLl9wb2ludGVyRG9uZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX3BvaW50ZXJSZXNldCgpO1xyXG4gICAgdGhpcy5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzKCk7XHJcbiAgICB0aGlzLnBvaW50ZXJEb25lKCk7XHJcbiAgfTtcclxuICBzLl9wb2ludGVyUmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmlzUG9pbnRlckRvd24gPSBmYWxzZTtcclxuICAgIGRlbGV0ZSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyO1xyXG4gIH07XHJcbiAgcy5wb2ludGVyRG9uZSA9IGk7XHJcbiAgcy5vbnBvaW50ZXJjYW5jZWwgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgaWYgKHQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIpIHtcclxuICAgICAgdGhpcy5fcG9pbnRlckNhbmNlbCh0LCB0KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHMub250b3VjaGNhbmNlbCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICB2YXIgZSA9IHRoaXMuZ2V0VG91Y2godC5jaGFuZ2VkVG91Y2hlcyk7XHJcbiAgICBpZiAoZSkge1xyXG4gICAgICB0aGlzLl9wb2ludGVyQ2FuY2VsKHQsIGUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcy5fcG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICB0aGlzLl9wb2ludGVyRG9uZSgpO1xyXG4gICAgdGhpcy5wb2ludGVyQ2FuY2VsKHQsIGUpO1xyXG4gIH07XHJcbiAgcy5wb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgIHRoaXMuZW1pdEV2ZW50KCdwb2ludGVyQ2FuY2VsJywgW3QsIGVdKTtcclxuICB9O1xyXG4gIG4uZ2V0UG9pbnRlclBvaW50ID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHJldHVybiB7IHg6IHQucGFnZVgsIHk6IHQucGFnZVkgfTtcclxuICB9O1xyXG4gIHJldHVybiBuO1xyXG59KTtcclxuLyohXHJcbiAqIEh1ZWJlZSB2Mi4xLjFcclxuICogMS1jbGljayBjb2xvciBwaWNrZXJcclxuICogTUlUIGxpY2Vuc2VcclxuICogaHR0cHM6Ly9odWViZWUuYnV6elxyXG4gKiBDb3B5cmlnaHQgMjAyMCBNZXRhZml6enlcclxuICovXHJcbihmdW5jdGlvbiAoaSwgbikge1xyXG4gIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKFsnZXYtZW1pdHRlci9ldi1lbWl0dGVyJywgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlciddLCBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICByZXR1cm4gbihpLCB0LCBlKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBuKGksIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSwgcmVxdWlyZSgndW5pcG9pbnRlcicpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaS5IdWViZWUgPSBuKGksIGkuRXZFbWl0dGVyLCBpLlVuaXBvaW50ZXIpO1xyXG4gIH1cclxufSkod2luZG93LCBmdW5jdGlvbiB0KGUsIGksIG4pIHtcclxuICBmdW5jdGlvbiBzKHQsIGUpIHtcclxuICAgIHQgPSBiKHQpO1xyXG4gICAgaWYgKCF0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIGVsZW1lbnQgZm9yIEh1ZWJlZTogJyArIHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hbmNob3IgPSB0O1xyXG4gICAgdGhpcy5vcHRpb25zID0ge307XHJcbiAgICB0aGlzLm9wdGlvbihzLmRlZmF1bHRzKTtcclxuICAgIHRoaXMub3B0aW9uKGUpO1xyXG4gICAgdGhpcy5jcmVhdGUoKTtcclxuICB9XHJcbiAgcy5kZWZhdWx0cyA9IHtcclxuICAgIGh1ZXM6IDEyLFxyXG4gICAgaHVlMDogMCxcclxuICAgIHNoYWRlczogNSxcclxuICAgIHNhdHVyYXRpb25zOiAzLFxyXG4gICAgbm90YXRpb246ICdzaG9ydEhleCcsXHJcbiAgICBzZXRUZXh0OiB0cnVlLFxyXG4gICAgc2V0QkdDb2xvcjogdHJ1ZSxcclxuICB9O1xyXG4gIHZhciBvID0gKHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSkpO1xyXG4gIG8ub3B0aW9uID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IEUodGhpcy5vcHRpb25zLCB0KTtcclxuICB9O1xyXG4gIHZhciByID0gMDtcclxuICB2YXIgYSA9IHt9O1xyXG4gIG8uY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHQgPSAodGhpcy5ndWlkID0gKytyKTtcclxuICAgIHRoaXMuYW5jaG9yLmh1ZWJlZUdVSUQgPSB0O1xyXG4gICAgYVt0XSA9IHRoaXM7XHJcbiAgICB0aGlzLnNldEJHRWxlbXMgPSB0aGlzLmdldFNldEVsZW1zKHRoaXMub3B0aW9ucy5zZXRCR0NvbG9yKTtcclxuICAgIHRoaXMuc2V0VGV4dEVsZW1zID0gdGhpcy5nZXRTZXRFbGVtcyh0aGlzLm9wdGlvbnMuc2V0VGV4dCk7XHJcbiAgICB0aGlzLm91dHNpZGVDbG9zZUl0ID0gdGhpcy5vdXRzaWRlQ2xvc2UuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Eb2NLZXlkb3duID0gdGhpcy5kb2NLZXlkb3duLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmNsb3NlSXQgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9wZW5JdCA9IHRoaXMub3Blbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbkVsZW1UcmFuc2l0aW9uZW5kID0gdGhpcy5lbGVtVHJhbnNpdGlvbmVuZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5pc0lucHV0QW5jaG9yID0gdGhpcy5hbmNob3Iubm9kZU5hbWUgPT0gJ0lOUFVUJztcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnN0YXRpY09wZW4pIHtcclxuICAgICAgdGhpcy5hbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW5JdCk7XHJcbiAgICAgIHRoaXMuYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5vcGVuSXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNJbnB1dEFuY2hvcikge1xyXG4gICAgICB0aGlzLmFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaW5wdXRJbnB1dC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHZhciBlID0gKHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuICAgIGUuY2xhc3NOYW1lID0gJ2h1ZWJlZSAnO1xyXG4gICAgZS5jbGFzc05hbWUgKz0gdGhpcy5vcHRpb25zLnN0YXRpY09wZW4gPyAnaXMtc3RhdGljLW9wZW4gJyA6ICdpcy1oaWRkZW4gJztcclxuICAgIGUuY2xhc3NOYW1lICs9IHRoaXMub3B0aW9ucy5jbGFzc05hbWUgfHwgJyc7XHJcbiAgICB2YXIgaSA9ICh0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuICAgIGkuY2xhc3NOYW1lID0gJ2h1ZWJlZV9fY29udGFpbmVyJztcclxuICAgIGZ1bmN0aW9uIG4odCkge1xyXG4gICAgICBpZiAodC50YXJnZXQgPT0gaSkge1xyXG4gICAgICAgIHQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBuKTtcclxuICAgIGkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG4pO1xyXG4gICAgdGhpcy5jcmVhdGVDYW52YXMoKTtcclxuICAgIHRoaXMuY3Vyc29yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmN1cnNvci5jbGFzc05hbWUgPSAnaHVlYmVlX19jdXJzb3IgaXMtaGlkZGVuJztcclxuICAgIGkuYXBwZW5kQ2hpbGQodGhpcy5jdXJzb3IpO1xyXG4gICAgdGhpcy5jcmVhdGVDbG9zZUJ1dHRvbigpO1xyXG4gICAgZS5hcHBlbmRDaGlsZChpKTtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnN0YXRpY09wZW4pIHtcclxuICAgICAgdmFyIG8gPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuYW5jaG9yLnBhcmVudE5vZGUpO1xyXG4gICAgICBpZiAoby5wb3NpdGlvbiAhPSAncmVsYXRpdmUnICYmIG8ucG9zaXRpb24gIT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgIHRoaXMuYW5jaG9yLnBhcmVudE5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgcyA9IHRoaXMuZ2V0Q3VzdG9tTGVuZ3RoKCk7XHJcbiAgICB0aGlzLnNhdFkgPSBzID8gTWF0aC5jZWlsKHMgLyB0aGlzLm9wdGlvbnMuaHVlcykgKyAxIDogMDtcclxuICAgIHRoaXMudXBkYXRlQ29sb3JzKCk7XHJcbiAgICB0aGlzLnNldEFuY2hvckNvbG9yKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN0YXRpY09wZW4pIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBvLmdldFNldEVsZW1zID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIGlmICh0ID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBbdGhpcy5hbmNob3JdO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdCA9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0KTtcclxuICAgIH1cclxuICB9O1xyXG4gIG8uZ2V0Q3VzdG9tTGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHQgPSB0aGlzLm9wdGlvbnMuY3VzdG9tQ29sb3JzO1xyXG4gICAgcmV0dXJuICh0ICYmIHQubGVuZ3RoKSB8fCAwO1xyXG4gIH07XHJcbiAgby5jcmVhdGVDYW52YXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdCA9ICh0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpKTtcclxuICAgIHQuY2xhc3NOYW1lID0gJ2h1ZWJlZV9fY2FudmFzJztcclxuICAgIHRoaXMuY3R4ID0gdC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdmFyIGUgPSAodGhpcy5jYW52YXNQb2ludGVyID0gbmV3IG4oKSk7XHJcbiAgICBlLl9iaW5kU3RhcnRFdmVudCh0KTtcclxuICAgIGUub24oJ3BvaW50ZXJEb3duJywgdGhpcy5jYW52YXNQb2ludGVyRG93bi5iaW5kKHRoaXMpKTtcclxuICAgIGUub24oJ3BvaW50ZXJNb3ZlJywgdGhpcy5jYW52YXNQb2ludGVyTW92ZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHQpO1xyXG4gIH07XHJcbiAgdmFyIGggPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG4gIG8uY3JlYXRlQ2xvc2VCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN0YXRpY09wZW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoaCwgJ3N2ZycpO1xyXG4gICAgdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2h1ZWJlZV9fY2xvc2UtYnV0dG9uJyk7XHJcbiAgICB0LnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMjQgMjQnKTtcclxuICAgIHQuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyNCcpO1xyXG4gICAgdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcyNCcpO1xyXG4gICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoaCwgJ3BhdGgnKTtcclxuICAgIGUuc2V0QXR0cmlidXRlKCdkJywgJ00gNyw3IEwgMTcsMTcgTSAxNyw3IEwgNywxNycpO1xyXG4gICAgZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2h1ZWJlZV9fY2xvc2UtYnV0dG9uX194Jyk7XHJcbiAgICB0LmFwcGVuZENoaWxkKGUpO1xyXG4gICAgdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VJdCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0KTtcclxuICB9O1xyXG4gIG8udXBkYXRlQ29sb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zd2F0Y2hlcyA9IHt9O1xyXG4gICAgdGhpcy5jb2xvckdyaWQgPSB7fTtcclxuICAgIHRoaXMudXBkYXRlQ29sb3JNb2RlcigpO1xyXG4gICAgdmFyIHQgPSB0aGlzLm9wdGlvbnMuc2hhZGVzO1xyXG4gICAgdmFyIGUgPSB0aGlzLm9wdGlvbnMuc2F0dXJhdGlvbnM7XHJcbiAgICB2YXIgbyA9IHRoaXMub3B0aW9ucy5odWVzO1xyXG4gICAgaWYgKHRoaXMuZ2V0Q3VzdG9tTGVuZ3RoKCkpIHtcclxuICAgICAgdmFyIHMgPSAwO1xyXG4gICAgICB0aGlzLm9wdGlvbnMuY3VzdG9tQ29sb3JzLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgIHZhciBlID0gcyAlIG87XHJcbiAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IocyAvIG8pO1xyXG4gICAgICAgICAgdmFyIG4gPSBnKHQpO1xyXG4gICAgICAgICAgaWYgKG4pIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTd2F0Y2gobiwgZSwgaSk7XHJcbiAgICAgICAgICAgIHMrKztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHZhciBpO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGU7IGkrKykge1xyXG4gICAgICB2YXIgbiA9IDEgLSBpIC8gZTtcclxuICAgICAgdmFyIHIgPSB0ICogaSArIHRoaXMuc2F0WTtcclxuICAgICAgdGhpcy51cGRhdGVTYXR1cmF0aW9uR3JpZChpLCBuLCByKTtcclxuICAgIH1cclxuICAgIHZhciBhID0gdGhpcy5nZXRHcmF5Q291bnQoKTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBhOyBpKyspIHtcclxuICAgICAgdmFyIGggPSAxIC0gaSAvICh0ICsgMSk7XHJcbiAgICAgIHZhciB1ID0gdGhpcy5jb2xvck1vZGVyKDAsIDAsIGgpO1xyXG4gICAgICB2YXIgYyA9IGcodSk7XHJcbiAgICAgIHRoaXMuYWRkU3dhdGNoKGMsIG8gKyAxLCBpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIG8uZ2V0R3JheUNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaGFkZXMgPyB0aGlzLm9wdGlvbnMuc2hhZGVzICsgMiA6IDA7XHJcbiAgfTtcclxuICBvLnVwZGF0ZVNhdHVyYXRpb25HcmlkID0gZnVuY3Rpb24gKHQsIGUsIGkpIHtcclxuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLnNoYWRlcztcclxuICAgIHZhciBvID0gdGhpcy5vcHRpb25zLmh1ZXM7XHJcbiAgICB2YXIgcyA9IHRoaXMub3B0aW9ucy5odWUwO1xyXG4gICAgZm9yICh2YXIgciA9IDA7IHIgPCBuOyByKyspIHtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IGEgPCBvOyBhKyspIHtcclxuICAgICAgICB2YXIgaCA9IE1hdGgucm91bmQoKGEgKiAzNjApIC8gbyArIHMpICUgMzYwO1xyXG4gICAgICAgIHZhciB1ID0gMSAtIChyICsgMSkgLyAobiArIDEpO1xyXG4gICAgICAgIHZhciBjID0gdGhpcy5jb2xvck1vZGVyKGgsIGUsIHUpO1xyXG4gICAgICAgIHZhciBmID0gZyhjKTtcclxuICAgICAgICB2YXIgZCA9IHIgKyBpO1xyXG4gICAgICAgIHRoaXMuYWRkU3dhdGNoKGYsIGEsIGQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBvLmFkZFN3YXRjaCA9IGZ1bmN0aW9uICh0LCBlLCBpKSB7XHJcbiAgICB0aGlzLnN3YXRjaGVzW2UgKyAnLCcgKyBpXSA9IHQ7XHJcbiAgICB0aGlzLmNvbG9yR3JpZFt0LmNvbG9yLnRvVXBwZXJDYXNlKCldID0geyB4OiBlLCB5OiBpIH07XHJcbiAgfTtcclxuICB2YXIgdSA9IHtcclxuICAgIGhzbDogZnVuY3Rpb24gKHQsIGUsIGkpIHtcclxuICAgICAgZSA9IE1hdGgucm91bmQoZSAqIDEwMCk7XHJcbiAgICAgIGkgPSBNYXRoLnJvdW5kKGkgKiAxMDApO1xyXG4gICAgICByZXR1cm4gJ2hzbCgnICsgdCArICcsICcgKyBlICsgJyUsICcgKyBpICsgJyUpJztcclxuICAgIH0sXHJcbiAgICBoZXg6IEMsXHJcbiAgICBzaG9ydEhleDogZnVuY3Rpb24gKHQsIGUsIGkpIHtcclxuICAgICAgdmFyIG4gPSBDKHQsIGUsIGkpO1xyXG4gICAgICByZXR1cm4gUyhuKTtcclxuICAgIH0sXHJcbiAgfTtcclxuICBvLnVwZGF0ZUNvbG9yTW9kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbG9yTW9kZXIgPSB1W3RoaXMub3B0aW9ucy5ub3RhdGlvbl0gfHwgdS5zaG9ydEhleDtcclxuICB9O1xyXG4gIG8ucmVuZGVyQ29sb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHQgPSB0aGlzLmdyaWRTaXplICogMjtcclxuICAgIGZvciAodmFyIGUgaW4gdGhpcy5zd2F0Y2hlcykge1xyXG4gICAgICB2YXIgaSA9IHRoaXMuc3dhdGNoZXNbZV07XHJcbiAgICAgIHZhciBuID0gZS5zcGxpdCgnLCcpO1xyXG4gICAgICB2YXIgbyA9IG5bMF07XHJcbiAgICAgIHZhciBzID0gblsxXTtcclxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gaS5jb2xvcjtcclxuICAgICAgdGhpcy5jdHguZmlsbFJlY3QobyAqIHQsIHMgKiB0LCB0LCB0KTtcclxuICAgIH1cclxuICB9O1xyXG4gIG8uc2V0QW5jaG9yQ29sb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5pc0lucHV0QW5jaG9yKSB7XHJcbiAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5hbmNob3IudmFsdWUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgdmFyIGMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgby5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB0ID0gdGhpcy5hbmNob3I7XHJcbiAgICB2YXIgZSA9IHRoaXMuZWxlbWVudDtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnN0YXRpY09wZW4pIHtcclxuICAgICAgZS5zdHlsZS5sZWZ0ID0gdC5vZmZzZXRMZWZ0ICsgJ3B4JztcclxuICAgICAgZS5zdHlsZS50b3AgPSB0Lm9mZnNldFRvcCArIHQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgIH1cclxuICAgIHRoaXMuYmluZE9wZW5FdmVudHModHJ1ZSk7XHJcbiAgICBlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uRWxlbVRyYW5zaXRpb25lbmQpO1xyXG4gICAgdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLCB0Lm5leHRTaWJsaW5nKTtcclxuICAgIHZhciBpID0gZ2V0Q29tcHV0ZWRTdHlsZShlKS50cmFuc2l0aW9uRHVyYXRpb247XHJcbiAgICB0aGlzLmhhc1RyYW5zaXRpb24gPSBpICYmIGkgIT0gJ25vbmUnICYmIHBhcnNlRmxvYXQoaSk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICB0aGlzLnVwZGF0ZVNpemVzKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbG9ycygpO1xyXG4gICAgdGhpcy5zZXRBbmNob3JDb2xvcigpO1xyXG4gICAgdmFyIG4gPSBlLm9mZnNldEhlaWdodDtcclxuICAgIGUuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XHJcbiAgfTtcclxuICBvLmJpbmRPcGVuRXZlbnRzID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RhdGljT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgZSA9ICh0ID8gJ2FkZCcgOiAncmVtb3ZlJykgKyAnRXZlbnRMaXN0ZW5lcic7XHJcbiAgICBjW2VdKCdtb3VzZWRvd24nLCB0aGlzLm91dHNpZGVDbG9zZUl0KTtcclxuICAgIGNbZV0oJ3RvdWNoc3RhcnQnLCB0aGlzLm91dHNpZGVDbG9zZUl0KTtcclxuICAgIGRvY3VtZW50W2VdKCdmb2N1c2luJywgdGhpcy5vdXRzaWRlQ2xvc2VJdCk7XHJcbiAgICBkb2N1bWVudFtlXSgna2V5ZG93bicsIHRoaXMub25Eb2NLZXlkb3duKTtcclxuICAgIHRoaXMuYW5jaG9yW2VdKCdibHVyJywgdGhpcy5jbG9zZUl0KTtcclxuICB9O1xyXG4gIG8udXBkYXRlU2l6ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdCA9IHRoaXMub3B0aW9ucy5odWVzO1xyXG4gICAgdmFyIGUgPSB0aGlzLm9wdGlvbnMuc2hhZGVzO1xyXG4gICAgdmFyIGkgPSB0aGlzLm9wdGlvbnMuc2F0dXJhdGlvbnM7XHJcbiAgICB2YXIgbiA9IHRoaXMuZ2V0R3JheUNvdW50KCk7XHJcbiAgICB2YXIgbyA9IHRoaXMuZ2V0Q3VzdG9tTGVuZ3RoKCk7XHJcbiAgICB0aGlzLmN1cnNvckJvcmRlciA9IHBhcnNlSW50KFxyXG4gICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuY3Vyc29yKS5ib3JkZXJUb3BXaWR0aCxcclxuICAgICAgMTBcclxuICAgICk7XHJcbiAgICB0aGlzLmdyaWRTaXplID0gTWF0aC5yb3VuZCh0aGlzLmN1cnNvci5vZmZzZXRXaWR0aCAtIHRoaXMuY3Vyc29yQm9yZGVyICogMik7XHJcbiAgICB0aGlzLmNhbnZhc09mZnNldCA9IHsgeDogdGhpcy5jYW52YXMub2Zmc2V0TGVmdCwgeTogdGhpcy5jYW52YXMub2Zmc2V0VG9wIH07XHJcbiAgICB2YXIgcywgcjtcclxuICAgIGlmIChvICYmICFuKSB7XHJcbiAgICAgIHMgPSBNYXRoLm1pbihvLCB0KTtcclxuICAgICAgciA9IE1hdGguY2VpbChvIC8gdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzID0gdCArIDI7XHJcbiAgICAgIHIgPSBNYXRoLm1heChlICogaSArIHRoaXMuc2F0WSwgbik7XHJcbiAgICB9XHJcbiAgICB2YXIgYSA9ICh0aGlzLmNhbnZhcy53aWR0aCA9IHMgKiB0aGlzLmdyaWRTaXplICogMik7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSByICogdGhpcy5ncmlkU2l6ZSAqIDI7XHJcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGEgLyAyICsgJ3B4JztcclxuICB9O1xyXG4gIG8ub3V0c2lkZUNsb3NlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHZhciBlID0gdGhpcy5hbmNob3IuY29udGFpbnModC50YXJnZXQpO1xyXG4gICAgdmFyIGkgPSB0aGlzLmVsZW1lbnQuY29udGFpbnModC50YXJnZXQpO1xyXG4gICAgaWYgKCFlICYmICFpKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHZhciBmID0geyAxMzogdHJ1ZSwgMjc6IHRydWUgfTtcclxuICBvLmRvY0tleWRvd24gPSBmdW5jdGlvbiAodCkge1xyXG4gICAgaWYgKGZbdC5rZXlDb2RlXSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICB2YXIgZCA9IHR5cGVvZiBjLnN0eWxlLnRyYW5zZm9ybSA9PSAnc3RyaW5nJztcclxuICBvLmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZCAmJiB0aGlzLmhhc1RyYW5zaXRpb24pIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uRWxlbVRyYW5zaXRpb25lbmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcclxuICAgIHRoaXMuYmluZE9wZW5FdmVudHMoZmFsc2UpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICB9O1xyXG4gIG8ucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHQgPSB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgIGlmICh0LmNvbnRhaW5zKHRoaXMuZWxlbWVudCkpIHtcclxuICAgICAgdC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgby5lbGVtVHJhbnNpdGlvbmVuZCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICBpZiAodC50YXJnZXQgIT0gdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vbkVsZW1UcmFuc2l0aW9uZW5kKTtcclxuICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgfTtcclxuICBvLmlucHV0SW5wdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldENvbG9yKHRoaXMuYW5jaG9yLnZhbHVlKTtcclxuICB9O1xyXG4gIG8uY2FudmFzUG9pbnRlckRvd24gPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgdC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy51cGRhdGVPZmZzZXQoKTtcclxuICAgIHRoaXMuY2FudmFzUG9pbnRlckNoYW5nZShlKTtcclxuICB9O1xyXG4gIG8udXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHQgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHRoaXMub2Zmc2V0ID0geyB4OiB0LmxlZnQgKyBlLnBhZ2VYT2Zmc2V0LCB5OiB0LnRvcCArIGUucGFnZVlPZmZzZXQgfTtcclxuICB9O1xyXG4gIG8uY2FudmFzUG9pbnRlck1vdmUgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgdGhpcy5jYW52YXNQb2ludGVyQ2hhbmdlKGUpO1xyXG4gIH07XHJcbiAgby5jYW52YXNQb2ludGVyQ2hhbmdlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHZhciBlID0gTWF0aC5yb3VuZCh0LnBhZ2VYIC0gdGhpcy5vZmZzZXQueCk7XHJcbiAgICB2YXIgaSA9IE1hdGgucm91bmQodC5wYWdlWSAtIHRoaXMub2Zmc2V0LnkpO1xyXG4gICAgdmFyIG4gPSB0aGlzLmdyaWRTaXplO1xyXG4gICAgdmFyIG8gPSBNYXRoLmZsb29yKGUgLyBuKTtcclxuICAgIHZhciBzID0gTWF0aC5mbG9vcihpIC8gbik7XHJcbiAgICB2YXIgciA9IHRoaXMuc3dhdGNoZXNbbyArICcsJyArIHNdO1xyXG4gICAgdGhpcy5zZXRTd2F0Y2gocik7XHJcbiAgfTtcclxuICBvLnNldENvbG9yID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHZhciBlID0gZyh0KTtcclxuICAgIHRoaXMuc2V0U3dhdGNoKGUpO1xyXG4gIH07XHJcbiAgby5zZXRTd2F0Y2ggPSBmdW5jdGlvbiAodCkge1xyXG4gICAgdmFyIGUgPSB0ICYmIHQuY29sb3I7XHJcbiAgICBpZiAoIXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGkgPSBlID09IHRoaXMuY29sb3I7XHJcbiAgICB0aGlzLmNvbG9yID0gZTtcclxuICAgIHRoaXMuaHVlID0gdC5odWU7XHJcbiAgICB0aGlzLnNhdCA9IHQuc2F0O1xyXG4gICAgdGhpcy5sdW0gPSB0Lmx1bTtcclxuICAgIHZhciBuID0gdGhpcy5sdW0gLSBNYXRoLmNvcygoKHRoaXMuaHVlICsgNzApIC8gMTgwKSAqIE1hdGguUEkpICogMC4xNTtcclxuICAgIHRoaXMuaXNMaWdodCA9IG4gPiAwLjU7XHJcbiAgICB2YXIgbyA9IHRoaXMuY29sb3JHcmlkW2UudG9VcHBlckNhc2UoKV07XHJcbiAgICB0aGlzLnVwZGF0ZUN1cnNvcihvKTtcclxuICAgIHRoaXMuc2V0VGV4dHMoKTtcclxuICAgIHRoaXMuc2V0QmFja2dyb3VuZHMoKTtcclxuICAgIGlmICghaSkge1xyXG4gICAgICB0aGlzLmVtaXRFdmVudCgnY2hhbmdlJywgW2UsIHQuaHVlLCB0LnNhdCwgdC5sdW1dKTtcclxuICAgIH1cclxuICB9O1xyXG4gIG8uc2V0VGV4dHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2V0VGV4dEVsZW1zKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy5zZXRUZXh0RWxlbXMubGVuZ3RoOyB0KyspIHtcclxuICAgICAgdmFyIGUgPSB0aGlzLnNldFRleHRFbGVtc1t0XTtcclxuICAgICAgdmFyIGkgPSBlLm5vZGVOYW1lID09ICdJTlBVVCcgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcclxuICAgICAgZVtpXSA9IHRoaXMuY29sb3I7XHJcbiAgICB9XHJcbiAgfTtcclxuICBvLnNldEJhY2tncm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnNldEJHRWxlbXMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHQgPSB0aGlzLmlzTGlnaHQgPyAnIzIyMicgOiAnd2hpdGUnO1xyXG4gICAgZm9yICh2YXIgZSA9IDA7IGUgPCB0aGlzLnNldEJHRWxlbXMubGVuZ3RoOyBlKyspIHtcclxuICAgICAgdmFyIGkgPSB0aGlzLnNldEJHRWxlbXNbZV07XHJcbiAgICAgIGkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcjtcclxuICAgICAgaS5zdHlsZS5jb2xvciA9IHQ7XHJcbiAgICB9XHJcbiAgfTtcclxuICBvLnVwZGF0ZUN1cnNvciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBlID0gdCA/ICdyZW1vdmUnIDogJ2FkZCc7XHJcbiAgICB0aGlzLmN1cnNvci5jbGFzc0xpc3RbZV0oJ2lzLWhpZGRlbicpO1xyXG4gICAgaWYgKCF0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBpID0gdGhpcy5ncmlkU2l6ZTtcclxuICAgIHZhciBuID0gdGhpcy5jYW52YXNPZmZzZXQ7XHJcbiAgICB2YXIgbyA9IHRoaXMuY3Vyc29yQm9yZGVyO1xyXG4gICAgdGhpcy5jdXJzb3Iuc3R5bGUubGVmdCA9IHQueCAqIGkgKyBuLnggLSBvICsgJ3B4JztcclxuICAgIHRoaXMuY3Vyc29yLnN0eWxlLnRvcCA9IHQueSAqIGkgKyBuLnkgLSBvICsgJ3B4JztcclxuICB9O1xyXG4gIHZhciB2ID0gZS5jb25zb2xlO1xyXG4gIGZ1bmN0aW9uIHAoKSB7XHJcbiAgICB2YXIgdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWh1ZWJlZV0nKTtcclxuICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdC5sZW5ndGg7IGUrKykge1xyXG4gICAgICB2YXIgaSA9IHRbZV07XHJcbiAgICAgIHZhciBuID0gaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHVlYmVlJyk7XHJcbiAgICAgIHZhciBvO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIG8gPSBuICYmIEpTT04ucGFyc2Uobik7XHJcbiAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgdi5lcnJvcignRXJyb3IgcGFyc2luZyBkYXRhLWh1ZWJlZSBvbiAnICsgaS5jbGFzc05hbWUgKyAnOiAnICsgdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIG5ldyBzKGksIG8pO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgbCA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XHJcbiAgaWYgKGwgPT0gJ2NvbXBsZXRlJyB8fCBsID09ICdpbnRlcmFjdGl2ZScpIHtcclxuICAgIHAoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHApO1xyXG4gIH1cclxuICBzLmRhdGEgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgdCA9IGIodCk7XHJcbiAgICB2YXIgZSA9IHQgJiYgdC5odWViZWVHVUlEO1xyXG4gICAgcmV0dXJuIGUgJiYgYVtlXTtcclxuICB9O1xyXG4gIHZhciBtO1xyXG4gIGZ1bmN0aW9uIGcodCkge1xyXG4gICAgaWYgKCFtKSB7XHJcbiAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgIGUud2lkdGggPSBlLmhlaWdodCA9IDE7XHJcbiAgICAgIG0gPSBlLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB9XHJcbiAgICBtLmNsZWFyUmVjdCgwLCAwLCAxLCAxKTtcclxuICAgIG0uZmlsbFN0eWxlID0gJyMwMTAyMDMnO1xyXG4gICAgbS5maWxsU3R5bGUgPSB0O1xyXG4gICAgbS5maWxsUmVjdCgwLCAwLCAxLCAxKTtcclxuICAgIHZhciBpID0gbS5nZXRJbWFnZURhdGEoMCwgMCwgMSwgMSkuZGF0YTtcclxuICAgIGkgPSBbaVswXSwgaVsxXSwgaVsyXSwgaVszXV07XHJcbiAgICBpZiAoaS5qb2luKCcsJykgPT0gJzEsMiwzLDI1NScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIG4gPSBfLmFwcGx5KHRoaXMsIGkpO1xyXG4gICAgcmV0dXJuIHsgY29sb3I6IHQudHJpbSgpLCBodWU6IG5bMF0sIHNhdDogblsxXSwgbHVtOiBuWzJdIH07XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIEUodCwgZSkge1xyXG4gICAgZm9yICh2YXIgaSBpbiBlKSB7XHJcbiAgICAgIHRbaV0gPSBlW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGIodCkge1xyXG4gICAgaWYgKHR5cGVvZiB0ID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIEModCwgZSwgaSkge1xyXG4gICAgdmFyIG4gPSB3KHQsIGUsIGkpO1xyXG4gICAgcmV0dXJuIHkobik7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHcodCwgZSwgaSkge1xyXG4gICAgdmFyIG4gPSAoMSAtIE1hdGguYWJzKDIgKiBpIC0gMSkpICogZTtcclxuICAgIHZhciBvID0gdCAvIDYwO1xyXG4gICAgdmFyIHMgPSBuICogKDEgLSBNYXRoLmFicygobyAlIDIpIC0gMSkpO1xyXG4gICAgdmFyIHIsIGE7XHJcbiAgICBzd2l0Y2ggKE1hdGguZmxvb3IobykpIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHIgPSBbbiwgcywgMF07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICByID0gW3MsIG4sIDBdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgciA9IFswLCBuLCBzXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHIgPSBbMCwgcywgbl07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICByID0gW3MsIDAsIG5dO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDU6XHJcbiAgICAgICAgciA9IFtuLCAwLCBzXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByID0gWzAsIDAsIDBdO1xyXG4gICAgfVxyXG4gICAgYSA9IGkgLSBuIC8gMjtcclxuICAgIHIgPSByLm1hcChmdW5jdGlvbiAodCkge1xyXG4gICAgICByZXR1cm4gdCArIGE7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByO1xyXG4gIH1cclxuICBmdW5jdGlvbiBfKHQsIGUsIGkpIHtcclxuICAgIHQgLz0gMjU1O1xyXG4gICAgZSAvPSAyNTU7XHJcbiAgICBpIC89IDI1NTtcclxuICAgIHZhciBuID0gTWF0aC5tYXgodCwgZSwgaSk7XHJcbiAgICB2YXIgbyA9IE1hdGgubWluKHQsIGUsIGkpO1xyXG4gICAgdmFyIHMgPSBuIC0gbztcclxuICAgIHZhciByID0gMC41ICogKG4gKyBvKTtcclxuICAgIHZhciBhID0gcyA9PT0gMCA/IDAgOiBzIC8gKDEgLSBNYXRoLmFicygyICogciAtIDEpKTtcclxuICAgIHZhciBoO1xyXG4gICAgaWYgKHMgPT09IDApIHtcclxuICAgICAgaCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKG4gPT09IHQpIHtcclxuICAgICAgaCA9ICgoZSAtIGkpIC8gcykgJSA2O1xyXG4gICAgfSBlbHNlIGlmIChuID09PSBlKSB7XHJcbiAgICAgIGggPSAoaSAtIHQpIC8gcyArIDI7XHJcbiAgICB9IGVsc2UgaWYgKG4gPT09IGkpIHtcclxuICAgICAgaCA9ICh0IC0gZSkgLyBzICsgNDtcclxuICAgIH1cclxuICAgIHZhciB1ID0gNjAgKiBoO1xyXG4gICAgcmV0dXJuIFt1LCBwYXJzZUZsb2F0KGEpLCBwYXJzZUZsb2F0KHIpXTtcclxuICB9XHJcbiAgZnVuY3Rpb24geSh0KSB7XHJcbiAgICB2YXIgZSA9IHQubWFwKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgIHQgPSBNYXRoLnJvdW5kKHQgKiAyNTUpO1xyXG4gICAgICB2YXIgZSA9IHQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGUgPSBlLmxlbmd0aCA8IDIgPyAnMCcgKyBlIDogZTtcclxuICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAnIycgKyBlLmpvaW4oJycpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBTKHQpIHtcclxuICAgIHJldHVybiAnIycgKyB0WzFdICsgdFszXSArIHRbNV07XHJcbiAgfVxyXG4gIHJldHVybiBzO1xyXG59KTtcclxuIiwiaW1wb3J0IGdzYXAgZnJvbSAnZ3NhcCc7XHJcblxyXG5jb25zdCBwcmVsb2FkZXIgPSAoZ2lmLCBvdmVybGF5LCBjb250ZW50LCBpdGVtc0ludHJvKSA9PiB7XHJcbiAgY29uc3QgcHJlbG9hZGVyQW5pbSA9IGdzYXBcclxuICAgIC50aW1lbGluZSh7IHBhdXNlZDogdHJ1ZSwgZGVmYXVsdHM6IHsgZWFzZTogJ2V4cG8nIH0gfSlcclxuICAgIC50byhnaWYsIHtcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgZHVyYXRpb246IDEuMyxcclxuICAgIH0pXHJcbiAgICAudG8oXHJcbiAgICAgIG92ZXJsYXksXHJcbiAgICAgIHtcclxuICAgICAgICB5OiAnLTEwMCUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAyLjUsXHJcbiAgICAgIH0sXHJcbiAgICAgIDAuMlxyXG4gICAgKVxyXG4gICAgLnNldChcclxuICAgICAgZ2lmLFxyXG4gICAgICB7XHJcbiAgICAgICAgZGlzcGxheTogJ25vbmUnLFxyXG4gICAgICB9LFxyXG4gICAgICAwLjRcclxuICAgIClcclxuICAgIC5zZXQoXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKSxcclxuICAgICAge1xyXG4gICAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuICAgICAgfSxcclxuICAgICAgM1xyXG4gICAgKVxyXG4gICAgLnNldChcclxuICAgICAgY29udGVudCxcclxuICAgICAge1xyXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgIH0sXHJcbiAgICAgIDEuMlxyXG4gICAgKVxyXG4gICAgLmZyb20oXHJcbiAgICAgIGl0ZW1zSW50cm8sXHJcbiAgICAgIHtcclxuICAgICAgICBhdXRvQWxwaGE6IDAsXHJcbiAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICB5OiA1MCxcclxuICAgICAgICBzdGFnZ2VyOiAwLjIsXHJcbiAgICAgIH0sXHJcbiAgICAgIDEuMjFcclxuICAgICk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgcHJlbG9hZGVyQW5pbS5wbGF5KCk7XHJcbiAgfSwgMTUwMCk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBwcmVsb2FkZXIgfTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmttZW1lX2dlbmVyYXRvclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmttZW1lX2dlbmVyYXRvclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2dzYXBfaW5kZXhfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXNzZXRzL2pzL2luZGV4LmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfZ3NhcF9pbmRleF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hc3NldHMvc2Fzcy9tYWluLnNjc3NcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJwcmVsb2FkZXIiLCJodWViZWUiLCJhcHAiLCJwcmVsb2FkZXJJdGVtcyIsImdpZiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm92ZXJsYXkiLCJjb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpdGVtc0ludHJvIiwicXVlcnlTZWxlY3RvckFsbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0ZXh0Q29sb3JJbnB1dCIsInN0cm9rZUNvbG9ySW5wdXQiLCJjb2xvclRleHRIdWViIiwic2V0VGV4dCIsIm5vdGF0aW9uIiwic2F0dXJhdGlvbnMiLCJzdHJva2VUZXh0SHVlYiIsIm1lZGlhUXVlcnkiLCJtYXRjaE1lZGlhIiwiY2hlY2tNZWRpYSIsImNhbnZhc0l0ZW0iLCJtYXRjaGVzIiwid2lkdGgiLCJoZWlnaHQiLCJjYW52YXMiLCJjcmVhdGVFbGVtZW50IiwiY2FudmFzV3JhcHBlciIsImFwcGVuZENoaWxkIiwiY3R4IiwiZ2V0Q29udGV4dCIsInRvcFRleHRJbnB1dCIsImJvdHRvbVRleHRJbnB1dCIsImltZyIsImV4cG9ydEJ0biIsImZvbnQiLCJmb250U2l6ZSIsImNvbG9yVGV4dCIsInN0cm9rZUNvbG9yIiwib25sb2FkIiwiZSIsIm91dGVySFRNTCIsImRyYXciLCJyZWFkZXIiLCJpbWdSZWFkZXIiLCJGaWxlUmVhZGVyIiwiSW1hZ2UiLCJzcmMiLCJyZXN1bHQiLCJkcmF3SW1hZ2UiLCJyZWFkQXNEYXRhVVJMIiwiZmlsZXMiLCJmb3JFYWNoIiwiY2xlYXJSZWN0Iiwic3Ryb2tlU3R5bGUiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJsaW5lV2lkdGgiLCJ0ZXh0QmFzZWxpbmUiLCJhZGRUZXh0IiwidmFsdWUiLCJ0ZXh0IiwieCIsInkiLCJhbGxvd2VkV2lkdGgiLCJsaCIsIm1ldGhvZCIsImxpbmVzIiwibGluZSIsIndvcmRzIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwibWVhc3VyZWRMaW5lIiwibWVhc3VyZWRXaWR0aCIsIm1lYXN1cmVUZXh0IiwiaiIsImZpbGxUZXh0Iiwic3Ryb2tlVGV4dCIsIm1pbiIsIm1heCIsIm9uIiwiY29sb3IiLCJpbWdMaW5rIiwidG9EYXRhVVJMIiwibGluayIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwid2luIiwid2luZG93TGluayIsIm9wZW4iLCJjbG9zZSIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwidCIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJFdkVtaXR0ZXIiLCJwcm90b3R5cGUiLCJfZXZlbnRzIiwibiIsImluZGV4T2YiLCJwdXNoIiwib25jZSIsIl9vbmNlRXZlbnRzIiwib2ZmIiwic3BsaWNlIiwiZW1pdEV2ZW50Iiwic2xpY2UiLCJvIiwicyIsInIiLCJhcHBseSIsImFsbE9mZiIsInJlcXVpcmUiLCJVbmlwb2ludGVyIiwiT2JqZWN0IiwiY3JlYXRlIiwiYmluZFN0YXJ0RXZlbnQiLCJfYmluZFN0YXJ0RXZlbnQiLCJ1bmJpbmRTdGFydEV2ZW50IiwidW5kZWZpbmVkIiwiUG9pbnRlckV2ZW50IiwiaGFuZGxlRXZlbnQiLCJ0eXBlIiwiZ2V0VG91Y2giLCJpZGVudGlmaWVyIiwicG9pbnRlcklkZW50aWZpZXIiLCJvbm1vdXNlZG93biIsImJ1dHRvbiIsIl9wb2ludGVyRG93biIsIm9udG91Y2hzdGFydCIsImNoYW5nZWRUb3VjaGVzIiwib25wb2ludGVyZG93biIsImlzUG9pbnRlckRvd24iLCJwb2ludGVySWQiLCJwb2ludGVyRG93biIsIl9iaW5kUG9zdFN0YXJ0RXZlbnRzIiwibW91c2Vkb3duIiwidG91Y2hzdGFydCIsInBvaW50ZXJkb3duIiwiX2JvdW5kUG9pbnRlckV2ZW50cyIsIl91bmJpbmRQb3N0U3RhcnRFdmVudHMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25tb3VzZW1vdmUiLCJfcG9pbnRlck1vdmUiLCJvbnBvaW50ZXJtb3ZlIiwib250b3VjaG1vdmUiLCJwb2ludGVyTW92ZSIsIm9ubW91c2V1cCIsIl9wb2ludGVyVXAiLCJvbnBvaW50ZXJ1cCIsIm9udG91Y2hlbmQiLCJfcG9pbnRlckRvbmUiLCJwb2ludGVyVXAiLCJfcG9pbnRlclJlc2V0IiwicG9pbnRlckRvbmUiLCJvbnBvaW50ZXJjYW5jZWwiLCJfcG9pbnRlckNhbmNlbCIsIm9udG91Y2hjYW5jZWwiLCJwb2ludGVyQ2FuY2VsIiwiZ2V0UG9pbnRlclBvaW50IiwicGFnZVgiLCJwYWdlWSIsIkh1ZWJlZSIsImIiLCJFcnJvciIsImFuY2hvciIsIm9wdGlvbnMiLCJvcHRpb24iLCJkZWZhdWx0cyIsImh1ZXMiLCJodWUwIiwic2hhZGVzIiwic2V0QkdDb2xvciIsIkUiLCJhIiwiZ3VpZCIsImh1ZWJlZUdVSUQiLCJzZXRCR0VsZW1zIiwiZ2V0U2V0RWxlbXMiLCJzZXRUZXh0RWxlbXMiLCJvdXRzaWRlQ2xvc2VJdCIsIm91dHNpZGVDbG9zZSIsImJpbmQiLCJvbkRvY0tleWRvd24iLCJkb2NLZXlkb3duIiwiY2xvc2VJdCIsIm9wZW5JdCIsIm9uRWxlbVRyYW5zaXRpb25lbmQiLCJlbGVtVHJhbnNpdGlvbmVuZCIsImlzSW5wdXRBbmNob3IiLCJub2RlTmFtZSIsInN0YXRpY09wZW4iLCJpbnB1dElucHV0IiwiZWxlbWVudCIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsInRhcmdldCIsInByZXZlbnREZWZhdWx0IiwiY3JlYXRlQ2FudmFzIiwiY3Vyc29yIiwiY3JlYXRlQ2xvc2VCdXR0b24iLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50Tm9kZSIsInBvc2l0aW9uIiwiZ2V0Q3VzdG9tTGVuZ3RoIiwic2F0WSIsIk1hdGgiLCJjZWlsIiwidXBkYXRlQ29sb3JzIiwic2V0QW5jaG9yQ29sb3IiLCJjdXN0b21Db2xvcnMiLCJjYW52YXNQb2ludGVyIiwiY2FudmFzUG9pbnRlckRvd24iLCJjYW52YXNQb2ludGVyTW92ZSIsImgiLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRBdHRyaWJ1dGUiLCJzd2F0Y2hlcyIsImNvbG9yR3JpZCIsInVwZGF0ZUNvbG9yTW9kZXIiLCJmbG9vciIsImciLCJhZGRTd2F0Y2giLCJ1cGRhdGVTYXR1cmF0aW9uR3JpZCIsImdldEdyYXlDb3VudCIsInUiLCJjb2xvck1vZGVyIiwiYyIsInJvdW5kIiwiZiIsImQiLCJ0b1VwcGVyQ2FzZSIsImhzbCIsImhleCIsIkMiLCJzaG9ydEhleCIsIlMiLCJyZW5kZXJDb2xvcnMiLCJncmlkU2l6ZSIsImZpbGxSZWN0Iiwic2V0Q29sb3IiLCJkb2N1bWVudEVsZW1lbnQiLCJpc09wZW4iLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsInRvcCIsIm9mZnNldFRvcCIsIm9mZnNldEhlaWdodCIsImJpbmRPcGVuRXZlbnRzIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoYXNUcmFuc2l0aW9uIiwicGFyc2VGbG9hdCIsInVwZGF0ZVNpemVzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY3Vyc29yQm9yZGVyIiwicGFyc2VJbnQiLCJib3JkZXJUb3BXaWR0aCIsIm9mZnNldFdpZHRoIiwiY2FudmFzT2Zmc2V0IiwiY29udGFpbnMiLCJrZXlDb2RlIiwidHJhbnNmb3JtIiwiYWRkIiwicmVtb3ZlQ2hpbGQiLCJ1cGRhdGVPZmZzZXQiLCJjYW52YXNQb2ludGVyQ2hhbmdlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwib2Zmc2V0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsInNldFN3YXRjaCIsImh1ZSIsInNhdCIsImx1bSIsImNvcyIsIlBJIiwiaXNMaWdodCIsInVwZGF0ZUN1cnNvciIsInNldFRleHRzIiwic2V0QmFja2dyb3VuZHMiLCJ2IiwiY29uc29sZSIsInAiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImwiLCJyZWFkeVN0YXRlIiwiZGF0YSIsIm0iLCJnZXRJbWFnZURhdGEiLCJqb2luIiwiXyIsInRyaW0iLCJ3IiwiYWJzIiwibWFwIiwidG9TdHJpbmciLCJnc2FwIiwicHJlbG9hZGVyQW5pbSIsInRpbWVsaW5lIiwicGF1c2VkIiwiZWFzZSIsInRvIiwib3BhY2l0eSIsImR1cmF0aW9uIiwic2V0IiwiZGlzcGxheSIsImZyb20iLCJhdXRvQWxwaGEiLCJzdGFnZ2VyIiwic2V0VGltZW91dCIsInBsYXkiXSwic291cmNlUm9vdCI6IiJ9