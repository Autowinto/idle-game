<script>
  import { stats } from '$lib/stores/statistics.svelte'
</script>

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
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
</style>

<div class="w-full sidebar p-6 min-h-64">
  <h2 class="text-2xl font-bold mb-2">Player Statistics</h2>
  <div class="stats mt-4">
    {#each stats.values as stat}
      <div class="stat">
        <span class="label text-sm stat-labels">{stat.label}:</span>
        <span class="value text-lg font-semibold">{stat.value}</span>
      </div>
    {/each}
  </div>
</div>
