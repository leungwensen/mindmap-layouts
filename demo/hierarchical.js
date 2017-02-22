/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
 * @reference: https://github.com/cwi-swat/non-layered-tidy-trees
 */

class Tree {

    // Array of children and number of children.


    // Sum of modifiers at the extreme nodes.


    // Extreme left and right nodes.


    // Left and right thread.

    // Width and height.
    constructor(w, h, y, c) {
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
    if (t.cs == 0) {
        setExtremes(t);
        return;
    }
    firstWalk(t.c[0]);
    // Create siblings in contour minimal vertical coordinate and index list.
    let ih = updateIYL(bottom(t.c[0].el), 0, null);
    for (let i = 1; i < t.cs; i++) {

        firstWalk(t.c[i]);
        //Store lowest vertical coordinate while extreme nodes still point in current subtree.
        const minY = bottom(t.c[i].er);
        separate(t, i, ih);
        ih = updateIYL(minY, i, ih);
    }
    positionRoot(t);
    setExtremes(t);
}

function setExtremes(t) {
    if (t.cs == 0) {
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
        const sy = bottom(sr),
              cy = bottom(cl);
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
    if (sr == null && cl != null) {
        // In the first case, the current subtree must be taller than the left siblings.
        setLeftThread(t, i, cl, mscl);
    } else if (sr != null && cl == null) {
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
    return t.cs == 0 ? t.tl : t.c[0];
}

function nextRightContour(t) {
    return t.cs == 0 ? t.tr : t.c[t.cs - 1];
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
    if (si != i - 1) {
        const nr = i - si;
        t.c[si + 1].shift += dist / nr;
        t.c[i].shift -= dist / nr;
        t.c[i].change -= dist - dist / nr;
    }
}

// Process change and shift to add intermediate spacing to mod.
function addChildSpacing(t) {
    let d = 0,
        modsumdelta = 0;
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

exports.Tree = Tree;
exports.layout = layout;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const BoundingBox = __webpack_require__(2);

function getTreeBoundingBox(tree, bb) {
    bb.width = Math.max(bb.width, tree.x + tree.width);
    bb.height = Math.max(bb.height, tree.y + tree.height);
    tree.children.forEach(child => {
        getTreeBoundingBox(child, bb);
    });
}

const tolerance = 0.0;
function overlap(xStart, xEnd, xStart2, xEnd2) {
    return xStart2 + tolerance < xEnd - tolerance && xEnd2 - tolerance > xStart + tolerance || xStart + tolerance < xEnd2 - tolerance && xEnd - tolerance > xStart2 + tolerance;
}

function random(n) {
    return Math.floor(Math.random() * n);
}

exports = class TreeNode {

    constructor(width, height, children) {
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
        const bb = new BoundingBox(0, 0);
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

    layer(d) {
        const me = this;
        me.y = d;
        d += me.height;
        me.children.forEach(child => {
            child.layer(d);
        });
    }

    randExpand(t, r) {
        const me = this;
        t.y += me.height;
        const size = me.children.length;
        let i = random(size + 1);
        if (i === size) {
            me.addKid(t);
        } else {
            me.children[i].randExpand(t, r);
        }
    }

    addKid(t) {
        this.children.add(t);
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

exports = class BoundingBox {

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
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const TreeNode = __webpack_require__(1);
const nonLayeredTidyTrees = __webpack_require__(0);

console.log(TreeNode, nonLayeredTidyTrees);

/***/ })
/******/ ]);
//# sourceMappingURL=hierarchical.js.map