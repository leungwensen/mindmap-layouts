class BoundingBox {
  width = 0;
  height = 0;

  constructor (w, h) {
    const me = this
    me.width = w
    me.height = h
  }

  merge (boundingBox) {
    const me = this
    return new BoundingBox(
      Math.max(me.width, boundingBox.width),
      Math.max(me.height, boundingBox.height)
    )
  }
}

export default BoundingBox
