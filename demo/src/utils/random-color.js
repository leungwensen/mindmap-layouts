const Color = require('zero-colors')
const {
  randomInt
} = require('random-graph')

module.exports = () => {
  const rgba = `rgba(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)}, 0.6)`
  return new Color(rgba)
}
