let seed = Math.round(Math.random() * 10000)
let noise = 5
export const planetSystem = {
  seed,
  getSeed: () => seed,
  setSeed: (newSeed: number) => {
    seed = newSeed
  },
  randomizeSeed: () => {
    seed = Math.round(Math.random() * 10000)
  },
  generatePlanet: () => {
    return {
      name: `Planet ${Math.round(Math.random() * 10000)}`,
      seed: Math.round(Math.random() * 10000),
      size: 0,
      color: `#${Math.round(0xAAAAAA + Math.random() * 0x111111).toString(16)}`,
      xTranslate: 0,
      angle: 0,
      ringId: 0,
    }
  },
  generateSystem: (planetCount: number) => {
    return Array.from({ length: planetCount }, () => planetSystem.generatePlanet())
  },
}
