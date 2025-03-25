<script>
  import { planetSystem } from "$lib/services/planetSystem";
  import { onMount } from "svelte";

  const planetCount = 10; // Number of planets
  let planets = [];

  let scale = 1;
  let originX = 50; // Default transform-origin X (percentage)
  let originY = 50; // Default transform-origin Y (percentage)

  function getWidth(index) {
    return 25 + index * 70;
  }

  let rings = [
    { id: 1, color: "#2F2F4C", borderWidth: getWidth(1) },
    { id: 2, color: "#3F3E65", borderWidth: getWidth(2) },
    { id: 3, color: "#474672", borderWidth: getWidth(3) },
    { id: 4, color: "#355834ff", borderWidth: getWidth(4) },
    { id: 5, color: "#9c9990ff", borderWidth: getWidth(5) },
    { id: 6, color: "#da4167ff", borderWidth: getWidth(6) },
    { id: 7, color: "#e0d8deff", borderWidth: getWidth(7) },
    { id: 8, color: "#56544D", borderWidth: getWidth(8) },
  ];

  let size = getWidth(rings.length);

  onMount(() => {
    planets = planetSystem.generateSystem(planetCount);
    const minDistance = 40; // Minimum distance between planets (in pixels)
    const maxAttempts = 1000 * 10; // Maximum number of attempts

    for (let i = 0; i < planets.length; i++) {
      // Pick a random ring
      let ring = rings[Math.floor(Math.random() * rings.length)];

      // Calculate random angle
      let angle = Math.random() * 2 * Math.PI + Math.PI;

      // Set distance to the ring's radius (half of its border width)
      let distance = ring.borderWidth / 1.1;

      // Calculate x and y based on the ring's radius
      let x = 50 + Math.abs(distance * Math.cos(angle));
      let y = 50 + Math.abs(distance * Math.sin(angle));

      // Check if the new position is valid (not overlapping with other planets)
      let isValidPosition = planets.every((otherPlanet, index) => {
        if (index >= i) return true; // Skip uninitialized planets
        const dx = x - otherPlanet.x;
        const dy = y - otherPlanet.y;
        const distanceBetween = Math.sqrt(dx * dx + dy * dy);
        return distanceBetween > minDistance;
      });

      let attempts = 0;
      while (!isValidPosition && attempts < maxAttempts) {
        attempts++;
        angle = Math.random() * 2 * Math.PI;

        // Recalculate x and y
        x = 50 + Math.abs(distance * Math.cos(angle));
        y = 50 + Math.abs(distance * Math.sin(angle));

        // Check if the new position is valid
        isValidPosition = planets.every((otherPlanet, index) => {
          if (index >= i) return true;
          const dx = x - otherPlanet.x;
          const dy = y - otherPlanet.y;
          const distanceBetween = Math.sqrt(dx * dx + dy * dy);
          return distanceBetween > minDistance;
        });

        if (attempts >= maxAttempts) {
          console.warn(
            `Failed to place planet ${i} after ${maxAttempts} attempts.`,
          );
          break;
        }
      }

      if (isValidPosition) {
        planets[i].x = x;
        planets[i].y = y;
        planets[i].size = 20; // Fixed size for simplicity
      } else {
        console.warn(
          `Failed to place planet ${i} after ${maxAttempts} attempts.`,
        );
      }
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
  function handlePlanetHover(seed) {
    isHoveringPlanet = !isHoveringPlanet;
    planetSeed = seed;
  }
</script>

<div
  class="map"
  tabindex="-1"
  role="button"
  onwheel={handleWheel}
  style="height: {size * 1.25}px;"
>
  <div
    class="content-wrapper"
    style="transform: scale({scale}); transform-origin: {originX}% {originY}%;"
  >
    <div class="ring-content">
      {#each rings as ring}
        <div
          class="ring-item {ring.id === rings.length ? 'planets-ring' : ''}"
          style="border-color: {ring.color}; width: {ring.borderWidth}px;"
        ></div>
        {#if ring.id === rings.length}
          <div
            class="ring-item {ring.id === rings.length ? 'planets-ring' : ''}"
            style="border-color: {ring.color}; width: {ring.borderWidth}px;"
          >
            <div class="planets">
              {#each planets as planet}
                {#if planetSeed === planet.seed && isHoveringPlanet}
                  <div
                    class="planet-info"
                    style="left: {planet.x}px; top: {planet.y}px; background-color: {planet.color};"
                  >
                    <h2 class="text-sm">{planet.name}</h2>
                    <p>{planet.description}</p>
                  </div>
                {/if}
                <button
                  aria-label="planet"
                  onmouseenter={() => {
                    handlePlanetHover(planet.seed);
                  }}
                  onmouseleave={() => {
                    handlePlanetHover(planet.seed);
                  }}
                  class="planet"
                  style="left: {planet.x}px; top: {planet.y}px; background-color: {planet.color};"
                >
                </button>
              {/each}
            </div>
          </div>
        {/if}
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
    z-index: 100;
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ring-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .ring-item {
    position: absolute;
    border: 2px solid transparent;
    border-radius: 100%;
    aspect-ratio: 1;
    height: auto;
  }

  .ring-item.planets-ring {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .planets {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .planet {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .planet-info {
    position: absolute;
    padding: 1rem;
    min-width: max-content;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #222222;
    z-index: 1000;
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

  .planet:hover {
    transform: translate(-50%, -50%) scale(5);
    animation: pulse-opacity 0.3s ease-in;
  }

  @keyframes pulse-opacity {
    0% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
</style>
