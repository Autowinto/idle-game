<script>
  import { PanelItems } from '$lib/types'
  import { page } from '$app/state'
  import { getPanelClass } from '$lib/stores/panel.svelte'
</script>

<style>
  .panel-bar {
    background-color: var(--space-cadet-shade-02);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: space-between;

    .panel-item {
      min-width: 100px;
      padding: 0.5rem 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: var(--space-cadet-shade-01);
      }
    }

    .panel-item.active {
      background-color: #2f2f4c;
    }
  }
</style>

<div class="panel-bar p-4">
  <a
    href="game/story"
    class={getPanelClass(PanelItems.STORY, page.url.pathname) +
      'text-lg font-bold panel-item'}>Story</a
  >
  <a
    href="game/inventory"
    class={getPanelClass(PanelItems.INVENTORY, page.url.pathname) +
      'text-lg font-bold panel-item'}>Inventory</a
  >
  <a
    href="game/map"
    class={getPanelClass(PanelItems.MAP, page.url.pathname) +
      'text-lg font-bold panel-item'}>Map</a
  >
  <a
    href="game/quests"
    class={getPanelClass(PanelItems.QUESTS, page.url.pathname) +
      'text-lg font-bold panel-item'}>Quests</a
  >
  <a
    href="game/settings"
    class={getPanelClass(PanelItems.SETTINGS, page.url.pathname) +
      'text-lg font-bold panel-item'}>Settings</a
  >
</div>
