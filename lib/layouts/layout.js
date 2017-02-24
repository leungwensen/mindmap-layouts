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
  }

  getEdges () {
  }
}

export default Layout
