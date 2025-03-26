<script>
  import { planetSystem } from "$lib/services/planetSystem";
  import { onMount } from "svelte";

  const planetCount = 8; // Number of planets
  let planets = [];

  let scale = 1;
  let originX = 50; // Default transform-origin X (percentage)
  let originY = 50; // Default transform-origin Y (percentage)

  function getWidth(index) {
    return Math.ceil((25 + index * 100) / 2) * 2;
  }

  const rings = [
    { id: 1, color: "#2F2F4C", borderWidth: getWidth(1) },
    { id: 2, color: "#3F3E65", borderWidth: getWidth(2) },
    { id: 3, color: "#474672", borderWidth: getWidth(3) },
    { id: 4, color: "#355834ff", borderWidth: getWidth(4) },
    { id: 5, color: "#9c9990ff", borderWidth: getWidth(5) },
    { id: 6, color: "#da4167ff", borderWidth: getWidth(6) },
    { id: 7, color: "#e0d8deff", borderWidth: getWidth(7) },
    { id: 8, color: "#56544D", borderWidth: getWidth(8) },
  ];

  const borderPx = 2; // 2px border for each side

  const size = getWidth(rings.length);

  onMount(() => {
    planets = planetSystem.generateSystem(planetCount);

    for (let i = 0; i < planets.length; i++) {
      // Pick a random ring
      const ring = rings[i];

      // Calculate x and y based on the ring's radius
      const x = ring.borderWidth;
      const y = Math.floor(Math.random() * 360);
      // Check if the new position is valid (not overlapping with other planets)
      planets[i].xTranslate = x - borderPx;
      planets[i].angle = y;
      planets[i].size = 35; // Fixed size for simplicity
      planets[i].ringId = ring.id;
    }
  });

  function handleWheel(event) {
    event.preventDefault();

    const mapElement = event.currentTarget;
    const rect = mapElement.getBoundingClientRect();

    // Calculate cursor position relative to the map element
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    if (scale < 1.25) {
      // Convert to percentages for transform-origin
      originX = (cursorX / rect.width) * 100;
      originY = (cursorY / rect.height) * 100;
    }

    // Adjust scale
    if (event.deltaY < 0) {
      scale = Math.min(scale + 0.1, 2); // Zoom in, max scale 2
    } else {
      scale = Math.max(scale - 0.1, 1); // Zoom out, min scale 1
    }
  }

  let isHoveringPlanet = false;
  let planetSeed = 0;
  let readyToSetZIndex = false;
  function handlePlanetHover(seed) {
    if (isHoveringPlanet) {
      console.log("Start timeout");
      setTimeout(() => {
        readyToSetZIndex = true;
        planetSeed = 0;
        console.log("End timeout");
      }, 300);
    } else {
      readyToSetZIndex = false;
      planetSeed = seed;
    }
    isHoveringPlanet = !isHoveringPlanet;
  }

  function getZoneRange(ringId) {
    const range = rings.find((ring) => ring.id === ringId)?.borderWidth;
    let nextRange = rings.find((ring) => ring.id === ringId + 1)?.borderWidth;

    if (!nextRange) {
      nextRange = rings.find((ring) => ring.id === rings.length - 1)?.borderWidth;
    }
    console.log(nextRange - range);
    return nextRange ? nextRange - range : 0;
  }

  function getZIndex(ring, planet) {
    if (isHoveringPlanet || !readyToSetZIndex) {
      if (planet && planet.seed === planetSeed) {
        return rings.length + 1;
      } else {
        return rings.length - ring.id;
      }
    }
    return rings.length - ring.id;
  }
</script>

<div class="map" tabindex="-1" role="button" onwheel={handleWheel} style="height: {size * 1.25}px;">
  <div class="content-wrapper" style="transform: scale({scale}); transform-origin: {originX}% {originY}%;">
    <div class="ring-content">
      <!-- Sun -->
      <div
        class="sun"
        style="width: 35px; height: 35px; background-color: yellow; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: {rings.length};"
      ></div>

      {#each rings as ring}
        {@const planet = planets.find((planet) => planet.ringId === ring.id)}

        <div
          class="ring-wrapper"
          style="width: {ring.borderWidth}px; height: {ring.borderWidth}px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: {getZIndex(
            ring,
            planet
          )};"
        >
          <!--  Planets -->
          {#if planet}
            <div class="planet-orbit" style="position: absolute; width: 100%; height: 100%; transform: rotate({planet.angle}deg); z-index: {getZIndex(ring, planet)};">
              <button
                aria-label="planet"
                onmouseenter={() => {
                  handlePlanetHover(planet.seed);
                }}
                onmouseleave={() => {
                  handlePlanetHover(planet.seed);
                }}
                class="planet"
                style="position: absolute; right: -15px; top: 50%; transform: translateY(-50%) scale({isHoveringPlanet && planetSeed === planet.seed
                  ? 5
                  : 1}); background-color: {planet.color}; color: #222222;
                  z-index: {isHoveringPlanet && planetSeed === planet.seed ? 100 : readyToSetZIndex ? 0 : 100};
                    transition: transform 0.3s ease-in-out;"
              >
              </button>
            </div>
          {/if}
          <!--  Rings -->
          <div
            class="ring-item {ring.id === rings.length ? 'planets-ring' : ''}"
            style="border-color: {ring.color}; width: {ring.borderWidth}px; position: absolute; border-radius: 50%; border-style: solid; border-width: 1px;"
          ></div>

          <!-- {#if ring.id > 1}
            <div
              class="zone"
              style="width: {ring.borderWidth}px; height: {ring.borderWidth}px; border: {getZoneRange(ring.id)}px solid {ring.color}; position: absolute; border-radius: 50%;"
            ></div>
          {/if} -->
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .map {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #222222;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ring-content {
    position: relative;
    height: 100%;
  }

  .ring-item {
    position: absolute;
    border: 2px solid transparent;
    border-radius: 100%;
    aspect-ratio: 1;
    height: auto;
    z-index: -1;
  }

  .ring-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .ring-item.planets-ring {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .zone {
    position: absolute;
    border-radius: 100%;
    opacity: 0.2;
  }

  .planet-orbit {
    pointer-events: none;
  }

  .planet {
    cursor: pointer;
    position: absolute;
    width: 35px;
    height: 35px;
    /* background-color: transparent !important; */
    border-radius: 50%;
    top: 50%;
    pointer-events: auto;
  }

  @keyframes orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .planet-info {
    position: absolute;
    padding: 1rem;
    min-width: max-content;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #222222;
    transform: translate(-50%, -225%);
    animation: pulse-opacity 0.3s ease-in;
  }

  .planet-info::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #56544d;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
