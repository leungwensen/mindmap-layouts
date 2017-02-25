/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__named__ = __webpack_require__(2);


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
  hexByName: __WEBPACK_IMPORTED_MODULE_0__named__["a" /* default */],

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

Color.named = Color.namedColor = __WEBPACK_IMPORTED_MODULE_0__named__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = Color;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const lettersLen = letters.length;

function roundRandomInt(n) {
  return Math.round(Math.random() * n);
}
function randomString(n) {
  let res = '';
  for (let i = 0; i < n; i++) {
    res += letters[roundRandomInt(lettersLen)];
  }
  return res;
}

function generateRoot() {
  return {
    name: randomString(roundRandomInt(10)),
    children: []
  };
}

function generateNode(root, child) {
  const rand = roundRandomInt(root.children.length);
  if (rand === root.children.length) {
    root.children.push(child);
  } else {
    generateNode(root.children[rand], child);
  }
}

function randomNode(maxSize) {
  const root = generateRoot();
  for (let i = 0; i < maxSize; i++) {
    generateNode(root, generateRoot());
  }
  return root;
}

/* harmony default export */ __webpack_exports__["a"] = randomNode;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const colors = {
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

/* harmony default export */ __webpack_exports__["a"] = colors;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getNodeBoundingBox(n, bb) {
  bb.width = Math.max(bb.width, n.x + n.width);
  bb.height = Math.max(bb.height, n.y + n.height);
  n.children.forEach(child => {
    getNodeBoundingBox(child, bb);
  });
  return bb;
}

const PEM = 18;
const DEFAULT_HEIGHT = PEM * 2;
const DEFAULT_GAP = PEM;

const DEFAULT_OPTIONS = {
  getHGap(d) {
    return d.hgap || DEFAULT_GAP;
  },
  getVGap(d) {
    return d.vgap || DEFAULT_GAP;
  },
  getChildren(d) {
    return d.children;
  },
  getHeight(d) {
    return d.height || DEFAULT_HEIGHT;
  },
  getWidth(d) {
    const name = d.name || ' ';
    return d.width || name.split('').length * PEM;
  }
};

function fallbackExecuteOnData(func1, func2, data) {
  if (func1) return func1(data);
  return func2(data);
}

class Node {
  constructor(data, options = {}) {
    const me = this;
    me.vgap = me.hgap = 0;
    if (data instanceof Node) return data;
    const hgap = fallbackExecuteOnData(options.getHGap, DEFAULT_OPTIONS.getHGap, data);
    const vgap = fallbackExecuteOnData(options.getVGap, DEFAULT_OPTIONS.getVGap, data);
    me.data = data;
    me.width = fallbackExecuteOnData(options.getWidth, DEFAULT_OPTIONS.getWidth, data);
    me.height = fallbackExecuteOnData(options.getHeight, DEFAULT_OPTIONS.getHeight, data);
    me.x = me.y = 0;
    me.depth = 0;
    const nodes = [me];
    let node;
    while (node = nodes.pop()) {
      const children = fallbackExecuteOnData(options.getChildren, DEFAULT_OPTIONS.getChildren, node.data);
      const length = children ? children.length : 0;
      node.children = [];
      if (children && length) {
        for (let i = length - 1; i >= 0; --i) {
          const child = new Node(children[i], options);
          node.children.push(child);
          nodes.push(child);
          child.parent = node;
          child.depth = node.depth + 1;
        }
      }
    }
    me.addGap(hgap, vgap);
  }

  getBoundingBox() {
    const bb = {
      width: 0,
      height: 0
    };
    return getNodeBoundingBox(this, bb);
  }

  addGap(hgap, vgap) {
    const me = this;
    me.hgap += hgap;
    me.vgap += vgap;
    me.width += 2 * hgap;
    me.height += 2 * vgap;
  }
}

/* harmony default export */ __webpack_exports__["a"] = Node;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WrappedTree {

  // Array of children and number of children.


  // Sum of modifiers at the extreme nodes.


  // Extreme left and right nodes.


  // Left and right thread.

  // Width and height.
  constructor(w, h, y, c = []) {
    this.w = 0;
    this.h = 0;
    this.x = 0;
    this.y = 0;
    this.prelim = 0;
    this.mod = 0;
    this.shift = 0;
    this.change = 0;
    this.tl = null;
    this.tr = null;
    this.el = null;
    this.er = null;
    this.msel = 0;
    this.mser = 0;
    this.c = [];
    this.cs = 0;

    this.w = w;
    this.h = h;
    this.y = y;
    this.c = c;
    this.cs = c.length;
  }
}

WrappedTree.fromNode = (root, isHorizontal) => {
  if (!root) return null;
  const children = [];
  root.children.forEach(child => {
    children.push(WrappedTree.fromNode(child, isHorizontal));
  });
  if (isHorizontal) return new WrappedTree(root.height, root.width, root.x, children);
  return new WrappedTree(root.width, root.height, root.y, children);
};

/* harmony default export */ __webpack_exports__["a"] = WrappedTree;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hierarchy_node__ = __webpack_require__(3);


class Layout {
  constructor(root, options = {}, extraEdges = []) {
    const me = this;
    me.root = new __WEBPACK_IMPORTED_MODULE_0__hierarchy_node__["a" /* default */](root, options);
    me.extraEdges = extraEdges;
  }

  doLayout() {
    throw new Error('please override this method');
  }

  getNodes() {}

  getEdges() {}
}

/* harmony default export */ __webpack_exports__["a"] = Layout;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hierarchy_wrapped_tree__ = __webpack_require__(4);


// node utils
function moveRight(node, move, isHorizontal) {
  if (isHorizontal) {
    node.y += move;
  } else {
    node.x += move;
  }
  node.children.forEach(child => {
    moveRight(child, move, isHorizontal);
  });
}

function getMin(node, isHorizontal) {
  let res = isHorizontal ? node.y : node.x;
  node.children.forEach(child => {
    res = Math.min(getMin(child, isHorizontal), res);
  });
  return res;
}

function normalize(node, isHorizontal) {
  const min = getMin(node, isHorizontal);
  moveRight(node, -min, isHorizontal);
}

function convertBack(converted /* Tree */, root /* TreeNode */, isHorizontal) {
  if (isHorizontal) {
    root.y = converted.x;
  } else {
    root.x = converted.x;
  }
  converted.c.forEach((child, i) => {
    convertBack(child, root.children[i], isHorizontal);
  });
}

function layer(node, isHorizontal, d = 0) {
  if (isHorizontal) {
    node.x = d;
    d += node.width;
  } else {
    node.y = d;
    d += node.height;
  }
  node.children.forEach(child => {
    layer(child, isHorizontal, d);
  });
}

/* harmony default export */ __webpack_exports__["a"] = (root, isHorizontal) => {
  function firstWalk(t) {
    if (t.cs === 0) {
      setExtremes(t);
      return;
    }
    firstWalk(t.c[0]);
    let ih = updateIYL(bottom(t.c[0].el), 0, null);
    for (let i = 1; i < t.cs; ++i) {
      firstWalk(t.c[i]);
      const min = bottom(t.c[i].er);
      separate(t, i, ih);
      ih = updateIYL(min, i, ih);
    }
    positionRoot(t);
    setExtremes(t);
  }

  function setExtremes(t) {
    if (t.cs === 0) {
      t.el = t;
      t.er = t;
      t.msel = t.mser = 0;
    } else {
      t.el = t.c[0].el;
      t.msel = t.c[0].msel;
      t.er = t.c[t.cs - 1].er;
      t.mser = t.c[t.cs - 1].mser;
    }
  }

  function separate(t, i, ih) {
    let sr = t.c[i - 1];
    let mssr = sr.mod;
    let cl = t.c[i];
    let mscl = cl.mod;
    while (sr != null && cl != null) {
      if (bottom(sr) > ih.low) ih = ih.nxt;
      const dist = mssr + sr.prelim + sr.w - (mscl + cl.prelim);
      if (dist > 0) {
        mscl += dist;
        moveSubtree(t, i, ih.index, dist);
      }
      const sy = bottom(sr);
      const cy = bottom(cl);
      if (sy <= cy) {
        sr = nextRightContour(sr);
        if (sr != null) mssr += sr.mod;
      }
      if (sy >= cy) {
        cl = nextLeftContour(cl);
        if (cl != null) mscl += cl.mod;
      }
    }
    if (!sr && !!cl) {
      setLeftThread(t, i, cl, mscl);
    } else if (!!sr && !cl) {
      setRightThread(t, i, sr, mssr);
    }
  }

  function moveSubtree(t, i, si, dist) {
    t.c[i].mod += dist;
    t.c[i].msel += dist;
    t.c[i].mser += dist;
    distributeExtra(t, i, si, dist);
  }

  function nextLeftContour(t) {
    return t.cs === 0 ? t.tl : t.c[0];
  }

  function nextRightContour(t) {
    return t.cs === 0 ? t.tr : t.c[t.cs - 1];
  }

  function bottom(t) {
    return t.y + t.h;
  }

  function setLeftThread(t, i, cl, modsumcl) {
    const li = t.c[0].el;
    li.tl = cl;
    const diff = modsumcl - cl.mod - t.c[0].msel;
    li.mod += diff;
    li.prelim -= diff;
    t.c[0].el = t.c[i].el;
    t.c[0].msel = t.c[i].msel;
  }

  function setRightThread(t, i, sr, modsumsr) {
    const ri = t.c[i].er;
    ri.tr = sr;
    const diff = modsumsr - sr.mod - t.c[i].mser;
    ri.mod += diff;
    ri.prelim -= diff;
    t.c[i].er = t.c[i - 1].er;
    t.c[i].mser = t.c[i - 1].mser;
  }

  function positionRoot(t) {
    t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod + t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2;
  }

  function secondWalk(t, modsum) {
    modsum += t.mod;
    t.x = t.prelim + modsum;
    addChildSpacing(t);
    for (let i = 0; i < t.cs; i++) {
      secondWalk(t.c[i], modsum);
    }
  }

  function distributeExtra(t, i, si, dist) {
    if (si !== i - 1) {
      const nr = i - si;
      t.c[si + 1].shift += dist / nr;
      t.c[i].shift -= dist / nr;
      t.c[i].change -= dist - dist / nr;
    }
  }

  function addChildSpacing(t) {
    let d = 0;
    let modsumdelta = 0;
    for (let i = 0; i < t.cs; i++) {
      d += t.c[i].shift;
      modsumdelta += d + t.c[i].change;
      t.c[i].mod += modsumdelta;
    }
  }

  function updateIYL(low, index, ih) {
    while (ih !== null && low >= ih.low) {
      ih = ih.nxt;
    }
    return {
      low,
      index,
      nxt: ih
    };
  }

  // do layout
  layer(root, isHorizontal);
  const wt = __WEBPACK_IMPORTED_MODULE_0__hierarchy_wrapped_tree__["a" /* default */].fromNode(root, isHorizontal);
  console.log(wt);
  firstWalk(wt);
  secondWalk(wt, 0);
  convertBack(wt, root, isHorizontal);
  normalize(root, isHorizontal);

  return root;
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__non_layered_tidy_tree__ = __webpack_require__(6);



class DownloadOrganizational extends __WEBPACK_IMPORTED_MODULE_0__layout__["a" /* default */] {
  doLayout() {
    const root = this.root;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__non_layered_tidy_tree__["a" /* default */])(root, false);
  }
}

/* harmony default export */ __webpack_exports__["a"] = DownloadOrganizational;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_layouts_downward_organizational__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_generate_tree__ = __webpack_require__(1);




const count = 20;
const root = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__data_generate_tree__["a" /* default */])(count);
Object.assign(root, {
  'height': 80,
  'width': 300,
  'vgap': 100
});

const layout = new __WEBPACK_IMPORTED_MODULE_0__lib_layouts_downward_organizational__["a" /* default */](root);

const t0 = window.performance.now();

const rootNode = layout.doLayout();

const t1 = window.performance.now();

const bb = rootNode.getBoundingBox();
// console.log(rootNode, bb)
const canvas = document.getElementById('canvas');
canvas.width = bb.width > 30000 ? 30000 : bb.width;
canvas.height = bb.height > 30000 ? 30000 : bb.height;

function randomNumber() {
  return Math.random();
}
function randomInt(n) {
  return Math.floor(randomNumber() * n);
}
function randomColor() {
  return `rgba(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)}, 0.6)`;
}
function rgba2str(rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}
function roundInt(num) {
  return Math.round(num);
}

const lineColor = rgba2str(new __WEBPACK_IMPORTED_MODULE_1__color_index__["a" /* default */](randomColor()).toGrey().toRgba());
function drawBezierCurveToChild(n, c, ctx) {
  const beginX = roundInt(n.x + n.width / 2);
  const beginY = roundInt(n.y + n.height - n.vgap);
  const endX = roundInt(c.x + c.width / 2);
  const endY = roundInt(c.y + c.vgap);
  // console.log(`(${beginX}, ${beginY}), (${endX}, ${endY})`)
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.bezierCurveTo(beginX, roundInt(beginY + (n.vgap + c.vgap) / 2), endX, roundInt(endY - (n.vgap + c.vgap) / 2), endX, endY);
  ctx.stroke();
}
function drawNode(node, ctx) {
  const color = new __WEBPACK_IMPORTED_MODULE_1__color_index__["a" /* default */](randomColor());
  // console.log(color.toRgba());
  const x = roundInt(node.x + node.hgap);
  const y = roundInt(node.y + node.vgap);
  const width = roundInt(node.width - node.hgap * 2);
  const height = roundInt(node.height - node.vgap * 2);
  ctx.fillStyle = rgba2str(color.toRgba());
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = rgba2str(color.toGrey().toRgba());
  ctx.strokeRect(x, y, width, height);
  node.children.forEach(child => {
    drawNode(child, ctx);
  });
}
function drawLink(node, ctx) {
  node.children.forEach(child => {
    drawBezierCurveToChild(node, child, ctx);
    drawLink(child, ctx);
  });
}

const t2 = window.performance.now();

console.log(`there are ${count} tree nodes`);
console.log(`layout algorithm took ${t1 - t0}ms, and drawing took ${t2 - t1}ms.`);

if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  drawLink(rootNode, ctx);
  drawNode(rootNode, ctx);
}

/***/ })
/******/ ]);