
interface GameStat {
    value: number;
    label: string;
    percentage?: number;
    till_next?: number;
}

export class Statistics {
    private stats = $state<Record<string, GameStat>>({});

    setStats(stats: Record<string, GameStat>) {
        this.stats = stats;
    }

    get values() {
        return Object.values(this.stats);
    }

}

export const stats = new Statistics();

stats.setStats({
    lvl: { value: 1, label: "lvl", till_next: 100 },
    xp: { value: 0, label: "xp" },
    hp: { value: 100, label: "hp" },
    mp: { value: 50, label: "mp" },
    gold: { value: 0, label: "gold" },
    kills: { value: 0, label: "kills" },
    deaths: { value: 0, label: "deaths" },
    wins: { value: 0, label: "wins" },
})



