<script lang="ts">
  import { planetSystem } from "$lib/services/planetSystem";
  import { onMount } from "svelte";
  import Planet from "$lib/components/map/Planet.svelte";
  import type { Planet as PlanetType } from "$lib/types/map";

  const planetCount = 5; // Number of planets
  let planets: PlanetType[] = [];

  let scale = 1;
  let originX = 50; // Default transform-origin X (percentage)
  let originY = 50; // Default transform-origin Y (percentage)
  function getWidth(index: number) {
    const baseWidth = 25;
    const spacing = 75; // Additional spacing between rings
    return Math.ceil((baseWidth + index * (baseWidth + spacing)) / 2) * 2;
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
      planets[i].size = 48; // Fixed size for simplicity
      planets[i].ringId = ring.id;
      planets[i].zIndex = 0;
    }
  });

  // Function for handling zoom in / out on mouse wheel on the map
  // Prevent default behavior of the wheel event
  function handleWheel(event: WheelEvent) {
    event.preventDefault();

    const mapElement = event.currentTarget as HTMLDivElement; // Get the map element

    if (!mapElement) return; // Ensure the map element is available
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
      <!-- Sun -->
      <div class="sun" style="z-index: {rings.length};"></div>

      {#each rings as ring}
        {@const planet = planets.find((planet) => planet.ringId === ring.id)}

        <div
          class="ring-wrapper"
          id="ring-{ring.id}"
          style="width: {ring.borderWidth}px; height: {ring.borderWidth}px; transform: translate(-50%, -50%); z-index: {rings.length -
            ring.id};"
        >
          <!--  Planets -->
          {#if planet}
            <Planet {planet} {ring} ringsSize={rings.length}></Planet>
          {/if}

          <!--  Rings -->
          <div
            class="ring-item {ring.id === rings.length ? 'planets-ring' : ''}"
            style="border-color: {ring.color}; width: {ring.borderWidth}px; position: absolute; border-radius: 50%; border-style: solid; border-width: 1px;"
          ></div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .sun {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 35px;
    height: 35px;
    background-color: yellow;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .map {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
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

  @keyframes orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
