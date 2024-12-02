import { ElMessage } from 'element-plus';
import { chicken, inventory } from "@/stores/farm";
import { chain } from "@/stores/blockchain";
import { wallet } from "@/stores/wallet";

export function clickGetFood(): void {
  inventory.value.food++;
  console.log("领取饲料成功");
  ElMessage.success('领取饲料成功');
}

export function clickFeed(): void {
  if (inventory.value.food <= 0) {
    console.error("饲料不足，请先领取饲料！");
    ElMessage.warning('饲料不足，请先领取饲料！');
    return;
  }
  let delta: number = chicken.value.feed();
  if (delta === 0) {
    console.error("喂食失败，生蛋进度已满！");
    ElMessage.warning('喂食失败，生蛋进度已满！');
    return;
  }
  inventory.value.food--;
  console.log("喂食成功，进度增加：" + delta + "%");
  ElMessage.success('喂食成功，进度增加：' + delta + '%');
}

export async function clickCollectEgg(): Promise<void> {
  if (wallet.value.keyPair === null) {
    console.error("密钥对不存在！");
    ElMessage.error('密钥对不存在！');
    return;
  }
  if (!chicken.value.collectEgg()) {
    console.error("收蛋失败，生蛋进度不足！");
    ElMessage.warning('收蛋失败，生蛋进度不足！');
    return;
  }
  await chain.value.mineTransactionPool(wallet.value.publicKey).then((val: boolean): void => {
      if (!val) {
        console.error("收蛋失败！");
        ElMessage.error('收蛋失败！');
        return;
      }
      wallet.value.updateBalance();
      console.log("收蛋成功");
      ElMessage.success('收蛋成功');
    }
  );
}
