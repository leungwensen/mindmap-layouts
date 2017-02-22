const BoundingBox = require('./bounding-box');

function getTreeBoundingBox(tree, bb) {
  bb.width = Math.max(bb.width, tree.x + tree.width);
  bb.height = Math.max(bb.height, tree.y + tree.height);
  tree.children.forEach(child => {
    getTreeBoundingBox(child, bb);
  });
}

const tolerance = 0.0;
function overlap(xStart, xEnd, xStart2, xEnd2) {
  return (
      xStart2 + tolerance < xEnd - tolerance &&
      xEnd2 - tolerance > xStart + tolerance
    ) || (
      xStart + tolerance < xEnd2 - tolerance &&
      xEnd - tolerance > xStart2 + tolerance
    );
}

function random(n) {
  return Math.floor(Math.random() * n);
}

exports = class TreeNode {
  // input
  width = 0;
  height = 0;
  children = [];
  hgap = 0;
  vgap = 0;
  x = 0;
  y = 0;

  constructor(width, height, children) {
    const me = this;
    me.width = width;
    me.height = height;
    me.children = children;
  }

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
    return (
      overlap(me.x, me.x + me.width, other.x, other.x + other.width) &&
      overlap(me.y, me.y + me.height, other.y, other.y + other.height)
    );
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
    })
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

