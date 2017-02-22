import TreeNode from '../../lib/tree-node'
import {
  Tree,
  layout
} from '../../lib/layouts/non-layered-tidy-trees'
import {
  convert,
  convertBack
} from '../../lib/layouts/marshall'
import GenerateTrees from './generate-trees'
import Color from './color/index'

console.log(TreeNode, Tree, layout, GenerateTrees)

const count = 50
const gen = new GenerateTrees(count, 10, 100, 10, 100)

const rootNode = gen.rand()
rootNode.addGap(10, 10)

const t0 = window.performance.now()

// layout
rootNode.layer()
const converted = convert(rootNode)
layout(converted)
convertBack(converted, rootNode)
rootNode.normalizeX()
const bb = rootNode.getBoundingBox()
// console.log(rootNode, bb)

const t1 = window.performance.now()

const canvas = document.getElementById('canvas')
canvas.width = bb.width > 30000 ? 30000 : bb.width
canvas.height = bb.height > 30000 ? 30000 : bb.height

function randomNumber() {
  return Math.random()
}
function randomInt(n) {
  return Math.floor(randomNumber() * n)
}
function randomColor() {
  return `rgba(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)}, 0.6)`
}
function rgba2str(rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
}

function drawNode(node, ctx) {
  const color = new Color(randomColor())
  // console.log(color.toRgba());
  ctx.fillStyle = rgba2str(color.toRgba())
  ctx.fillRect(node.x, node.y, node.width, node.height)
  ctx.strokeStyle = rgba2str(color.toGrey().toRgba())
  ctx.strokeRect(node.x, node.y, node.width, node.height)
  node.children.forEach(child => {
    drawNode(child, ctx)
  })
}

const t2 = window.performance.now()

console.log(`there are ${count} tree nodes`)
console.log(`layout algorithm took ${t1 - t0}ms, and drawing took ${t2 - t1}ms.`)

if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
  drawNode(rootNode, ctx)
}
