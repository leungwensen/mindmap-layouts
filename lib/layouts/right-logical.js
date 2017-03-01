const Layout = require('./layout')
const nonLayeredTidyTree = require('../algorithms/non-layered-tidy-tree')

class RightLogical extends Layout {
  doLayout () {
    const root = this.root
    return nonLayeredTidyTree(root, true)
  }
}

module.exports = RightLogical
