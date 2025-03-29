<script>
  const { planet, ring, ringsSize } = $props();

  let isHoveringPlanet = $state(false);
  let planetSeed = 0;
  let timeoutForPlanet = null;
  let lastPlanetSeed = 0;

  function handlePlanetHoverOut(planet, ring) {
    const seed = planet.seed;

    planetSeed = 0;
    const planetElement = document.getElementById(`planet-${seed}`);
    if (planetElement) {
      planet.zIndex = 0;
      planetElement.style.setProperty(
        "transform",
        `translateY(-50%) scale(1) rotate(${planet.angle}deg)`,
      );
    }
    isHoveringPlanet = false;
    setZIndex(ring, planet);
    lastPlanetSeed = seed;
  }

  function handlePlanetHover(planet, ring) {
    const seed = planet.seed;
    const planetElement = document.getElementById(`planet-${seed}`);
    planetSeed = seed;
    if (planetElement) {
      planet.zIndex = 100;
      planetElement.style.setProperty(
        "transform",
        `translateY(-50%) scale(2) rotate(${360 - planet.angle}deg)`,
      );
    }
    isHoveringPlanet = true;
    setZIndex(ring, planet);
    lastPlanetSeed = seed;
  }

  function setZIndex(ring, planet) {
    const ringElement = document.getElementById(`ring-${ring.id}`);
    if (isHoveringPlanet && ringElement) {
      if (timeoutForPlanet && lastPlanetSeed === planet.seed) {
        clearTimeout(timeoutForPlanet);
      }
      ringElement.style.setProperty("z-index", `${ringsSize + 1}`);
    } else if (ringElement) {
      timeoutForPlanet = setTimeout(() => {
        ringElement.style.setProperty("z-index", `${ringsSize - ring.id}`);
      }, 200);
    }
  }
</script>

<div
  class="planet-orbit"
  style="position: absolute; width: 100%; height: 100%; transform: rotate({planet.angle}deg); z-index: {ringsSize -
    ring.id};
  --start-angle: {planet.angle}deg;"
>
  <!--

Right property is set to be negative to center the planet in the orbit
The top property is set to 50% to center the planet vertically
The transform property is set to translateY(-50%) to center the planet vertically

-->

  <div
    aria-label="planet"
    id="planet-{planet.seed}"
    onmouseenter={() => {
      handlePlanetHover(planet, ring);
    }}
    onmouseleave={() => {
      handlePlanetHoverOut(planet, ring);
    }}
    class="planet"
    style="right: -{planet.size /
      2}px; background-color: {planet.color}; color: #222222;
      transition: transform 0.3s ease-in-out; z-index: {planet.zIndex}; width: {planet.size}px; height: {planet.size}px; transform: translateY(-50%) rotate({planet.angle}deg);"
  >
    {#if isHoveringPlanet}
      <div
        class="planet-info"
        style="transform: rotate(-{planet.angle}deg); background-color: {planet.color}; left: 50%; transform: translate(-50%, -120%); z-index: {planet.zIndex +
          1};"
      >
        <div class="text-sm">{planet.name}</div>
      </div>
    {/if}
    <img
      src={planet.asset}
      alt={planet.name}
      style="width: 100%; height: 100%; border-radius: 50%; border: 1px solid {planet.color};"
    />
  </div>
</div>

<style>
  .planet-orbit {
    pointer-events: none;
    transform: rotate(var(--start-angle, 0deg));
  }

  .planet {
    cursor: pointer;
    position: absolute;
    /* background-color: transparent !important; */
    border-radius: 50%;
    top: 50%;
    pointer-events: auto;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .planet-info {
    position: absolute;
    padding: 1rem;
    min-width: max-content;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #222222;
    transform: translate(-50%, -100%);
    animation: pulse-opacity 0.3s ease-in;
  }

  .planet-info::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid var(--lavender-blush);
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.8;
  }
</style>
