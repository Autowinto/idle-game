import type { PanelItems } from "$lib/types";
export function getPanelClass(panel: PanelItems, activeTab: string): string {
    return panel === activeTab.split('/')[1] ? "active " : "";
}

