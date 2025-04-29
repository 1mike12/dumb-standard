import { LinearCongruentGenerator } from "../../math/number_generation/LinearCongruentGenerator"

/**
 *
 * @param array
 * @param seed
 */
export function shuffleFisherYates(array: any[], seed?: number): any[] {
  let rng: LinearCongruentGenerator
  if (seed !== undefined) {
    rng = new LinearCongruentGenerator(seed)
  } else {
    rng = new LinearCongruentGenerator(0)
  }
  for (let i = array.length - 1; i > 0; i--) {
    const randomNumber = seed !== undefined ? rng.nextFloat() : Math.random()
    const j = Math.floor(randomNumber * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
