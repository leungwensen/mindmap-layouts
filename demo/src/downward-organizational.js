import DownwardOrganizationalLayout from '../../lib/layouts/downward-organizational'
import Color from './color/index'

const layout = new DownwardOrganizationalLayout({
  'name': 'root',
  'height': 80,
  'width': 300,
  'vgap': 100,
  'children': [
    {
      'name': 'child-1',
      'children': [
        {
          'name': 'child-1-1'
        },
        {
          'name': 'child-1-2',
          'children': [
            {
              'name': 'child-1-2-1'
            }
          ]
        }
      ]
    },
    {
      'name': 'child-2'
    },
    {
      'name': 'child-3'
    },
    {
      'name': 'child-4',
      'children': [
        {
          'name': 'child-4-1'
        },
        {
          'name': 'child-4-2'
        }
      ]
    }
  ]
})

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
function rgba2str (rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
}
function roundInt (num) {
  return Math.round(num)
}

const lineColor = rgba2str(new Color(randomColor()).toGrey().toRgba())
function drawBezierCurveToChild (n, c, ctx) {
  const beginX = roundInt(n.x + n.width / 2)
  const beginY = roundInt(n.y + n.height - n.vgap)
  const endX = roundInt(c.x + c.width / 2)
  const endY = roundInt(c.y + c.vgap)
  console.log(`(${beginX}, ${beginY}), (${endX}, ${endY})`)
  ctx.strokeStyle = lineColor
  ctx.beginPath()
  ctx.moveTo(beginX, beginY)
  ctx.bezierCurveTo(
    beginX, roundInt(beginY + (n.vgap + c.vgap) / 2),
    endX, roundInt(endY - (n.vgap + c.vgap) / 2),
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
  ctx.fillStyle = rgba2str(color.toRgba())
  ctx.fillRect(x, y, width, height)
  ctx.strokeStyle = rgba2str(color.toGrey().toRgba())
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

console.log(`there are 7 tree nodes`)
console.log(`layout algorithm took ${t1 - t0}ms, and drawing took ${t2 - t1}ms.`)

if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
  drawLink(rootNode, ctx)
  drawNode(rootNode, ctx)
}

