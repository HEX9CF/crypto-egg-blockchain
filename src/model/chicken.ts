class Chicken {
    progress: number = 0; // 生蛋进度
    egg: number = 0; // 鸡蛋数量

    constructor() {
        this.progress = 0;
        this.egg = 0;
    }

    // 喂食
    feed(): number {
        let delta: number = Math.floor(Math.random() * 100 / 2);
        this.progress += delta;
        console.log('进度增加：' + delta);

        // 生蛋
        if (this.progress >= 100) {
            while (this.progress >= 100) {
                this.egg++;
                this.progress -= 100;
            }
            console.log('生蛋：' + this.egg);
        }

        return delta;
    }

    // 收蛋
    collectEgg(): void {
        console.log('收蛋：' + this.egg);
        this.egg = 0;
    }
}

export { Chicken };