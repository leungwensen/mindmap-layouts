(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MindmapLayouts"] = factory();
	else
		root["MindmapLayouts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const randomInt = __webpack_require__(2);

module.exports = arr => {
    if (!Array.isArray(arr) || !arr.length) {
        return null;
    }
    return arr[randomInt(arr.length - 1)];
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const randomInt = __webpack_require__(2);

module.exports = (start, end) => start + randomInt(end - start);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = n => Math.round(Math.random() * n);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zero_colors__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zero_colors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zero_colors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_random_graph__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_random_graph___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_random_graph__);



/* harmony default export */ __webpack_exports__["a"] = () => {
  const rgba = `rgba(${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_random_graph__["randomInt"])(255)}, ${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_random_graph__["randomInt"])(255)}, ${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_random_graph__["randomInt"])(255)}, 0.6)`;
  return new __WEBPACK_IMPORTED_MODULE_0_zero_colors___default.a(rgba);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const randomTree = __webpack_require__(15);
const utils = __webpack_require__(5);

const res = Object.assign({
    randomTree
}, utils);

module.exports = res;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    randomCharFromCategories: __webpack_require__(6),
    randomChinese: __webpack_require__(7),
    randomFromArray: __webpack_require__(0),
    randomFromRange: __webpack_require__(1),
    randomInt: __webpack_require__(2),
    randomJapanese: __webpack_require__(8),
    randomLetter: __webpack_require__(9),
    randomNumber: __webpack_require__(10),
    randomSpecial: __webpack_require__(11),
    randomString: __webpack_require__(16),
    uuid: __webpack_require__(17)
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const randomFromArray = __webpack_require__(0);
const randomByCats = {
    chinese: __webpack_require__(7),
    japanese: __webpack_require__(8),
    letter: __webpack_require__(9),
    number: __webpack_require__(10),
    special: __webpack_require__(11)
};

module.exports = cats => {
    const cat = randomFromArray(cats);
    return randomByCats[cat]();
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const randomFromRange = __webpack_require__(1);

const range = {
    start: 0x4E00,
    end: 0x9FA5
};

module.exports = () => String.fromCharCode(randomFromRange(range.start, range.end));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const randomFromArray = __webpack_require__(0);
const randomFromRange = __webpack_require__(1);

const ranges = [{
    start: 0x3040,
    end: 0x309F
}, {
    start: 0x30A0,
    end: 0x30FF
}];

module.exports = () => {
    const range = randomFromArray(ranges);
    return String.fromCharCode(randomFromRange(range.start, range.end));
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


const randomFromArray = __webpack_require__(0);

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = () => randomFromArray(letters);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const randomFromArray = __webpack_require__(0);

const numbers = '0123456789'.split('');

module.exports = () => randomFromArray(numbers);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const randomFromArray = __webpack_require__(0);

const specialChars = '!$%^&*()_+|~-=`{}[]:;<>?,./'.split('');

module.exports = () => randomFromArray(specialChars);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random_color__ = __webpack_require__(3);


const lineColor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__random_color__["a" /* default */])().toGrey().toString(true);

/* harmony default export */ __webpack_exports__["a"] = (n, c, ctx, isHorizontal) => {
  let beginNode = n;
  let endNode = c;
  let beginX;
  let beginY;
  let endX;
  let endY;
  if (isHorizontal) {
    if (n.x > c.x) {
      beginNode = c;
      endNode = n;
    }
    beginX = Math.round(beginNode.x + beginNode.width - beginNode.hgap);
    beginY = Math.round(beginNode.y + beginNode.height / 2);
    endX = Math.round(endNode.x + endNode.hgap);
    endY = Math.round(endNode.y + endNode.height / 2);
  } else {
    if (n.y > c.y) {
      beginNode = c;
      endNode = n;
    }
    beginX = Math.round(beginNode.x + beginNode.width / 2);
    beginY = Math.round(beginNode.y + beginNode.height - beginNode.vgap);
    endX = Math.round(endNode.x + endNode.width / 2);
    endY = Math.round(endNode.y + endNode.vgap);
  }
  if (beginNode.isRoot()) {
    beginX = Math.round(beginNode.x + beginNode.width / 2);
    beginY = Math.round(beginNode.y + beginNode.height / 2);
  }
  if (endNode.isRoot()) {
    endX = Math.round(endNode.x + endNode.width / 2);
    endY = Math.round(endNode.y + endNode.height / 2);
  }
  // console.log(`(${beginX}, ${beginY}), (${endX}, ${endY})`)
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  if (isHorizontal) {
    ctx.bezierCurveTo(Math.round(beginX + (beginNode.hgap + endNode.hgap) / 2), beginY, Math.round(endX - (beginNode.hgap + endNode.hgap) / 2), endY, endX, endY);
  } else {
    ctx.bezierCurveTo(beginX, Math.round(beginY + (beginNode.vgap + endNode.vgap) / 2), endX, Math.round(endY - (beginNode.vgap + endNode.vgap) / 2), endX, endY);
  }
  ctx.stroke();
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random_color__ = __webpack_require__(3);


/* harmony default export */ __webpack_exports__["a"] = (node, ctx) => {
    const color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__random_color__["a" /* default */])();
    // console.log(color.toRgba());
    const x = Math.round(node.x + node.hgap);
    const y = Math.round(node.y + node.vgap);
    const width = Math.round(node.width - node.hgap * 2);
    const height = Math.round(node.height - node.vgap * 2);
    // const x = Math.round(node.x)
    // const y = Math.round(node.y)
    // const width = Math.round(node.width)
    // const height = Math.round(node.height)
    ctx.clearRect(x, y, width, height);
    ctx.fillStyle = color.toString();
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = color.toGrey().toString();
    ctx.strokeRect(x, y, width, height);
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_graph__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_graph___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_random_graph__);


/* harmony default export */ __webpack_exports__["a"] = size => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_random_graph__["randomTree"])({
  size,
  attributes: {
    id: {
      type: 'uuid'
    },
    name: {
      type: 'randomString',
      options: {
        length: 0,
        maxLength: 12
      }
    }
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const utils = __webpack_require__(5);

function generateRoot(options) {
    const root = {
        children: []
    };
    const attributes = options.attributes;
    for (let key in attributes) {
        root[key] = utils[attributes[key].type](attributes[key].options);
    }
    return root;
}

function generateNode(root, child) {
    const rand = utils.randomInt(root.children.length);
    if (rand === root.children.length) {
        root.children.push(child);
    } else {
        generateNode(root.children[rand], child);
    }
}

const DEFAULT_OPTIONS = {
    size: 10,
    attributes: {
        id: {
            type: 'uuid'
        },
        name: {
            type: 'randomString',
            options: {
                maxLength: 10
            }
        }
    }
};

function randomTree(customizedOptions) {
    const options = Object.assign({}, DEFAULT_OPTIONS, customizedOptions);
    const root = generateRoot(options);
    for (let i = 0; i < options.size; i++) {
        generateNode(root, generateRoot(options));
    }
    return root;
}

module.exports = randomTree;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const randomCharFromCats = __webpack_require__(6);
const randomFromRange = __webpack_require__(1);

const DEFAULT_OPTIONS = {
    length: 6,
    maxLength: 6,
    capitalization: 'lowercase', // lowercase, uppercase
    categories: [
    // 'number',
    'letter']
};

module.exports = customizedOptions => {
    const options = Object.assign({}, DEFAULT_OPTIONS, customizedOptions);
    let res = '';
    const len = options.length ? options.length : randomFromRange(1, options.maxLength);
    for (let i = 0; i < len; i++) {
        res += randomCharFromCats(options.categories);
    }
    if (options.capitalization === 'uppercase') {
        res = res.toUpperCase();
    }
    return res;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const namedColor = __webpack_require__(19);

const round = Math.round;

function isString(obj) {
  return typeof obj === 'string';
}
function lc(str) {
  return str.toLowerCase();
}

function confine(c, low, high) {
  c = Number(c);
  if (isFinite(c)) {
    if (c < low) {
      return low;
    }
    return c > high ? high : c;
  }
  return high;
}
function hue2rgb(m1, m2, h) {
  if (h < 0) {
    ++h;
  }
  if (h > 1) {
    --h;
  }
  const h6 = 6 * h;
  if (h6 < 1) {
    return m1 + (m2 - m1) * h6;
  }
  if (2 * h < 1) {
    return m2;
  }
  if (3 * h < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  }
  return m1;
}
function rgb2hsl(r, g, b, a) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return [h, s, l, a];
}

class Color {
  // init props
  // r: 255,
  // g: 255,
  // b: 255,
  // a: 1,

  constructor( /* Array|String|Object */color) {
    let me = this;
    if (color) {
      if (isString(color)) {
        me = Color.fromString(color);
      } else if (Array.isArray(color)) {
        me = Color.fromArray(color, me);
      } else {
        me.set(color.r, color.g, color.b, color.a);
        if (!(color instanceof Color)) {
          me.sanitize();
        }
      }
    } else {
      me.set(255, 255, 255, 1);
    }
    return me;
  }

  set(r, g, b, a) {
    const me = this;
    me.r = r;
    me.g = g;
    me.b = b;
    me.a = a;
  }

  sanitize() {
    const me = this;
    me.r = round(confine(me.r, 0, 255));
    me.g = round(confine(me.g, 0, 255));
    me.b = round(confine(me.b, 0, 255));
    me.a = confine(me.a, 0, 1);
    return me;
  }

  toRgba() {
    const me = this;
    return [me.r, me.g, me.b, me.a];
  }

  toHsla() {
    const me = this;
    return rgb2hsl(me.r, me.g, me.b, me.a);
  }

  toHex() {
    const me = this;
    const arr = ['r', 'g', 'b'].map(x => {
      const str = me[x].toString(16);
      return str.length < 2 ? `0${str}` : str;
    });
    return `#${arr.join('')}`;
  }

  toCss( /* Boolean? */includeAlpha) {
    const me = this;
    const rgb = `${me.r},${me.g},${me.b}`;
    return includeAlpha ? `rgba(${rgb},${me.a})` : `rgb(${rgb})`;
  }

  toString() {
    return this.toCss(true);
  }

  toGrey() {
    const me = this;
    const g = round((me.r + me.g + me.b) / 3);
    return Color.makeGrey(g, me.a);
  }
}

Object.assign(Color, {
  hexByName: namedColor,

  makeGrey( /* Number */g, /* Number? */a) {
    return Color.fromArray([g, g, g, a]);
  },

  blendColors( /* Color */start, /* Color */end, /* Number */weight, /* Color? */obj) {
    const t = obj || new Color();
    ['r', 'g', 'b', 'a'].forEach(x => {
      t[x] = start[x] + (end[x] - start[x]) * weight;
      if (x !== 'a') {
        t[x] = Math.round(t[x]);
      }
    });
    return t.sanitize();
  },

  fromHex( /* String */color) {
    const result = new Color();
    const bits = color.length === 4 ? 4 : 8;
    const mask = (1 << bits) - 1;

    color = Number(`0x${color.substr(1)}`);

    if (isNaN(color)) {
      return null;
    }
    ['b', 'g', 'r'].forEach(x => {
      const c = color & mask;
      color >>= bits;
      result[x] = bits === 4 ? 17 * c : c;
    });
    return result;
  },
  fromRgb( /* String */color) {
    const matches = lc(color).match(/^rgba?\(([\s.,0-9]+)\)/);
    return matches && Color.fromArray(matches[1].split(/\s*,\s*/));
  },
  fromHsl( /* String */color) {
    const matches = lc(color).match(/^hsla?\(([\s.,0-9]+)\)/);
    if (matches) {
      const c = matches[2].split(/\s*,\s*/);
      const l = c.length;
      const H = (parseFloat(c[0]) % 360 + 360) % 360 / 360;
      const S = parseFloat(c[1]) / 100;
      const L = parseFloat(c[2]) / 100;
      const m2 = L <= 0.5 ? L * (S + 1) : L + S - L * S;
      const m1 = 2 * L - m2;
      const a = [hue2rgb(m1, m2, H + 1 / 3) * 256, hue2rgb(m1, m2, H) * 256, hue2rgb(m1, m2, H - 1 / 3) * 256, 1];
      if (l === 4) {
        a[3] = c[3];
      }
      return Color.fromArray(a);
    }
    return null;
  },
  fromArray( /* Array */arr) {
    const result = new Color();
    result.set(Number(arr[0]), Number(arr[1]), Number(arr[2]), Number(arr[3]));
    if (isNaN(result.a)) {
      result.a = 1;
    }
    return result.sanitize();
  },
  fromString( /* String */str) {
    const s = Color.hexByName[str];
    return s && Color.fromHex(s) || Color.fromRgb(str) || Color.fromHex(str) || Color.fromHsl(str);
  }
});

Color.named = Color.namedColor = namedColor;

module.exports = Color;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  burntsienna: '#ea7e5d',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_random_tree__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_draw_line__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_draw_node__ = __webpack_require__(13);




const formNode = document.getElementById('layout-props');
const layoutTimeNode = document.getElementById('layout-time');
const renderTimeNode = document.getElementById('render-time');

formNode.addEventListener('change', render);

const HORIZONTAL_LAYOUTS = ['LeftLogical', 'RightLogical'];
function isHorizontal(type) {
  return HORIZONTAL_LAYOUTS.indexOf(type) > -1;
}

function render() {
  const count = formNode.dataSize.value;
  const layoutType = formNode.layoutType.value;
  const root = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_random_tree__["a" /* default */])(count);
  Object.assign(root, {
    'height': 80,
    'width': 300,
    'hgap': 100
  });

  const MindmapLayout = MindmapLayouts[layoutType];
  const layout = new MindmapLayout(root);

  const t0 = window.performance.now();

  const rootNode = layout.doLayout();

  const t1 = window.performance.now();

  const bb = rootNode.getBoundingBox();
  const canvas = document.getElementById('canvas');
  canvas.width = bb.width > 30000 ? 30000 : bb.width;
  canvas.height = bb.height > 30000 ? 30000 : bb.height;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    rootNode.eachNode(node => {
      node.children.forEach(child => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_draw_line__["a" /* default */])(node, child, ctx, isHorizontal(layoutType));
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_draw_node__["a" /* default */])(node, ctx);
    });
  }

  const t2 = window.performance.now();

  layoutTimeNode.innerHTML = Math.round(t1 - t0);
  renderTimeNode.innerHTML = Math.round(t2 - t1);
}

render();

/***/ })
/******/ ]);
});