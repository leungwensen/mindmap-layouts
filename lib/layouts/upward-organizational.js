const Layout = require('./layout')
const nonLayeredTidyTree = require('../algorithms/non-layered-tidy-tree')

class UpwardOrganizational extends Layout {
  doLayout () {
    const root = this.root
    nonLayeredTidyTree(root, false)
    root.down2up()
    return root
  }
}

module.exports = UpwardOrganizational
