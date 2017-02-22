/*
 * @reference: https://github.com/cwi-swat/non-layered-tidy-trees
 */

class Tree {
  // Width and height.
  w = 0;
  h = 0;

  x = 0;
  y = 0;
  prelim = 0;
  mod = 0;
  shift = 0;
  change = 0;

  // Left and right thread.
  tl = null;
  tr = null;

  // Extreme left and right nodes.
  el = null;
  er = null;

  // Sum of modifiers at the extreme nodes.
  msel = 0;
  mser = 0;

  // Array of children and number of children.
  c = [];
  cs = 0;

  constructor (w, h, y, c = []) {
    this.w = w
    this.h = h
    this.y = y
    this.c = c
    this.cs = c.length
  }
}

function layout (t) {
  firstWalk(t)
  secondWalk(t, 0)
}

function firstWalk (t) {
  if (t.cs === 0) {
    setExtremes(t)
    return
  }
  firstWalk(t.c[0])
  // Create siblings in contour minimal vertical coordinate and index list.
  let ih = updateIYL(bottom(t.c[0].el), 0, null)
  for (let i = 1; i < t.cs; i++) {
    firstWalk(t.c[i])
    // Store lowest vertical coordinate while extreme nodes still point in current subtree.
    const minY = bottom(t.c[i].er)
    separate(t, i, ih)
    ih = updateIYL(minY, i, ih)
  }
  positionRoot(t)
  setExtremes(t)
}

function setExtremes (t) {
  if (t.cs === 0) {
    t.el = t
    t.er = t
    t.msel = t.mser = 0
  } else {
    t.el = t.c[0].el
    t.msel = t.c[0].msel
    t.er = t.c[t.cs - 1].er
    t.mser = t.c[t.cs - 1].mser
  }
}

function separate (t, i, ih) {
  // Right contour node of left siblings and its sum of modfiers.
  let sr = t.c[i - 1]
  let mssr = sr.mod
  // Left contour node of current subtree and its sum of modfiers.
  let cl = t.c[i]
  let mscl = cl.mod
  while (sr != null && cl != null) {
    if (bottom(sr) > ih.lowY) ih = ih.nxt
    // How far to the left of the right side of sr is the left side of cl?
    const dist = (mssr + sr.prelim + sr.w) - (mscl + cl.prelim)
    if (dist > 0) {
      mscl += dist
      moveSubtree(t, i, ih.index, dist)
    }
    const sy = bottom(sr)
    const cy = bottom(cl)
    // Advance highest node(s) and sum(s) of modifiers (Coordinate system increases downwards)
    if (sy <= cy) {
      sr = nextRightContour(sr)
      if (sr != null) mssr += sr.mod
    }
    if (sy >= cy) {
      cl = nextLeftContour(cl)
      if (cl != null) mscl += cl.mod
    }
  }
  // Set threads and update extreme nodes.
  if (sr === null && cl != null) {
    // In the first case, the current subtree must be taller than the left siblings.
    setLeftThread(t, i, cl, mscl)
  } else if (sr != null && cl === null) {
    // In this case, the left siblings must be taller than the current subtree.
    setRightThread(t, i, sr, mssr)
  }
}

function moveSubtree (t, i, si, dist) {
  // Move subtree by changing mod.
  t.c[i].mod += dist
  t.c[i].msel += dist
  t.c[i].mser += dist
  distributeExtra(t, i, si, dist)
}

function nextLeftContour (t) {
  return t.cs === 0 ? t.tl : t.c[0]
}

function nextRightContour (t) {
  return t.cs === 0 ? t.tr : t.c[t.cs - 1]
}

function bottom (t) {
  return t.y + t.h
}

function setLeftThread (t, i, cl, modsumcl) {
  const li = t.c[0].el
  li.tl = cl
  // Change mod so that the sum of modifier after following thread is correct.
  const diff = (modsumcl - cl.mod) - t.c[0].msel
  li.mod += diff
  // Change preliminary x coordinate so that the node does not move.
  li.prelim -= diff
  // Update extreme node and its sum of modifiers.
  t.c[0].el = t.c[i].el
  t.c[0].msel = t.c[i].msel
}

// Symmetrical to setLeftThread.
function setRightThread (t, i, sr, modsumsr) {
  const ri = t.c[i].er
  ri.tr = sr
  const diff = (modsumsr - sr.mod) - t.c[i].mser
  ri.mod += diff
  ri.prelim -= diff
  t.c[i].er = t.c[i - 1].er
  t.c[i].mser = t.c[i - 1].mser
}

function positionRoot (t) {
  // Position root between children, taking into account their mod.
  t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod +
    t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2
}

function secondWalk (t, modsum) {
  modsum += t.mod
  // Set absolute (non-relative) horizontal coordinate.
  t.x = t.prelim + modsum
  addChildSpacing(t)
  for (let i = 0; i < t.cs; i++) {
    secondWalk(t.c[i], modsum)
  }
}

function distributeExtra (t, i, si, dist) {
  // Are there intermediate children?
  if (si !== i - 1) {
    const nr = i - si
    t.c[si + 1].shift += dist / nr
    t.c[i].shift -= dist / nr
    t.c[i].change -= dist - dist / nr
  }
}

// Process change and shift to add intermediate spacing to mod.
function addChildSpacing (t) {
  let d = 0
  let modsumdelta = 0
  for (let i = 0; i < t.cs; i++) {
    d += t.c[i].shift
    modsumdelta += d + t.c[i].change
    t.c[i].mod += modsumdelta
  }
}

// A linked list of the indexes of left siblings and their lowest vertical coordinate.
// class IYL {
//     lowY = 0;
//     index = 0;
//     nxt = null;
//
//     constructor(lowY, index, nxt) {
//         this.lowY = lowY;
//         this.index = index;
//         this.nxt = nxt;
//     }
// }
function updateIYL (minY, index, ih) {
  // Remove siblings that are hidden by the new subtree.
  while (ih != null && minY >= ih.lowY) {
    ih = ih.nxt
  }
  // Prepend the new subtree.
  return {
    minY,
    index,
    nxt: ih
  }
}

export {
  Tree,
  layout
}
