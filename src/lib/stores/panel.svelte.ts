// import { writable, type Unsubscriber, type Writable } from "svelte/store";
// import Story from '$lib/components/story.svelte'
// import Inventory from '$lib/components/inventory.svelte'
// import Map from '$lib/components/map.svelte'
// import Quests from '$lib/components/quests.svelte'
// import Settings from '$lib/components/settings.svelte'
// import { PanelItems } from "$lib/types";

import Panel from "$lib/components/panel.svelte";
import type { PanelItems } from "$lib/types";
import { PanelItems as PanelEnum }  from "$lib/types";


// export class PanelSystem {
//     private tabStore = writable(PanelItems.STORY);
//     private activeTab: PanelItems = PanelItems.STORY;
//     private callbacks: ((value: PanelItems) => void)[] = [];

//     constructor() {
//         this.tabStore.subscribe((value) => {  
//             this.activeTab = value;
//             this.callbacks.forEach((callback) => callback(value));
//         }
//         );
//     }

//     public setActiveTab(panelName: PanelItems): void {
//         this.tabStore.set(panelName);
//     }

//     public get activePanel(): PanelItems {
//         return this.activeTab;
//     }

//     get store(): Writable<PanelItems> {
//         return this.tabStore;
//     }

//     public subscribe(callback: (item: PanelItems) => void): void {
//         this.callbacks.push(callback);
//     }
// }

// export const panelSystem = new PanelSystem();
// export const navbarComponents: Record<string, any> = {
//     "story": Story,
//     "inventory": Inventory,
//     "map": Map,
//     "quests": Quests,
//     "settings": Settings
//   }
export function getPanelClass(panel: PanelItems, activeTab: string): string {
    return panel === activeTab ? "active " : "";
}

