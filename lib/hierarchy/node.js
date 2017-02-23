function getNodeBoundingBox (n, bb) {
  bb.width = Math.max(bb.width, n.x + n.width)
  bb.height = Math.max(bb.height, n.y + n.height)
  n.children.forEach(child => {
    getNodeBoundingBox(child, bb)
  })
  return bb
}
const tolerance = 0.0
function overlap (xStart, xEnd, xStart2, xEnd2) {
  return (
      xStart2 + tolerance < xEnd - tolerance &&
      xEnd2 - tolerance > xStart + tolerance
    ) || (
      xStart + tolerance < xEnd2 - tolerance &&
      xEnd - tolerance > xStart2 + tolerance
    )
}
const PEM = 18
const DEFAULT_HEIGHT = PEM * 2
const DEFAULT_GAP = PEM

const DEFAULT_OPTIONS = {
  getHGap (d) {
    return d.hgap || DEFAULT_GAP
  },
  getVGap (d) {
    return d.vgap || DEFAULT_GAP
  },
  getChildren (d) {
    return d.children
  },
  getHeight (d) {
    return d.height || DEFAULT_HEIGHT
  },
  getWidth (d) {
    const name = d.name || ' '
    return d.width || (name.split('').length * PEM)
  }
}

function fallbackExecuteOnData (func1, func2, data) {
  if (func1) return func1(data)
  return func2(data)
}

class Node {
  constructor (data, options = {}) {
    const me = this
    me.vgap = me.hgap = 0
    if (data instanceof Node) return data
    const hgap = fallbackExecuteOnData(options.getHGap, DEFAULT_OPTIONS.getHGap, data)
    const vgap = fallbackExecuteOnData(options.getVGap, DEFAULT_OPTIONS.getVGap, data)
    me.data = data
    me.width = fallbackExecuteOnData(options.getWidth, DEFAULT_OPTIONS.getWidth, data)
    me.height = fallbackExecuteOnData(options.getHeight, DEFAULT_OPTIONS.getHeight, data)
    me.x = me.y = 0
    me.xSize = me.width
    me.ySize = me.height
    me.depth = 0
    const nodes = [me]
    let node
    while (node = nodes.pop()) {
      const children = fallbackExecuteOnData(options.getChildren, DEFAULT_OPTIONS.getChildren, node.data)
      const length = children ? children.length : 0
      node.children = []
      if (children && length) {
        for (let i = length - 1; i >= 0; --i) {
          const child = new Node(children[i], options)
          node.children.push(child)
          nodes.push(child)
          child.parent = node
          child.depth = node.depth + 1
        }
      }
    }
    me.addGap(hgap, vgap)
  }

  getBoundingBox () {
    const bb = {
      width: 0,
      height: 0
    }
    return getNodeBoundingBox(this, bb)
  }

  overlapsWith (other) {
    const me = this
    return (
      overlap(me.x, me.x + me.width, other.x, other.x + other.width) &&
      overlap(me.y, me.y + me.height, other.y, other.y + other.height)
    )
  }

  addGap (hgap, vgap) {
    const me = this
    me.hgap += hgap
    me.vgap += vgap
    me.width += 2 * hgap
    me.height += 2 * vgap
  }

  addSize (hsize, vsize) {
    const me = this
    me.width += hsize
    me.height += vsize
    me.forEach(child => {
      child.addSize(hsize, vsize)
    })
  }

  addGapPerDepth (gapPerDepth, depth, maxDepth) {
    const me = this
    me.hgap += (maxDepth - depth) * gapPerDepth
    me.width += 2 * (maxDepth - depth) * gapPerDepth
    me.forEach(child => {
      child.addGapPerDepth(gapPerDepth, depth + 1, maxDepth)
    })
  }

  mul (w, h) {
    const me = this
    me.width *= w
    me.height *= h
    me.children.forEach(child => {
      child.mul(w, h)
    })
  }
}

export default Node
