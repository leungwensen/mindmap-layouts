const Node = require('../hierarchy/node')

class Layout {
  constructor (root, options = {}, extraEdges = []) {
    const me = this
    me.root = new Node(root, options)
    me.options = options
    me.extraEdges = extraEdges
  }

  doLayout () {
    throw new Error('please override this method')
  }

  getNodes () {
    const root = this.root
    const nodes = []
    let countByDepth = {}
    root.eachNode(node => {
      countByDepth[node.depth] = countByDepth[node.depth] || 0
      countByDepth[node.depth]++
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
      })
    })
    return nodes
  }

  getEdges () {
    const me = this
    const extraEdges = me.extraEdges
    const root = this.root
    const edges = []
    root.eachNode(node => {
      node.children.forEach(child => {
        edges.push({
          source: node.id,
          target: child.id
        })
      })
    })
    edges.concat(extraEdges)
    return edges
  }
}

module.exports = Layout
