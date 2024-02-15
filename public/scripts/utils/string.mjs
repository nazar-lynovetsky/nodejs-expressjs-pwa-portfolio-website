/**
 * NOTE: The space character is replaced with "br" characters.
 */

export function stringToArray(str) {
  let arr = []
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i] === ' ' ? 'br' : str[i])
  }
  return arr
}