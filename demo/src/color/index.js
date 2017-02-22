import namedColor from './named'

const round = Math.round

function isString (obj) {
  return typeof obj === 'string'
}
function lc (str) {
  return str.toLowerCase()
}

function confine (c, low, high) {
  c = Number(c)
  if (isFinite(c)) {
    if (c < low) {
      return low
    }
    return c > high ? high : c
  }
  return high
}
function hue2rgb (m1, m2, h) {
  if (h < 0) {
    ++h
  }
  if (h > 1) {
    --h
  }
  const h6 = 6 * h
  if (h6 < 1) {
    return m1 + (m2 - m1) * h6
  }
  if (2 * h < 1) {
    return m2
  }
  if (3 * h < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6
  }
  return m1
}
function rgb2hsl (r, g, b, a) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        break
    }
    h /= 6
  }
  return [h, s, l, a]
}

class Color {
  // init props
  // r: 255,
  // g: 255,
  // b: 255,
  // a: 1,

  constructor (/* Array|String|Object */ color) {
    let me = this
    if (color) {
      if (isString(color)) {
        me = Color.fromString(color)
      } else if (Array.isArray(color)) {
        me = Color.fromArray(color, me)
      } else {
        me.set(color.r, color.g, color.b, color.a)
        if (!(color instanceof Color)) {
          me.sanitize()
        }
      }
    } else {
      me.set(255, 255, 255, 1)
    }
    return me
  }

  set (r, g, b, a) {
    const me = this
    me.r = r
    me.g = g
    me.b = b
    me.a = a
  }

  sanitize () {
    const me = this
    me.r = round(confine(me.r, 0, 255))
    me.g = round(confine(me.g, 0, 255))
    me.b = round(confine(me.b, 0, 255))
    me.a = confine(me.a, 0, 1)
    return me
  }

  toRgba () {
    const me = this
    return [me.r, me.g, me.b, me.a]
  }

  toHsla () {
    const me = this
    return rgb2hsl(me.r, me.g, me.b, me.a)
  }

  toHex () {
    const me = this
    const arr = ['r', 'g', 'b'].map(x => {
      const str = me[x].toString(16)
      return str.length < 2 ? `0${str}` : str
    })
    return `#${arr.join('')}`
  }

  toCss (/* Boolean? */ includeAlpha) {
    const me = this
    const rgb = `${me.r},${me.g},${me.b}`
    return includeAlpha ? `rgba(${rgb},${me.a})` : `rgb(${rgb})`
  }

  toString () {
    return this.toCss(true)
  }

  toGrey () {
    const me = this
    const g = round((me.r + me.g + me.b) / 3)
    return Color.makeGrey(g, me.a)
  }
}

Object.assign(Color, {
  hexByName: namedColor,

  makeGrey (/* Number */ g, /* Number? */ a) {
    return Color.fromArray([g, g, g, a])
  },

  blendColors (/* Color */ start, /* Color */ end, /* Number */ weight, /* Color? */ obj) {
    const t = obj || new Color();
    ['r', 'g', 'b', 'a'].forEach(x => {
      t[x] = start[x] + (end[x] - start[x]) * weight
      if (x !== 'a') {
        t[x] = Math.round(t[x])
      }
    })
    return t.sanitize()
  },

  fromHex (/* String */ color) {
    const result = new Color()
    const bits = (color.length === 4) ? 4 : 8
    const mask = (1 << bits) - 1

    color = Number(`0x${color.substr(1)}`)

    if (isNaN(color)) {
      return null
    }
    ['b', 'g', 'r'].forEach(x => {
      const c = color & mask
      color >>= bits
      result[x] = bits === 4 ? 17 * c : c
    })
    return result
  },
  fromRgb (/* String */ color) {
    const matches = lc(color).match(/^rgba?\(([\s.,0-9]+)\)/)
    return matches && Color.fromArray(matches[1].split(/\s*,\s*/))
  },
  fromHsl (/* String */ color) {
    const matches = lc(color).match(/^hsla?\(([\s.,0-9]+)\)/)
    if (matches) {
      const c = matches[2].split(/\s*,\s*/)
      const l = c.length
      const H = ((parseFloat(c[0]) % 360) + 360) % 360 / 360
      const S = parseFloat(c[1]) / 100
      const L = parseFloat(c[2]) / 100
      const m2 = L <= 0.5 ? L * (S + 1) : L + S - L * S
      const m1 = 2 * L - m2
      const a = [
        hue2rgb(m1, m2, H + 1 / 3) * 256,
        hue2rgb(m1, m2, H) * 256,
        hue2rgb(m1, m2, H - 1 / 3) * 256,
        1
      ]
      if (l === 4) {
        a[3] = c[3]
      }
      return Color.fromArray(a)
    }
    return null
  },
  fromArray (/* Array */ arr) {
    const result = new Color()
    result.set(Number(arr[0]), Number(arr[1]), Number(arr[2]), Number(arr[3]))
    if (isNaN(result.a)) {
      result.a = 1
    }
    return result.sanitize()
  },
  fromString (/* String */ str) {
    const s = Color.hexByName[str]
    return s && Color.fromHex(s) ||
      Color.fromRgb(str) ||
      Color.fromHex(str) ||
      Color.fromHsl(str)
  }
})

Color.named = Color.namedColor = namedColor

export default Color
