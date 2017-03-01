window["MindmapLayouts"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const WrappedTree = __webpack_require__(6);

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

module.exports = (root, isHorizontal) => {
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
  const wt = WrappedTree.fromNode(root, isHorizontal);
  // console.log(wt)
  firstWalk(wt);
  secondWalk(wt, 0);
  convertBack(wt, root, isHorizontal);
  normalize(root, isHorizontal);

  return root;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(4);

class Layout {
  constructor(root, options = {}, extraEdges = []) {
    const me = this;
    me.root = new Node(root, options);
    me.options = options;
    me.extraEdges = extraEdges;
  }

  doLayout() {
    throw new Error('please override this method');
  }

  getNodes() {
    const root = this.root;
    const nodes = [];
    let countByDepth = {};
    root.eachNode(node => {
      countByDepth[node.depth] = countByDepth[node.depth] || 0;
      countByDepth[node.depth]++;
      nodes.push({
        // origin data
        data: node.data,
        id: node.id,
        // position
        x: node.x,
        y: node.y,
        centX: node.x + node.width / 2,
        centY: node.y + node.height / 2,
        // size
        hgap: node.hgap,
        vgap: node.vgap,
        height: node.height,
        width: node.width,
        actualHeight: node.height - node.vgap * 2,
        actualWidth: node.width - node.hgap * 2,
        // depth
        depth: node.depth
      });
    });
    return nodes;
  }

  getEdges() {
    const me = this;
    const extraEdges = me.extraEdges;
    const root = this.root;
    const edges = [];
    root.eachNode(node => {
      node.children.forEach(child => {
        edges.push({
          source: node.id,
          target: child.id
        });
      });
    });
    edges.concat(extraEdges);
    return edges;
  }
}

module.exports = Layout;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

const PEM = 18;
const DEFAULT_HEIGHT = PEM * 2;
const DEFAULT_GAP = PEM;

const DEFAULT_OPTIONS = {
  getId(d) {
    return d.id || d.name;
  },
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
  constructor(data, options = {}, isolated) {
    const me = this;
    me.vgap = me.hgap = 0;
    if (data instanceof Node) return data;
    const hgap = fallbackExecuteOnData(options.getHGap, DEFAULT_OPTIONS.getHGap, data);
    const vgap = fallbackExecuteOnData(options.getVGap, DEFAULT_OPTIONS.getVGap, data);
    me.data = data;
    me.width = fallbackExecuteOnData(options.getWidth, DEFAULT_OPTIONS.getWidth, data);
    me.height = fallbackExecuteOnData(options.getHeight, DEFAULT_OPTIONS.getHeight, data);
    me.id = fallbackExecuteOnData(options.getId, DEFAULT_OPTIONS.getId, data);
    me.x = me.y = 0;
    me.depth = 0;
    if (!isolated && !data.isCollapsed) {
      const nodes = [me];
      let node;
      while (node = nodes.pop()) {
        const children = fallbackExecuteOnData(options.getChildren, DEFAULT_OPTIONS.getChildren, node.data);
        const length = children ? children.length : 0;
        node.children = [];
        if (children && length) {
          for (let i = 0; i < length; i++) {
            const child = new Node(children[i], options);
            node.children.push(child);
            nodes.push(child);
            child.parent = node;
            child.depth = node.depth + 1;
          }
        }
      }
    }
    if (!me.children) {
      me.children = [];
    }
    me.addGap(hgap, vgap);
  }

  isRoot() {
    return this.depth === 0;
  }

  addGap(hgap, vgap) {
    const me = this;
    me.hgap += hgap;
    me.vgap += vgap;
    me.width += 2 * hgap;
    me.height += 2 * vgap;
  }

  eachNode(callback) {
    const me = this;
    let nodes = [me];
    let current = null;
    while (current = nodes.pop()) {
      callback(current);
      nodes = nodes.concat(current.children);
    }
  }

  getBoundingBox() {
    const bb = {
      left: Number.MAX_VALUE,
      top: Number.MAX_VALUE,
      width: 0,
      height: 0
    };
    this.eachNode(node => {
      bb.left = Math.min(bb.left, node.x);
      bb.top = Math.min(bb.top, node.y);
      bb.width = Math.max(bb.width, node.x + node.width);
      bb.height = Math.max(bb.height, node.y + node.height);
    });
    return bb;
  }

  translate(tx = 0, ty = 0) {
    this.eachNode(node => {
      node.x += tx;
      node.y += ty;
    });
  }

  right2left() {
    const me = this;
    const bb = me.getBoundingBox();
    me.eachNode(node => {
      node.x = node.x - (node.x - bb.left) * 2 - node.width;
    });
    me.translate(bb.width, 0);
  }

  down2up() {
    const me = this;
    const bb = me.getBoundingBox();
    me.eachNode(node => {
      node.y = node.y - (node.y - bb.top) * 2 - node.height;
    });
    me.translate(0, bb.height);
  }
}

module.exports = Node;

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

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

module.exports = WrappedTree;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Node: __webpack_require__(4),
  WrappedTree: __webpack_require__(6)
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const Layout = __webpack_require__(2);
const nonLayeredTidyTree = __webpack_require__(1);

class DownwardOrganizational extends Layout {
  doLayout() {
    const root = this.root;
    return nonLayeredTidyTree(root, false);
  }
}

module.exports = DownwardOrganizational;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const Layout = __webpack_require__(2);
const nonLayeredTidyTree = __webpack_require__(1);

class LeftLogical extends Layout {
  doLayout() {
    const root = this.root;
    nonLayeredTidyTree(root, true);
    root.right2left();
    return root;
  }
}

module.exports = LeftLogical;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const Layout = __webpack_require__(2);
const nonLayeredTidyTree = __webpack_require__(1);

class RightLogical extends Layout {
  doLayout() {
    const root = this.root;
    return nonLayeredTidyTree(root, true);
  }
}

module.exports = RightLogical;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const Layout = __webpack_require__(2);
const Node = __webpack_require__(4);
const nonLayeredTidyTree = __webpack_require__(1);

class RightLogical extends Layout {
  doLayout() {
    const me = this;
    const root = me.root;
    const options = me.options;
    // separate into left and right trees
    const leftTree = new Node(root.data, options, true);
    const rightTree = new Node(root.data, options, true);
    const treeSize = root.children.length;
    const rightTreeSize = Math.round(treeSize / 2);
    for (let i = 0; i < treeSize; i++) {
      const child = root.children[i];
      if (i < rightTreeSize) {
        rightTree.children.push(child);
      } else {
        leftTree.children.push(child);
      }
    }
    // do layout for left and right trees
    nonLayeredTidyTree(rightTree, true);
    nonLayeredTidyTree(leftTree, true);
    leftTree.right2left();
    // combine left and right trees
    rightTree.translate(leftTree.x - rightTree.x, leftTree.y - rightTree.y);
    // translate root
    root.x = leftTree.x;
    root.y = rightTree.y;
    const bb = root.getBoundingBox();
    if (bb.top < 0) {
      root.translate(0, -bb.top);
    }
    return root;
  }
}

module.exports = RightLogical;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const Layout = __webpack_require__(2);
const nonLayeredTidyTree = __webpack_require__(1);

class UpwardOrganizational extends Layout {
  doLayout() {
    const root = this.root;
    nonLayeredTidyTree(root, false);
    root.down2up();
    return root;
  }
}

module.exports = UpwardOrganizational;

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const RightLogical = __webpack_require__(21);
const DownwardOrganizational = __webpack_require__(19);
const UpwardOrganizational = __webpack_require__(23);
const LeftLogical = __webpack_require__(20);
const Standard = __webpack_require__(22);
const {
  Node,
  WrappedTree
} = __webpack_require__(18);

module.exports = {
  RightLogical,
  DownwardOrganizational,
  UpwardOrganizational,
  LeftLogical,
  Standard,
  Node,
  WrappedTree
};

/***/ })
/******/ ]);