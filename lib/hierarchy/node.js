const PEM = 18
const DEFAULT_HEIGHT = PEM * 2
const DEFAULT_GAP = PEM

const DEFAULT_OPTIONS = {
  getId (d) {
    return d.id || d.name
  },
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
  constructor (data, options = {}, isolated) {
    const me = this
    me.vgap = me.hgap = 0
    if (data instanceof Node) return data
    const hgap = fallbackExecuteOnData(options.getHGap, DEFAULT_OPTIONS.getHGap, data)
    const vgap = fallbackExecuteOnData(options.getVGap, DEFAULT_OPTIONS.getVGap, data)
    me.data = data
    me.width = fallbackExecuteOnData(options.getWidth, DEFAULT_OPTIONS.getWidth, data)
    me.height = fallbackExecuteOnData(options.getHeight, DEFAULT_OPTIONS.getHeight, data)
    me.id = fallbackExecuteOnData(options.getId, DEFAULT_OPTIONS.getId, data)
    me.x = me.y = 0
    me.depth = 0
    if (!isolated && !data.isCollapsed) {
      const nodes = [me]
      let node
      while (node = nodes.pop()) {
        if (!node.data.isCollapsed) {
          const children = fallbackExecuteOnData(options.getChildren, DEFAULT_OPTIONS.getChildren, node.data)
          const length = children ? children.length : 0
          node.children = []
          if (children && length) {
            for (let i = 0; i < length; i++) {
              const child = new Node(children[i], options)
              node.children.push(child)
              nodes.push(child)
              child.parent = node
              child.depth = node.depth + 1
            }
          }
        }
      }
    }
    if (!me.children) {
      me.children = []
    }
    me.addGap(hgap, vgap)
  }

  isRoot () {
    return (this.depth === 0)
  }

  addGap (hgap, vgap) {
    const me = this
    me.hgap += hgap
    me.vgap += vgap
    me.width += 2 * hgap
    me.height += 2 * vgap
  }

  eachNode (callback) {
    const me = this
    let nodes = [me]
    let current = null
    while (current = nodes.pop()) {
      callback(current)
      nodes = nodes.concat(current.children)
    }
  }

  getBoundingBox () {
    const bb = {
      left: Number.MAX_VALUE,
      top: Number.MAX_VALUE,
      width: 0,
      height: 0
    }
    this.eachNode(node => {
      bb.left = Math.min(bb.left, node.x)
      bb.top = Math.min(bb.top, node.y)
      bb.width = Math.max(bb.width, node.x + node.width)
      bb.height = Math.max(bb.height, node.y + node.height)
    })
    return bb
  }

  translate (tx = 0, ty = 0) {
    this.eachNode(node => {
      node.x += tx
      node.y += ty
    })
  }

  right2left () {
    const me = this
    const bb = me.getBoundingBox()
    me.eachNode(node => {
      node.x = node.x - (node.x - bb.left) * 2 - node.width
    })
    me.translate(bb.width, 0)
  }

  down2up () {
    const me = this
    const bb = me.getBoundingBox()
    me.eachNode(node => {
      node.y = node.y - (node.y - bb.top) * 2 - node.height
    })
    me.translate(0, bb.height)
  }
}

module.exports = Node
