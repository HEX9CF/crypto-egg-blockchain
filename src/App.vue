<script setup lang="ts">
import { ref } from 'vue';
import { Chain } from '@/model/chain';
import { Key } from '@/model/key';
import { Transaction } from '@/model/transaction';

const chain = ref(new Chain(1, 2));
const key = ref(new Key());
const newTransaction = ref({
  to: "",
  amount: 0
});

function clickGenKey(): void {
  key.value.generate();
  // console.log(key.value.keyPair);
  console.log(key.value.privateKey);
  console.log(key.value.publicKey);
  console.log("生成密钥对成功");
}

function clickKeyFromPrivate() {
  key.value.fromPrivate(key.value.privateKey);
  console.log("通过私钥导入密钥对成功");
}

function clickClearKey() {
  key.value.clear();
  console.log("清空密钥对成功");
}

function clickValidateKey() {
  if (key.value.validate()) {
    console.log("密钥对有效");
  } else {
    console.error("密钥对无效");
  }
}

function clickAddTransaction(): void {
  if (key.value.keyPair === null) {
    console.error("密钥对不存在");
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
}

function clickMine(): void {
  chain.value.mineTransactionPool(key.value.publicKey);
  // console.log(chain);
  // console.log(chain.value.getLastestBlock());
  console.log("挖矿成功");
}

function clickValidate(): void {
  if (chain.value.validate()) {
    console.log("区块链有效");
  } else {
    console.error("区块链无效");
  }
}

</script>

<template>
  <header>
  </header>

  <main>
    <div>
      <p>
        <h1>密钥对管理</h1>
        <label>私钥：</label>
        <input type="text" v-model="key.privateKey"/><br/>
        <label>公钥：</label>
        <input type="text" v-model="key.publicKey"/><br/><br/>
        <input type="button" value="清空密钥对" @click="clickClearKey()"/>&nbsp;
        <input type="button" value="生成密钥对" @click="clickGenKey()"/>&nbsp;
        <input type="button" value="从私钥导入" @click="clickKeyFromPrivate()"/>&nbsp;
        <input type="button" value="验证密钥对" @click="clickValidateKey()"/>&nbsp;
      </p>
    </div>

    <hr/>

    <div>
      <p>
        <h1>交易</h1>
        <form>
          <label>收款人公钥：</label>
          <input type="text" v-model="newTransaction.to"/><br/>
          <label>转账金额：</label>
          <input type="text" v-model="newTransaction.amount"/><br/><br/>
          <input type="button" value="清空表单" @click="newTransaction.to = ''; newTransaction.amount = 0"/>&nbsp;
          <input type="button" value="添加交易" @click="clickAddTransaction()"/>&nbsp;
        </form>
      </p>
    </div>

    <hr/>

    <div>
      <p>
        <h1>区块链</h1>
        <span>难度：{{ chain.difficulty }}</span><br/>
        <span>挖矿奖励：{{ chain.minerReward }}</span><br/>
        <span>区块数量：{{ chain.blocks.length }}</span><br/>
        <span>交易池大小：{{ chain.transactionPool.length }}</span><br/>

        <p>
          <input type="button" value="挖矿" @click="clickMine()"/>&nbsp;
          <input type="button" value="验证区块链" @click="clickValidate()"/>
        </p>

        <div v-if="chain.blocks.length > 0">
          <h2>区块列表</h2>
          <p v-for="(block, index) in chain.blocks">
            <h3>区块{{ index }}</h3>
            <span>时间戳：{{ block.timestamp }}</span><br/>
            <span>区块哈希：{{ block.hash }}</span><br/>
            <span>上一个区块哈希：{{ block.previousHash }}</span><br/>
            <span>随机数：{{ block.nonce }}</span><br/>
            <div v-if="block.transactions.length > 0">
              <h4>交易列表</h4>
              <p v-for="(transaction, index) in block.transactions">
                <span>发送方：{{ transaction.from }}</span><br/>
                <span>接收方：{{ transaction.to }}</span><br/>
                <span>金额：{{ transaction.amount }}</span><br/>
                <span>签名：{{ transaction.signature }}</span><br/>
                <span>时间戳：{{ transaction.timestamp }}</span>
              </p>
            </div>
          </p>
          <div v-if="chain.transactionPool.length > 0">
            <h2>交易池列表</h2>
            <p v-for="(transaction, index) in chain.transactionPool">
              <span>发送方：{{ transaction.from }}</span><br/>
              <span>接收方：{{ transaction.to }}</span><br/>
              <span>金额：{{ transaction.amount }}</span><br/>
              <span>签名：{{ transaction.signature }}</span><br/>
              <span>时间戳：{{ transaction.timestamp }}</span>
            </p>
          </div>
        </div>
      </p>
    </div>
  </main>
</template>

<style scoped>

</style>
