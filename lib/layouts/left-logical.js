const Layout = require('./layout')
const nonLayeredTidyTree = require('../algorithms/non-layered-tidy-tree')

class LeftLogical extends Layout {
  doLayout () {
    const root = this.root
    nonLayeredTidyTree(root, true)
    root.right2left()
    return root
  }
}

module.exports = LeftLogical
