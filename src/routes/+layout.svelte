<script>
  let { children } = $props();
  import Panel from "$lib/components/Panel.svelte";
  import Stats from "$lib/components/Stats.svelte";
  import "../app.css";
</script>

<div class="container">
  <h1 class="text-4xl font-bold mb-8">The Eternal Cycle</h1>
  <div class="main gap-4">
    <Stats />
    <div class="flex flex-col gap-4">
      <Panel />
      {@render children()}
    </div>
  </div>
</div>
