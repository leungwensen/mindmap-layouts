import Color from 'zero-colors'
import generateTree from './data/generate-tree'

const RightLogicalLayout = MindmapLayouts.RightLogical

const count = 20
const root = generateTree(count)
Object.assign(root, {
  'height': 80,
  'width': 300,
  'hgap': 100
})

const layout = new RightLogicalLayout(root)

const t0 = window.performance.now()

const rootNode = layout.doLayout()

const t1 = window.performance.now()

const bb = rootNode.getBoundingBox()
console.log(rootNode, bb)
const canvas = document.getElementById('canvas')
canvas.width = bb.width > 30000 ? 30000 : bb.width
canvas.height = bb.height > 30000 ? 30000 : bb.height

function randomNumber () {
  return Math.random()
}
function randomInt (n) {
  return Math.floor(randomNumber() * n)
}
function randomColor () {
  return `rgba(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)}, 0.6)`
}
function roundInt (num) {
  return Math.round(num)
}

const lineColor = new Color(randomColor()).toGrey().toString(true)
function drawBezierCurveToChild (n, c, ctx) {
  const beginX = roundInt(n.x + n.width - n.hgap)
  const beginY = roundInt(n.y + n.height / 2)
  const endX = roundInt(c.x + c.hgap)
  const endY = roundInt(c.y + c.height / 2)
  // console.log(`(${beginX}, ${beginY}), (${endX}, ${endY})`)
  ctx.strokeStyle = lineColor
  ctx.beginPath()
  ctx.moveTo(beginX, beginY)
  ctx.bezierCurveTo(
    roundInt(beginX + (n.hgap + c.hgap) / 2), beginY,
    roundInt(endX - (n.hgap + c.hgap) / 2), endY,
    endX, endY
  )
  ctx.stroke()
}
function drawNode (node, ctx) {
  const color = new Color(randomColor())
  // console.log(color.toRgba());
  const x = roundInt(node.x + node.hgap)
  const y = roundInt(node.y + node.vgap)
  const width = roundInt(node.width - node.hgap * 2)
  const height = roundInt(node.height - node.vgap * 2)
  // const x = roundInt(node.x)
  // const y = roundInt(node.y)
  // const width = roundInt(node.width)
  // const height = roundInt(node.height)
  ctx.fillStyle = color.toString()
  ctx.fillRect(x, y, width, height)
  ctx.strokeStyle = color.toGrey().toString()
  ctx.strokeRect(x, y, width, height)
  node.children.forEach(child => {
    drawNode(child, ctx)
  })
}
function drawLink (node, ctx) {
  node.children.forEach(child => {
    drawBezierCurveToChild(node, child, ctx)
    drawLink(child, ctx)
  })
}

const t2 = window.performance.now()

console.log(`there are ${count} tree nodes`)
console.log(`layout algorithm took ${t1 - t0}ms, and drawing took ${t2 - t1}ms.`)

if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
  drawLink(rootNode, ctx)
  drawNode(rootNode, ctx)
}

