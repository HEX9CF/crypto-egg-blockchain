import { ElMessage } from 'element-plus';
import { Transaction } from "@/models/transaction";
import { chicken, inventory, donateForm } from "@/stores/farm";
import { chain, key } from "@/stores/blockchain";

function clickGetFood(): void {
  inventory.value.food++;
  console.log("领取饲料成功");
  ElMessage.success('领取饲料成功');
}

function clickFeed(): void {
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

function clickCollectEgg(): void {
  if (key.value.keyPair === null) {
    console.error("密钥对不存在！");
    ElMessage.error('密钥对不存在！');
    return;
  }
  let collected: boolean = chicken.value.collectEgg();
  if (!collected) {
    console.error("收蛋失败，生蛋进度不足！");
    ElMessage.warning('收蛋失败，生蛋进度不足！');
    return;
  }
  inventory.value.egg++;
  chain.value.mineTransactionPool(key.value.publicKey);
  console.log("收蛋成功");
  ElMessage.success('收蛋成功');
}

function clickDonateEgg(): void {
  if (inventory.value.egg <= 0) {
    console.error("没有可捐赠的蛋，请先收蛋！");
    ElMessage.warning('没有可捐赠的蛋，请先收蛋！');
    return;
  }
  if (donateForm.value.amount <= 0) {
    console.error("捐赠数量必须大于0！");
    ElMessage.warning('捐赠数量必须大于0！');
    return;
  }
  if (donateForm.value.amount > inventory.value.egg) {
    console.error("捐赠数量不能大于库存数量！");
    ElMessage.warning('捐赠数量不能大于库存数量！');
    return;
  }
  if (key.value.keyPair === null) {
    console.error("密钥对不存在！");
    ElMessage.error('密钥对不存在！');
    return;
  }
  let transaction: Transaction = new Transaction(
      key.value.publicKey,
      "",
      donateForm.value.amount,
      "捐蛋",
  );
  transaction.sign(key.value.keyPair);
  chain.value.addTransaction(transaction);
  inventory.value.egg -= donateForm.value.amount;
  console.log("添加交易成功");
  ElMessage.success('添加交易成功');
}

export {
  clickGetFood,
  clickFeed,
  clickCollectEgg,
  clickDonateEgg
};