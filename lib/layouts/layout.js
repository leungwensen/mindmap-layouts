import Node from '../hierarchy/node'

class Layout {
  constructor (root, options = {}, extraEdges = []) {
    const me = this
    me.root = new Node(root, options)
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
        id: node.data.id || `__node-${node.depth}-${countByDepth[node.depth]}`,
        centX: node.x + node.width / 2,
        centY: node.y + node.height / 2,
        data: node.data,
        depth: node.depth,
        height: node.height,
        width: node.width,
        x: node.x,
        y: node.y
      })
    })
    // while
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
  }
}

export default Layout
