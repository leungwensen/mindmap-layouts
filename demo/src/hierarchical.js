import TreeNode from '../../lib/tree-node'
import {
  Tree,
  layout
} from '../../lib/layouts/non-layered-tidy-trees'
import GenerateTrees from './generate-trees'

console.log(TreeNode, Tree, layout, GenerateTrees)

const gen = new GenerateTrees(50, 10, 100, 10, 100)

const tree = gen.rand()
tree.addGap(10, 10)
// layout
tree.layer()
tree.normalizeX()
const bb = tree.getBoundingBox()
console.log(tree, bb)
