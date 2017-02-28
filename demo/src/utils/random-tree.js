import {
  randomTree
} from 'random-graph'

export default size => randomTree({
  size,
  attributes: {
    id: {
      type: 'uuid'
    },
    name: {
      type: 'randomString',
      options: {
        length: 0,
        maxLength: 12
      }
    }
  }
})
