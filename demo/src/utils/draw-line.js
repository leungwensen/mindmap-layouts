const randomColor = require('./random-color')

const lineColor = randomColor().toGrey().toString(true)

module.exports = (n, c, ctx, isHorizontal = false, scale = 1) => {
  let beginNode = n
  let endNode = c
  let beginX
  let beginY
  let endX
  let endY
  if (isHorizontal) {
    if (n.x > c.x) {
      beginNode = c
      endNode = n
    }
    beginX = Math.round(beginNode.x + beginNode.width - beginNode.hgap)
    beginY = Math.round(beginNode.y + beginNode.height / 2)
    endX = Math.round(endNode.x + endNode.hgap)
    endY = Math.round(endNode.y + endNode.height / 2)
  } else {
    if (n.y > c.y) {
      beginNode = c
      endNode = n
    }
    beginX = Math.round(beginNode.x + beginNode.width / 2)
    beginY = Math.round(beginNode.y + beginNode.height - beginNode.vgap)
    endX = Math.round(endNode.x + endNode.width / 2)
    endY = Math.round(endNode.y + endNode.vgap)
  }
  if (beginNode.isRoot()) {
    beginX = Math.round(beginNode.x + beginNode.width / 2)
    beginY = Math.round(beginNode.y + beginNode.height / 2)
  }
  if (endNode.isRoot()) {
    endX = Math.round(endNode.x + endNode.width / 2)
    endY = Math.round(endNode.y + endNode.height / 2)
  }
  // console.log(`(${beginX}, ${beginY}), (${endX}, ${endY})`)
  ctx.strokeStyle = lineColor
  ctx.beginPath()
  ctx.moveTo(beginX / scale, beginY / scale)
  if (isHorizontal) {
    ctx.bezierCurveTo(
      Math.round(beginX + (beginNode.hgap + endNode.hgap) / 2) / scale, beginY / scale,
      Math.round(endX - (beginNode.hgap + endNode.hgap) / 2) / scale, endY / scale,
      endX / scale, endY / scale
    )
  } else {
    ctx.bezierCurveTo(
      beginX / scale, Math.round(beginY + (beginNode.vgap + endNode.vgap) / 2) / scale,
      endX / scale, Math.round(endY - (beginNode.vgap + endNode.vgap) / 2) / scale,
      endX / scale, endY / scale
    )
  }
  ctx.stroke()
}
