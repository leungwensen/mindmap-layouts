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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return layout; });
/*
 * @TODO: layout vertically
 * @reference: https://github.com/cwi-swat/non-layered-tidy-trees
 */

class Tree {

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

function layout(t) {
  firstWalk(t);
  secondWalk(t, 0);
}

function firstWalk(t) {
  if (t.cs === 0) {
    setExtremes(t);
    return;
  }
  firstWalk(t.c[0]);
  // Create siblings in contour minimal vertical coordinate and index list.
  let ih = updateIYL(bottom(t.c[0].el), 0, null);
  for (let i = 1; i < t.cs; i++) {
    firstWalk(t.c[i]);
    // Store lowest vertical coordinate while extreme nodes still point in current subtree.
    const minY = bottom(t.c[i].er);
    separate(t, i, ih);
    ih = updateIYL(minY, i, ih);
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
  // Right contour node of left siblings and its sum of modfiers.
  let sr = t.c[i - 1];
  let mssr = sr.mod;
  // Left contour node of current subtree and its sum of modfiers.
  let cl = t.c[i];
  let mscl = cl.mod;
  while (sr != null && cl != null) {
    if (bottom(sr) > ih.lowY) ih = ih.nxt;
    // How far to the left of the right side of sr is the left side of cl?
    const dist = mssr + sr.prelim + sr.w - (mscl + cl.prelim);
    if (dist > 0) {
      mscl += dist;
      moveSubtree(t, i, ih.index, dist);
    }
    const sy = bottom(sr);
    const cy = bottom(cl);
    // Advance highest node(s) and sum(s) of modifiers (Coordinate system increases downwards)
    if (sy <= cy) {
      sr = nextRightContour(sr);
      if (sr != null) mssr += sr.mod;
    }
    if (sy >= cy) {
      cl = nextLeftContour(cl);
      if (cl != null) mscl += cl.mod;
    }
  }
  // Set threads and update extreme nodes.
  if (sr === null && cl != null) {
    // In the first case, the current subtree must be taller than the left siblings.
    setLeftThread(t, i, cl, mscl);
  } else if (sr != null && cl === null) {
    // In this case, the left siblings must be taller than the current subtree.
    setRightThread(t, i, sr, mssr);
  }
}

function moveSubtree(t, i, si, dist) {
  // Move subtree by changing mod.
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
  // Change mod so that the sum of modifier after following thread is correct.
  const diff = modsumcl - cl.mod - t.c[0].msel;
  li.mod += diff;
  // Change preliminary x coordinate so that the node does not move.
  li.prelim -= diff;
  // Update extreme node and its sum of modifiers.
  t.c[0].el = t.c[i].el;
  t.c[0].msel = t.c[i].msel;
}

// Symmetrical to setLeftThread.
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
  // Position root between children, taking into account their mod.
  t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod + t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2;
}

function secondWalk(t, modsum) {
  modsum += t.mod;
  // Set absolute (non-relative) horizontal coordinate.
  t.x = t.prelim + modsum;
  addChildSpacing(t);
  for (let i = 0; i < t.cs; i++) {
    secondWalk(t.c[i], modsum);
  }
}

function distributeExtra(t, i, si, dist) {
  // Are there intermediate children?
  if (si !== i - 1) {
    const nr = i - si;
    t.c[si + 1].shift += dist / nr;
    t.c[i].shift -= dist / nr;
    t.c[i].change -= dist - dist / nr;
  }
}

// Process change and shift to add intermediate spacing to mod.
function addChildSpacing(t) {
  let d = 0;
  let modsumdelta = 0;
  for (let i = 0; i < t.cs; i++) {
    d += t.c[i].shift;
    modsumdelta += d + t.c[i].change;
    t.c[i].mod += modsumdelta;
  }
}

// A linked list of the indexes of left siblings and their lowest vertical coordinate.
// class IYL {
//     lowY = 0;
//     index = 0;
//     nxt = null;
//
//     constructor(lowY, index, nxt) {
//         this.lowY = lowY;
//         this.index = index;
//         this.nxt = nxt;
//     }
// }
function updateIYL(minY, index, ih) {
  // Remove siblings that are hidden by the new subtree.
  while (ih != null && minY >= ih.lowY) {
    ih = ih.nxt;
  }
  // Prepend the new subtree.
  return {
    minY,
    index,
    nxt: ih
  };
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bounding_box__ = __webpack_require__(6);


function getTreeBoundingBox(tree, bb) {
  bb.width = Math.max(bb.width, tree.x + tree.width);
  bb.height = Math.max(bb.height, tree.y + tree.height);
  tree.children.forEach(child => {
    getTreeBoundingBox(child, bb);
  });
  return bb;
}

const tolerance = 0.0;
function overlap(xStart, xEnd, xStart2, xEnd2) {
  return xStart2 + tolerance < xEnd - tolerance && xEnd2 - tolerance > xStart + tolerance || xStart + tolerance < xEnd2 - tolerance && xEnd - tolerance > xStart2 + tolerance;
}

function random(n) {
  return Math.floor(Math.random() * n);
}

class TreeNode {

  constructor(width, height, children = []) {
    this.width = 0;
    this.height = 0;
    this.children = [];
    this.hgap = 0;
    this.vgap = 0;
    this.x = 0;
    this.y = 0;

    const me = this;
    me.width = width;
    me.height = height;
    me.children = children;
  }
  // input


  getBoundingBox() {
    const bb = new __WEBPACK_IMPORTED_MODULE_0__bounding_box__["a" /* default */](0, 0);
    return getTreeBoundingBox(this, bb);
  }

  moveRight(move) {
    const me = this;
    me.x += move;
    me.children.forEach(child => {
      child.moveRight(move);
    });
  }

  normalizeX() {
    const me = this;
    const minX = me.getMinX();
    me.moveRight(-minX);
  }

  getMinX() {
    const me = this;
    let res = me.x;
    me.children.forEach(child => {
      res = Math.min(child.getMinX(), res);
    });
    return res;
  }

  size() {
    const me = this;
    let res = 1;
    me.children.forEach(child => {
      res += child.size();
    });
    return res;
  }

  hasChildren() {
    return this.size() > 0;
  }

  overlapsWith(other) {
    const me = this;
    return overlap(me.x, me.x + me.width, other.x, other.x + other.width) && overlap(me.y, me.y + me.height, other.y, other.y + other.height);
  }

  allNodes(nodes) {
    const me = this;
    nodes.push(me);
    me.children.forEach(child => {
      child.allNodes(nodes);
    });
  }

  getDepth() {
    const me = this;
    let res = 1;
    me.children.forEach(child => {
      res = Math.max(res, child.getDepth() + 1);
    });
    return res;
  }

  addGap(hgap, vgap) {
    const me = this;
    me.hgap += hgap;
    me.vgap += vgap;
    me.width += 2 * hgap;
    me.height += 2 * vgap;
    me.children.forEach(child => {
      child.addGap(hgap, vgap);
    });
  }

  addSize(hsize, vsize) {
    const me = this;
    me.width += hsize;
    me.height += vsize;
    me.forEach(child => {
      child.addSize(hsize, vsize);
    });
  }

  addGapPerDepth(gapPerDepth, depth, maxDepth) {
    const me = this;
    me.hgap += (maxDepth - depth) * gapPerDepth;
    me.width += 2 * (maxDepth - depth) * gapPerDepth;
    me.forEach(child => {
      child.addGapPerDepth(gapPerDepth, depth + 1, maxDepth);
    });
  }

  print() {
    const me = this;
    console.log(`new TreeNode(${me.x}, ${me.y}, ${me.width}, ${me.height}`);
    me.forEach(child => {
      console.log(', ');
      child.print();
    });
    console.log(')');
  }

  mul(w, h) {
    const me = this;
    me.width *= w;
    me.height *= h;
    me.children.forEach(child => {
      child.mul(w, h);
    });
  }

  layer(d = 0) {
    const me = this;
    me.y = d;
    d += me.height;
    me.children.forEach(child => {
      child.layer(d);
    });
  }

  randExpand(t) {
    const me = this;
    t.y += me.height;
    const size = me.children.length;
    let i = random(size + 1);
    if (i === size) {
      me.addKid(t);
    } else {
      me.children[i].randExpand(t);
    }
  }

  addKid(t) {
    this.children.push(t);
  }
}

/* harmony default export */ __webpack_exports__["a"] = TreeNode;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__named__ = __webpack_require__(5);


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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_tree_node__ = __webpack_require__(1);


function randomInRange(start, end) {
  return start + Math.floor(Math.random() * (end - start));
}

class GenerateTrees {

  constructor(nr, minWidth, maxWidth, minHeight, maxHeight) {
    this.nr = 0;
    this.minWidth = 0;
    this.maxWidth = 0;
    this.minHeight = 0;
    this.maxHeight = 0;

    this.nr = nr;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
  }

  randRoot() {
    const me = this;
    return new __WEBPACK_IMPORTED_MODULE_0__lib_tree_node__["a" /* default */](randomInRange(me.minWidth, me.maxWidth), randomInRange(me.minHeight, me.maxHeight));
  }

  rand() {
    const me = this;
    return me.randomTree(me.nr);
  }

  randomTree(nr) {
    const me = this;
    const root = me.randRoot();
    for (let i = 0; i < nr - 1; i++) {
      root.randExpand(me.randRoot());
    }
    return root;
  }
}

/* harmony default export */ __webpack_exports__["a"] = GenerateTrees;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__non_layered_tidy_trees__ = __webpack_require__(0);
// import TreeNode from '../tree-node'


const convert = (root /* TreeNode */) => {
  if (!root) return null;
  const children = [];
  root.children.forEach(child => {
    children.push(convert(child));
  });
  return new __WEBPACK_IMPORTED_MODULE_0__non_layered_tidy_trees__["a" /* Tree */](root.width, root.height, root.y, children);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = convert;


const convertBack = (converted /* Tree */, root /* TreeNode */) => {
  root.x = converted.x;
  converted.c.forEach((child, i) => {
    convertBack(child, root.children[i]);
  });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = convertBack;


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BoundingBox {

  constructor(w, h) {
    this.width = 0;
    this.height = 0;

    const me = this;
    me.width = w;
    me.height = h;
  }

  merge(boundingBox) {
    const me = this;
    return new BoundingBox(Math.max(me.width, boundingBox.width), Math.max(me.height, boundingBox.height));
  }
}

/* harmony default export */ __webpack_exports__["a"] = BoundingBox;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_tree_node__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_layouts_non_layered_tidy_trees__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_layouts_marshall__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__generate_trees__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__color_index__ = __webpack_require__(2);






console.log(__WEBPACK_IMPORTED_MODULE_0__lib_tree_node__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__lib_layouts_non_layered_tidy_trees__["a" /* Tree */], __WEBPACK_IMPORTED_MODULE_1__lib_layouts_non_layered_tidy_trees__["b" /* layout */], __WEBPACK_IMPORTED_MODULE_3__generate_trees__["a" /* default */]);

const count = 20;
const gen = new __WEBPACK_IMPORTED_MODULE_3__generate_trees__["a" /* default */](count, 10, 100, 10, 100);

const rootNode = gen.rand();
rootNode.addGap(20, 50);

const t0 = window.performance.now();

// layout
rootNode.layer();
const converted = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_layouts_marshall__["a" /* convert */])(rootNode);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_layouts_non_layered_tidy_trees__["b" /* layout */])(converted);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_layouts_marshall__["b" /* convertBack */])(converted, rootNode);
rootNode.normalizeX();
const bb = rootNode.getBoundingBox();
console.log(rootNode, bb);

const t1 = window.performance.now();

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

const lineColor = rgba2str(new __WEBPACK_IMPORTED_MODULE_4__color_index__["a" /* default */](randomColor()).toGrey().toRgba());
function drawBezierCurveToChild(n, c, ctx) {
  const beginX = roundInt(n.x + n.width / 2);
  const beginY = roundInt(n.y + n.height - n.vgap / 2);
  const endX = roundInt(c.x + c.width / 2);
  const endY = roundInt(c.y + n.vgap / 2);
  console.log(`(${beginX}, ${beginY}), (${endX}, ${endY})`);
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.bezierCurveTo(beginX, roundInt(beginY + n.vgap / 2), endX, roundInt(endY - c.vgap / 2), endX, endY);
  ctx.stroke();
}
function drawNode(node, ctx) {
  const color = new __WEBPACK_IMPORTED_MODULE_4__color_index__["a" /* default */](randomColor());
  // console.log(color.toRgba());
  const x = roundInt(node.x + node.hgap / 2);
  const y = roundInt(node.y + node.vgap / 2);
  const width = roundInt(node.width - node.hgap);
  const height = roundInt(node.height - node.vgap);
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