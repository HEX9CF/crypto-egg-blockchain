import { Transaction } from "@/models/transaction";
import { message } from '@/stores/message';
import { chicken, inventory } from "@/stores/farm";
import { chain, key } from "@/stores/blockchain";

function clickGetFood(): void {
  inventory.value.food++;
  console.log("领取饲料成功");
  message.value.farm = "领取饲料成功";
}

function clickFeed(): void {
  if (inventory.value.food <= 0) {
    console.error("饲料不足，请先领取饲料！");
    message.value.farm = "饲料不足，请先领取饲料！";
    return;
  }
  let delta: number = chicken.value.feed();
  if (delta === 0) {
    console.error("喂食失败，生蛋进度已满！");
    message.value.farm = "喂食失败，生蛋进度已满！";
    return;
  }
  inventory.value.food--;
  console.log("喂食成功，进度增加：" + delta + "%");
  message.value.farm = "喂食成功，进度增加：" + delta + "%";
}

function clickCollectEgg(): void {
  if (key.value.keyPair === null) {
    console.error("密钥对不存在！");
    message.value.farm = "密钥对不存在！";
    return;
  }
  let collected: boolean = chicken.value.collectEgg();
  if (!collected) {
    console.error("收蛋失败，生蛋进度不足！");
    message.value.farm = "收蛋失败，生蛋进度不足！";
    return;
  }
  inventory.value.egg++;
  chain.value.mineTransactionPool(key.value.publicKey);
  console.log("收蛋成功");
  message.value.farm = "收蛋成功";
}

function clickDonateEgg(): void {
  if (inventory.value.egg <= 0) {
    console.error("没有可捐赠的蛋，请先收蛋！");
    message.value.farm = "没有可捐赠的蛋，请先收蛋！";
    return;
  }
  if (key.value.keyPair === null) {
    console.error("密钥对不存在！");
    message.value.transaction = "密钥对不存在！";
    return;
  }
  let transaction: Transaction = new Transaction(
      key.value.publicKey,
      "",
      inventory.value.egg,
      "捐蛋"
  );
  transaction.sign(key.value.keyPair);
  chain.value.addTransaction(transaction);
  inventory.value.egg = 0;
  console.log("添加交易成功");
  message.value.farm = "添加交易成功";
}

export {
  clickGetFood,
  clickFeed,
  clickCollectEgg,
  clickDonateEgg
};