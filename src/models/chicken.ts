class Chicken {
    progress: number = 0; // 生蛋进度

    constructor() {
        this.progress = 0;
    }

    // 喂食
    feed(): number {
        if (this.progress >= 100) {
            return 0;
        }

        let delta: number = Math.floor(Math.random() * 100 / 2);
        this.progress += delta;

        if (this.progress >= 100) {
            this.progress = 100;
        }

        return delta;
    }

    // 收蛋
    collectEgg(): boolean {
        if (this.progress < 100) {
            return false;
        }
        this.progress = 0;
        return true;
    }
}

export { Chicken };