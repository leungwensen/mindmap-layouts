import Layout from './layout'
import nonLayeredTidyTree from '../algorithms/non-layered-tidy-tree'

class UpwardOrganizational extends Layout {
  doLayout () {
    const root = this.root
    nonLayeredTidyTree(root, false)
    root.down2up()
    return root
  }
}

export default UpwardOrganizational
