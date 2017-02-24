import Layout from './layout'
import nonLayeredTidyTree from './non-layered-tidy-tree'

class RightLogical extends Layout {
  doLayout () {
    const root = this.root
    return nonLayeredTidyTree(root, true)
  }
}

export default RightLogical
