<script>
  import { page } from "$app/state";
  import { getPanelClass } from "$lib/stores/panel.svelte";
  import { PanelItems } from "$lib/types";
  import SettingsIcon from "virtual:icons/lucide/settings";
  import VerticalDivider from "./VerticalDivider.svelte";
</script>

<div class="panel-bar h-16 items-center">
  <div class="w-64 flex flex-col items-center justify-center">
    LEVEL X
    <progress class="rounded-xl text-green-500" max="100" value="70" />
  </div>
  <VerticalDivider />
  <a
    href="/character"
    class={`${getPanelClass(
      PanelItems.STORY,
      page.url.pathname,
    )}text-lg font-bold panel-item`}>Character</a
  >
  <a
    href="/inventory"
    class={`${getPanelClass(
      PanelItems.INVENTORY,
      page.url.pathname,
    )}text-lg font-bold panel-item`}>Inventory</a
  >
  <a
    href="/map"
    class={`${getPanelClass(
      PanelItems.MAP,
      page.url.pathname,
    )}text-lg font-bold panel-item`}>Map</a
  >
  <a
    href="/quests"
    class={`${getPanelClass(
      PanelItems.QUESTS,
      page.url.pathname,
    )}text-lg font-bold panel-item`}>Quests</a
  >
  <div class="flex h-full items-center ml-auto mr-2">
    <VerticalDivider />

    <a class="hover:bg-black text-2xl" href="/settings">
      <SettingsIcon />
    </a>
  </div>
</div>

<style>
  .panel-bar {
    background-color: var(--space-cadet-shade-02);
    display: flex;

    .panel-item {
      text-align: center;
      max-width: 120px;
      padding: 1rem;
      cursor: pointer;
      &:hover {
        background-color: #4e4e7e;
      }
    }

    .panel-item.active {
      background-color: --bg-gray-800;
    }
  }
</style>
