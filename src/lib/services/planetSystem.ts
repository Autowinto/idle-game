import Baren from '$lib/assets/planets/Baren.png'
import Terran from '$lib/assets/planets/Terran.png'
import Lava from '$lib/assets/planets/Lava.png'
import Ice from '$lib/assets/planets/Ice.png'
import BlackHole from '$lib/assets/planets/Black_hole.png'

let seed = getRandomNumber(0, 10000)
let noise = 5
const planetAssets = [Baren, Terran, Lava, Ice, BlackHole]

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


export const planetSystem = {
  seed,
  getSeed: () => seed,
  setSeed: (newSeed: number) => {
    seed = newSeed
  },
  randomizeSeed: () => {
    seed = getRandomNumber(0, 10000)
  },
  generatePlanet: (index: number): Planet => {
    const seed = getRandomNumber(0, 10000)
    const orbitTime = getRandomNumber(10 * (index+1), 15 * (index+1))
    console.log(`Generating planet with seed: ${seed}, orbitTime: ${orbitTime}`)
    return {
      name: `Planet ${seed}`,
      seed,
      size: 0,
      color: `#${Math.round(0xAAAAAA + Math.random() * 0x111111).toString(16)}`,
      xTranslate: 0,
      angle: 0,
      ringId: 0,
      zIndex: 0,
      asset: planetAssets[index % planetAssets.length],
      orbitTime: orbitTime,
    }
  },
  generateSystem: (planetCount: number) => {
    return Array.from({ length: planetCount }, (_, index) => planetSystem.generatePlanet(index))
  },
}
