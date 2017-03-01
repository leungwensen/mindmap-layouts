const randomColor = require('./random-color')

const PEM = 18

module.exports = (node, ctx, scale = 1) => {
  const origin = node.data
  const color = randomColor()
  // console.log(color.toRgba());
  const x = Math.round(node.x + node.hgap)
  const y = Math.round(node.y + node.vgap)
  const width = Math.round(node.width - node.hgap * 2)
  const height = Math.round(node.height - node.vgap * 2)
  // const x = Math.round(node.x)
  // const y = Math.round(node.y)
  // const width = Math.round(node.width)
  // const height = Math.round(node.height)
  // node
  ctx.clearRect(x / scale, y / scale, width / scale, height / scale)
  ctx.fillStyle = color.toString()
  ctx.fillRect(x / scale, y / scale, width / scale, height / scale)
  ctx.strokeStyle = color.toGrey().toString()
  ctx.strokeRect(x / scale, y / scale, width / scale, height / scale)
  // text
  if (origin.isRoot) {
    ctx.font = `${PEM * 2 / scale}px Courier, monospace`
  } else {
    ctx.font = `${PEM / scale}px Courier, monospace`
  }
  ctx.fillStyle = '#666'
  ctx.fillText(origin.name, (x + PEM * 0.8) / scale, (y + (origin.isRoot ? PEM * 2 : PEM * 1)) / scale)
}
