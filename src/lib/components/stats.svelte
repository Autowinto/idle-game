<script>
  import { stats } from "$lib/stores/statistics.svelte";
  import Card from "./Card.svelte";
</script>

<Card>
  <h2 class="text-2xl font-bold mb-2">Player Statistics</h2>
  <div class="stats mt-4">
    {#each stats.values as stat}
      <div class="stat">
        <span class="label text-sm stat-labels">{stat.label}:</span>
        <span class="value text-lg font-semibold">{stat.value}</span>
      </div>
    {/each}
  </div>
</Card>

<style>
  .stat {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;
    .stat-labels {
      color: var(--lavender-blush);
    }
  }

  .sidebar {
    max-height: fit-content;
    background-color: var(--space-cadet-shade-02);
    max-width: 30vw;
  }
</style>
