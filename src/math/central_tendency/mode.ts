export function mode(numbers: number[]): number[] {
  const frequencyMap = new Map<number, number>();

  for (const num of numbers) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  let maxFrequency = 0;
  for (const freq of frequencyMap.values()) {
    if (freq > maxFrequency) {
      maxFrequency = freq;
    }
  }

  const modes: number[] = [];
  for (const [num, freq] of frequencyMap.entries()) {
    if (freq === maxFrequency) {
      modes.push(num);
    }
  }

  return modes;
}
