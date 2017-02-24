const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const lettersLen = letters.length

function roundRandomInt (n) {
  return Math.round(Math.random() * n)
}
function randomString (n) {
  let res = ''
  for (let i = 0; i < n; i++) {
    res += letters[roundRandomInt(lettersLen)]
  }
  return res
}

function generateRoot () {
  return {
    name: randomString(roundRandomInt(10)),
    children: []
  }
}

function generateNode (root, child) {
  const rand = roundRandomInt(root.children.length)
  if (rand === root.children.length) {
    root.children.push(child)
  } else {
    generateNode(root.children[rand], child)
  }
}

function randomNode (maxSize) {
  const root = generateRoot()
  for (let i = 0; i < maxSize; i++) {
    generateNode(root, generateRoot())
  }
  return root
}

export default randomNode
