import TreeNode from '../../lib/tree-node'

function randomInRange (start, end) {
  return start + Math.floor(Math.random() * (end - start))
}

class GenerateTrees {
  nr = 0;
  minWidth = 0;
  maxWidth = 0;
  minHeight = 0;
  maxHeight = 0;

  constructor (nr, minWidth, maxWidth, minHeight, maxHeight) {
    this.nr = nr
    this.minWidth = minWidth
    this.maxWidth = maxWidth
    this.minHeight = minHeight
    this.maxHeight = maxHeight
  }

  randRoot () {
    const me = this
    return new TreeNode(
      randomInRange(me.minWidth, me.maxWidth),
      randomInRange(me.minHeight, me.maxHeight)
    )
  }

  rand () {
    const me = this
    return me.randomTree(me.nr)
  }

  randomTree (nr) {
    const me = this
    const root = me.randRoot()
    for (let i = 0; i < nr - 1; i++) {
      root.randExpand(me.randRoot())
    }
    return root
  }
}

export default GenerateTrees
