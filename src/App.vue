<script setup lang="ts">
import {
  clickGenKey,
  clickKeyFromPrivate,
  clickClearKey,
  clickValidateKey,
  clickAddTransaction,
  clickMine,
  clickValidateChain
} from '@/controllers/blockchain';

import {
  clickGetFood,
  clickFeed,
  clickCollectEgg,
  clickDonateEgg
} from '@/controllers/farm';

import { message } from '@/stores/message';
import { inventory, chicken } from '@/stores/farm';
import { chain, key, newTransaction } from '@/stores/blockchain';
</script>

<template>
  <header>
  </header>

  <main>
    <div>
      <h1>养鸡场</h1>
      <span>生蛋进度：{{ chicken.progress }}%</span><br/>
      <span>饲料库存：{{ inventory.food }}</span><br/>
      <span>虚拟蛋库存：{{ inventory.egg }}</span><br/><br/>
      <input type="button" value="领取饲料" @click="clickGetFood()"/>&nbsp;
      <input type="button" value="喂食" @click="clickFeed()"/>&nbsp;
      <input type="button" value="收蛋" @click="clickCollectEgg()"/>&nbsp;
      <input type="button" value="捐蛋" @click="clickDonateEgg()"/>
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
          <input type="text" v-model="newTransaction.amount"/><br/>
          <label>交易信息：</label>
          <input type="text" v-model="newTransaction.message"/><br/><br/>
          <input type="button" value="清空表单" @click="newTransaction.to = ''; newTransaction.amount = 0; "/>&nbsp;
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
          <div v-for="(block, index) in chain.blocks">
            <h3>区块{{ index }}</h3>
            <span>时间戳：{{ block.timestamp }} ({{ new Date(block.timestamp).toLocaleString() }})</span><br/>
            <span>区块哈希：{{ block.hash }}</span><br/>
            <span>上一个区块哈希：{{ block.previousHash }}</span><br/>
            <span>随机数：{{ block.nonce }}</span><br/>
            <div v-if="block.transactions.length > 0">
              <h4>交易列表</h4>
              <div v-for="(transaction, index) in block.transactions">
                <span>时间戳：{{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
                <span>发送方：{{ transaction.from }}</span><br/>
                <span>接收方：{{ transaction.to }}</span><br/>
                <span>金额：{{ transaction.amount }}</span><br/>
                <span>交易信息：{{ transaction.message }}</span><br/>
                <span>签名：{{ transaction.signature }}</span><br/><br/>
              </div>
            </div>
            <br/>
          </div>
          <div v-if="chain.transactionPool.length > 0">
            <h2>交易池列表</h2>
            <div v-for="(transaction, index) in chain.transactionPool">
              <span>时间戳：{{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
              <span>发送方：{{ transaction.from }}</span><br/>
              <span>接收方：{{ transaction.to }}</span><br/>
              <span>金额：{{ transaction.amount }}</span><br/>
              <span>交易信息：{{ transaction.message }}</span><br/>
              <span>签名：{{ transaction.signature }}</span><br/><br/>
            </div>
          </div>
        </div>
    </div>
  </main>
</template>

<style scoped>

</style>
