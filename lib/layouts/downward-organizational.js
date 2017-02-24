import Layout from './layout'
import nonLayeredTidyTree from './non-layered-tidy-tree'

class DownloadOrganizational extends Layout {
  doLayout () {
    const root = this.root
    return nonLayeredTidyTree(root, false)
  }
}

export default DownloadOrganizational
