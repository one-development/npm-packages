import Color from 'color'

export default function isColor(str) {
  try {
    return Boolean(Color(str))
  } catch (e) {
    return false
  }
}
