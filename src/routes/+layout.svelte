<div class='container'>
    <h1 class='text-4xl font-bold mb-8'>The Eternal Cycle</h1>
    <div class='main gap-4'>
      <Stats />
      <div class='flex flex-col gap-4'>
        <nav>
          <a href='/'>Home</a>
          <a href='/inventory'>Inventory</a>
        </nav>
        <Story />
        {@render children()}
      </div>
    </div>
  </div>


<script>
    let { children } = $props()
    import Inventory from '$lib/components/Inventory.svelte'
    import Stats from '$lib/components/Stats.svelte'
    import Story from '$lib/components/Story.svelte'
    import '../app.css'
  </script>