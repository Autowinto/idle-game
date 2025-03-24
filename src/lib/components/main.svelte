<script>
  import Panel from './panel.svelte'

  let children = $props()
  console.log(children)
</script>

<style>
  .content {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    height: fit-content;
    border-radius: 1rem;
    min-width: 70vw;
  }
</style>

<div class="content">
  <Panel />
  <div class="content-area"></div>
</div>
