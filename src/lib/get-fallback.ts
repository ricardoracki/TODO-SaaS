export function getFallback(text: string) {
  const arr = text.trim().split(' ')

  if (arr.length === 1) {
    return arr[0].charAt(0).concat(arr[0].charAt(1)).toUpperCase()
  }

  return arr[0].charAt(0).concat(arr[1].charAt(0)).toUpperCase()
}
