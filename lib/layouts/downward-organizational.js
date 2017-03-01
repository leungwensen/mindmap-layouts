const Layout = require('./layout')
const nonLayeredTidyTree = require('../algorithms/non-layered-tidy-tree')

class DownwardOrganizational extends Layout {
  doLayout () {
    const root = this.root
    return nonLayeredTidyTree(root, false)
  }
}

module.exports = DownwardOrganizational
