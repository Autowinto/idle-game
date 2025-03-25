<script>
  import Panel from "./Topbar.svelte";
</script>

<div class="content">
  <Panel />
  <div class="content-area"></div>
</div>

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
