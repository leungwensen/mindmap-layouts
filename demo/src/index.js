const randomTree = require('./utils/random-tree')
const drawLink = require('./utils/draw-line')
const drawNode = require('./utils/draw-node')

const canvas = document.getElementById('canvas')
const containerNode = document.getElementById('container')
const formNode = document.getElementById('layout-props')
const layoutTimeNode = document.getElementById('layout-time')
const renderTimeNode = document.getElementById('render-time')

const PEM = 18
const ctx = canvas.getContext('2d')

const HORIZONTAL_LAYOUTS = [
  'LeftLogical',
  'RightLogical',
  'Standard'
]
function isHorizontal (type) {
  return HORIZONTAL_LAYOUTS.indexOf(type) > -1
}

function setCanvasSize () {
  canvas.width = containerNode.offsetWidth
  canvas.height = containerNode.offsetHeight
}

function render () {
  const count = formNode.dataSize.value
  const layoutType = formNode.layoutType.value
  const root = randomTree(count)
  Object.assign(root, {
    isRoot: true
  })

  ctx.font = `${PEM}px Courier, monospace`

  const MindmapLayout = MindmapLayouts[layoutType]
  const layout = new MindmapLayout(root, {
    getHeight (d) {
      if (d.isRoot) {
        return PEM * 2.4
      }
      return PEM * 1.2
    },
    getWidth (d) {
      if (d.isRoot) {
        return ctx.measureText(d.name).width * 2 + PEM * 1.6
      }
      return ctx.measureText(d.name).width + PEM * 1.6
    },
    getHGap (d) {
      if (d.isRoot) {
        return PEM * 2
      }
      return Math.round(PEM / 2)
    },
    getVGap (d) {
      if (d.isRoot) {
        return PEM * 2
      }
      return Math.round(PEM / 2)
    }
  })

  const t0 = window.performance.now()

  const rootNode = layout.doLayout()

  const t1 = window.performance.now()

  setCanvasSize()
  const bb = rootNode.getBoundingBox()
  const scale = Math.max(bb.width / canvas.width, bb.height / canvas.height)
  canvas.width = bb.width / scale
  canvas.height = bb.height / scale

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    rootNode.eachNode(node => {
      node.children.forEach(child => {
        drawLink(node, child, ctx, isHorizontal(layoutType), scale)
      })
      drawNode(node, ctx, scale)
    })
  }

  const t2 = window.performance.now()

  layoutTimeNode.innerHTML = Math.round(t1 - t0)
  renderTimeNode.innerHTML = Math.round(t2 - t1)
}

formNode.addEventListener('change', render)
formNode.addEventListener('submit', (e) => {
  e.preventDefault()
  render()
  return false
})
window.onresize = () => {
  setCanvasSize()
  render()
}

setCanvasSize()
render()

module.exports = MindmapLayouts
