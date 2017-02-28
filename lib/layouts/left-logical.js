import Layout from './layout'
import nonLayeredTidyTree from '../algorithms/non-layered-tidy-tree'

class LeftLogical extends Layout {
  doLayout () {
    const root = this.root
    nonLayeredTidyTree(root, true)
    root.right2left()
    return root
  }
}

export default LeftLogical
