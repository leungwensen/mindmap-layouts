import randomTree from './utils/random-tree'
import drawLink from './utils/draw-line'
import drawNode from './utils/draw-node'

const canvas = document.getElementById('canvas')
const containerNode = document.getElementById('container')
const formNode = document.getElementById('layout-props')
const layoutTimeNode = document.getElementById('layout-time')
const renderTimeNode = document.getElementById('render-time')

const ctx = canvas.getContext('2d')

const HORIZONTAL_LAYOUTS = [
  'LeftLogical',
  'RightLogical'
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
    'height': 80,
    'width': 300,
    'hgap': 100,
    'vgap': 100
  })

  const MindmapLayout = MindmapLayouts[layoutType]
  const layout = new MindmapLayout(root)

  const t0 = window.performance.now()

  const rootNode = layout.doLayout()

  const t1 = window.performance.now()

  const bb = rootNode.getBoundingBox()
  const scale = Math.max(bb.width / canvas.width, bb.height / canvas.height)

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
