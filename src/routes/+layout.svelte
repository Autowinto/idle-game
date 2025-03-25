<script>
  import Sidebar from "$lib/components/Sidebar.svelte";

  let { children } = $props();
  import Topbar from "$lib/components/Topbar.svelte";
  import "../app.css";
</script>

<div class="container">
  <div class="h-screen">
    <Topbar />
    <div class="flex h-[calc(100vh-64px)]">
      <Sidebar />
      <div class="m-4 w-full">
        {@render children()}
      </div>
    </div>
  </div>
</div>
