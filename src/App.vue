<script setup lang="ts">
import { ref } from 'vue';
import { Chain } from '@/model/chain';
import { Block } from '@/model/block';
import { Key } from '@/model/key';
import { Transaction } from '@/model/transaction';

const chain = ref(new Chain(1, 2));
const key = ref(new Key());
const newTransaction = ref(new Transaction());

function clickGenKey(): void {
  key.value.generate();
  // console.log(key.value.keyPair);
  console.log(key.value.privateKey);
  console.log(key.value.publicKey);
}

function clickAddTransaction(): void {
  if (key.value.keyPair === null) {
    console.error("密钥对不存在");
    return;
  }
  newTransaction.value.from = key.value.publicKey;
  newTransaction.value.sign(key.value.keyPair);
  chain.value.addTransaction(newTransaction.value);
  // console.log(newTransaction);
  console.log("添加交易成功");
}

function clickMine(): void {
  chain.value.mineTransactionPool(key.value.publicKey);
  // console.log(chain);
  console.log("挖矿成功");
  console.log(chain.value.getLastestBlock());
}

</script>

<template>
  <header>
  </header>

  <main>
    <div>
      <p>
        <input type="button" value="生成密钥对" @click="clickGenKey()"/><br/>
        <span>公钥：{{ key.publicKey }}</span><br/>
        <span>私钥：{{ key.privateKey }}</span>
      </p>
    </div>

    <div>
      <p>
        <form>
          <label>收款人公钥</label><br/>
          <input type="text" v-model="newTransaction.to"/><br/>
          <label>转账金额</label><br/>
          <input type="text" v-model="newTransaction.amount"/><br/>
          <input type="button" value="添加交易" @click="clickAddTransaction()"/>
        </form>
      </p>
    </div>

    <div>
      <p>
        <input type="button" value="挖矿" @click="clickMine()"/>
      </p>
    </div>

    <div>
      <p>
        <h1>区块链</h1>
        <span>难度：{{ chain.difficulty }}</span><br/>
        <span>挖矿奖励：{{ chain.minerReward }}</span><br/>
        <span>区块数量：{{ chain.blocks.length }}</span><br/>
        <span>交易池大小：{{ chain.transactionPool.length }}</span><br/>
        <h2>区块列表</h2>
        <p v-for="(block, index) in chain.blocks">
          <h3>区块{{ index }}</h3>
          <span>时间戳：{{ block.timestamp }}</span><br/>
          <span>区块哈希：{{ block.hash }}</span><br/>
          <span>上一个区块哈希：{{ block.previousHash }}</span><br/>
          <span>随机数：{{ block.nonce }}</span><br/>
          <h4>交易列表</h4>
          <p v-for="(transaction, index) in block.transactions">
            <span>发送方：{{ transaction.from }}</span><br/>
            <span>接收方：{{ transaction.to }}</span><br/>
            <span>金额：{{ transaction.amount }}</span><br/>
            <span>签名：{{ transaction.signature }}</span><br/>
            <span>时间戳：{{ transaction.timestamp }}</span>
          </p>
        </p>
        <h2>交易池列表</h2>
        <p v-for="(transaction, index) in chain.transactionPool">
          <span>发送方：{{ transaction.from }}</span><br/>
          <span>接收方：{{ transaction.to }}</span><br/>
          <span>金额：{{ transaction.amount }}</span><br/>
          <span>签名：{{ transaction.signature }}</span><br/>
          <span>时间戳：{{ transaction.timestamp }}</span>
        </p>
      </p>
    </div>

  </main>
</template>

<style scoped>

</style>
