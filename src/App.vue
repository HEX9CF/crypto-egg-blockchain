<script setup lang="ts">
import { ref } from 'vue';
import { Chain } from '@/model/chain';
import { Key } from '@/model/key';
import { Transaction } from '@/model/transaction';
import { Chicken } from '@/model/chicken';

const chain = ref(new Chain(1, 2));
const key = ref(new Key());
const newTransaction = ref({
  to: "",
  amount: 0
});
const chicken = ref(new Chicken());
const inventory = ref({
  food: 0,
  egg: 0
})
const message = ref({
  key: "",
  transaction: "",
  block: "",
  farm: ""
});

function clickGenKey(): void {
  key.value.generate();
  // console.log(key.value.keyPair);
  console.log(key.value.privateKey);
  console.log(key.value.publicKey);
  console.log("生成密钥对成功");
  message.value.key = "生成密钥对成功";
}

function clickKeyFromPrivate() {
  if (key.value.privateKey === "") {
    console.error("私钥不能为空！");
    message.value.key = "私钥不能为空！";
    return;
  }
  key.value.fromPrivate(key.value.privateKey);
  console.log("通过私钥导入密钥对成功");
  message.value.key = "通过私钥导入密钥对成功";
}

function clickClearKey() {
  key.value.clear();
  console.log("清空密钥对成功");
}

function clickValidateKey() {
  if (key.value.validate()) {
    console.log("密钥对有效");
    message.value.key = "密钥对有效";
  } else {
    console.error("密钥对无效！");
    message.value.key = "密钥对无效！";
  }
}

function clickAddTransaction(): void {
  if (key.value.keyPair === null) {
    console.error("密钥对不存在！");
    message.value.transaction = "密钥对不存在！";
    return;
  }
  if (newTransaction.value.to === "") {
    console.error("收款人公钥不能为空！");
    message.value.transaction = "收款人公钥不能为空！";
    return;
  }
  if (newTransaction.value.amount <= 0) {
    console.error("转账金额必须大于0！");
    message.value.transaction = "转账金额必须大于0！";
    return;
  }
  let transaction: Transaction = new Transaction(
      key.value.publicKey,
      newTransaction.value.to,
      newTransaction.value.amount
  );
  transaction.sign(key.value.keyPair);
  chain.value.addTransaction(transaction);
  console.log("添加交易成功");
  message.value.transaction = "添加交易成功";
}

function clickMine(): void {
  chain.value.mineTransactionPool(key.value.publicKey);
  // console.log(chain);
  // console.log(chain.value.getLastestBlock());
  console.log("挖矿成功");
  message.value.block = "挖矿成功";
}

function clickValidateChain(): void {
  if (chain.value.validate()) {
    console.log("区块链有效");
    message.value.block = "区块链有效";
  } else {
    console.error("区块链无效！");
    message.value.block = "区块链无效！";
  }
}

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
  inventory.value.food--;
  let delta: number = chicken.value.feed();
  console.log("喂食成功，进度增加：" + delta + "%");
  message.value.farm = "喂食成功，进度增加：" + delta + "%";
}

function clickCollectEgg(): void {
  if (chicken.value.egg <= 0) {
    console.error("没有可收取的鸡蛋，请先喂食！");
    message.value.farm = "没有可收取的鸡蛋，请先喂食！";
    return;
  }
  inventory.value.egg += chicken.value.collectEgg();
  console.log("收蛋成功");
  message.value.farm = "收蛋成功";
}

</script>

<template>
  <header>
  </header>

  <main>
    <div>
      <h1>养鸡场</h1>
      <span>生蛋进度：{{ chicken.progress }}%</span><br/>
      <span>可收取鸡蛋：{{ chicken.egg }}</span><br/><br/>
      <span>饲料库存：{{ inventory.food }}</span><br/>
      <span>鸡蛋库存：{{ inventory.egg }}</span><br/><br/>
      <input type="button" value="领取饲料" @click="clickGetFood()"/>&nbsp;
      <input type="button" value="喂食" @click="clickFeed()"/>&nbsp;
      <input type="button" value="收蛋" @click="clickCollectEgg()"/>&nbsp;
      <p v-if="message.farm !== ''">
        <span>{{ message.farm }}</span>
      </p>
    </div>

    <hr/>

    <div>
        <h1>钱包</h1>
        <label>私钥：</label>
        <input type="text" v-model="key.privateKey"/><br/>
        <label>公钥：</label>
        <input type="text" v-model="key.publicKey"/><br/><br/>
        <input type="button" value="清空密钥对" @click="clickClearKey()"/>&nbsp;
        <input type="button" value="生成密钥对" @click="clickGenKey()"/>&nbsp;
        <input type="button" value="从私钥导入" @click="clickKeyFromPrivate()"/>&nbsp;
        <input type="button" value="验证密钥对" @click="clickValidateKey()"/>&nbsp;
        <p v-if="message.key !== ''">
          <span>{{ message.key }}</span>
        </p>
    </div>

    <hr/>

    <div>
        <h1>交易</h1>
        <form>
          <label>收款人公钥：</label>
          <input type="text" v-model="newTransaction.to"/><br/>
          <label>转账金额：</label>
          <input type="text" v-model="newTransaction.amount"/><br/><br/>
          <input type="button" value="清空表单" @click="newTransaction.to = ''; newTransaction.amount = 0"/>&nbsp;
          <input type="button" value="添加交易" @click="clickAddTransaction()"/>&nbsp;
        </form>
        <p v-if="message.transaction !== ''">
          <span>{{ message.transaction }}</span>
        </p>
    </div>

    <hr/>

    <div>
        <h1>区块链</h1>
        <span>难度：{{ chain.difficulty }}</span><br/>
        <span>挖矿奖励：{{ chain.minerReward }}</span><br/>
        <span>区块数量：{{ chain.blocks.length }}</span><br/>
        <span>交易池大小：{{ chain.transactionPool.length }}</span><br/><br/>

        <div>
          <input type="button" value="挖矿" @click="clickMine()"/>&nbsp;
          <input type="button" value="验证区块链" @click="clickValidateChain()"/>
          <p v-if="message.block !== ''">
            <span>{{ message.block }}</span>
          </p>
        </div>

        <div v-if="chain.blocks.length > 0">
          <h2>区块列表</h2>
          <p v-for="(block, index) in chain.blocks">
            <h3>区块{{ index }}</h3>
            <span>时间戳：{{ block.timestamp }} ({{ new Date(block.timestamp).toLocaleString() }})</span><br/>
            <span>区块哈希：{{ block.hash }}</span><br/>
            <span>上一个区块哈希：{{ block.previousHash }}</span><br/>
            <span>随机数：{{ block.nonce }}</span><br/>
            <div v-if="block.transactions.length > 0">
              <h4>交易列表</h4>
              <p v-for="(transaction, index) in block.transactions">
                <span>时间戳：{{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
                <span>发送方：{{ transaction.from }}</span><br/>
                <span>接收方：{{ transaction.to }}</span><br/>
                <span>金额：{{ transaction.amount }}</span><br/>
                <span>签名：{{ transaction.signature }}</span><br/>
              </p>
            </div>
          </p>
          <div v-if="chain.transactionPool.length > 0">
            <h2>交易池列表</h2>
            <p v-for="(transaction, index) in chain.transactionPool">
              <span>时间戳：{{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
              <span>发送方：{{ transaction.from }}</span><br/>
              <span>接收方：{{ transaction.to }}</span><br/>
              <span>金额：{{ transaction.amount }}</span><br/>
              <span>签名：{{ transaction.signature }}</span><br/>
            </p>
          </div>
        </div>
    </div>
  </main>
</template>

<style scoped>

</style>
