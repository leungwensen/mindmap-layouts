// import TreeNode from '../tree-node'
import {
  Tree
  // layout
} from './non-layered-tidy-trees'

export const convert = (root/* TreeNode */) => {
  if (!root) return null
  const children = []
  root.children.forEach((child) => {
    children.push(convert(child))
  })
  return new Tree(root.width, root.height, root.y, children)
}

export const convertBack = (converted/* Tree */, root/* TreeNode */) => {
  root.x = converted.x
  converted.c.forEach((child, i) => {
    convertBack(child, root.children[i])
  })
}
