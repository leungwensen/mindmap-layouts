import randomColor from './random-color'

export default (node, ctx, scale = 1) => {
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
  ctx.clearRect(x / scale, y / scale, width / scale, height / scale)
  ctx.fillStyle = color.toString()
  ctx.fillRect(x / scale, y / scale, width / scale, height / scale)
  ctx.strokeStyle = color.toGrey().toString()
  ctx.strokeRect(x / scale, y / scale, width / scale, height / scale)
}
