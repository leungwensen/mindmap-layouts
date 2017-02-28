import Color from 'zero-colors'
import {
  randomInt
} from 'random-graph'

export default () => {
  const rgba = `rgba(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)}, 0.6)`
  return new Color(rgba)
}
