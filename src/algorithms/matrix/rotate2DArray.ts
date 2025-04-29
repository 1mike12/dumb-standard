export function rotate2DArray(arr: any[][]) {
  const rotated: any[][] = []
  for (let i = 0; i < arr[0].length; i++) {
    const c: number[] = []
    for (const row of arr) {
      const val = row[i]
      if (val !== undefined) c.push(val)
    }
    rotated.push(c)
  }
  return rotated
}
