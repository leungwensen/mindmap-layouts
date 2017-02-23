import Node from '../hierarchy/node'

class Layout {
  constructor (root, extraEdges) {
    const me = this
    me.root = new Node(root)
    me.extraEdges = extraEdges
  }

  doLayout () {
    throw new Error('please override this method')
  }

  getNodes () {
  }

  getEdges () {
  }
}

export default Layout
