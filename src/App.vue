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
import { inventory, chicken, donateForm } from '@/stores/farm';
import { chain, key, transactionForm } from '@/stores/blockchain';

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
</script>

<template>
  <header>
  </header>

  <main>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>虚拟养鸡场</span>
        </div>
      </template>
      <el-alert v-if="message.farm !== ''" :title="message.farm" type="info" show-icon></el-alert><br/>
      <el-progress type="dashboard" :percentage="chicken.progress">
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">生蛋进度</span>
        </template>
      </el-progress>
      <el-row>
        <el-col :span="4">
          <el-statistic title="饲料库存" :value="inventory.food"></el-statistic>
        </el-col>
        <el-col :span="4">
          <el-statistic title="加密蛋库存" :value="inventory.egg"></el-statistic>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="2">
          <el-button type="primary" @click="clickGetFood">领取饲料</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="clickFeed">喂食</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="clickCollectEgg">收蛋</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="8">
          <el-form>
            <el-form-item label="捐蛋数量">
              <el-input v-model="donateForm.amount"></el-input>
            </el-form-item>
            <el-button type="primary" @click="clickDonateEgg">捐蛋</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <br/>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>钱包</span>
        </div>
      </template>
      <el-alert v-if="message.key !== ''" :title="message.key" type="info" show-icon></el-alert><br/>
      <el-form>
        <el-form-item label="私钥">
          <el-input v-model="key.privateKey"></el-input>
        </el-form-item>
        <el-form-item label="公钥">
          <el-input v-model="key.publicKey"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickClearKey">清空密钥对</el-button>
          <el-button type="primary" @click="clickGenKey">生成密钥对</el-button>
          <el-button type="primary" @click="clickKeyFromPrivate">从私钥导入</el-button>
          <el-button type="primary" @click="clickValidateKey">验证密钥对</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <br/>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>交易</span>
        </div>
      </template>
      <el-alert v-if="message.transaction !== ''" :title="message.transaction" type="info" show-icon></el-alert><br/>
      <el-form>
        <el-form-item label="收款人公钥">
          <el-input v-model="transactionForm.to"></el-input>
        </el-form-item>
        <el-form-item label="转账金额">
          <el-input v-model="transactionForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="交易信息">
          <el-input v-model="transactionForm.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="transactionForm.to = ''; transactionForm.amount = 0; transactionForm.message = '';">清空表单</el-button>
          <el-button type="primary" @click="clickAddTransaction">添加交易</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <br/>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>区块链</span>
        </div>
      </template>
      <el-alert v-if="message.block !== ''" :title="message.block" type="info" show-icon style="margin-top: 20px;"></el-alert><br/>
      <el-row>
        <el-col :span="6">
          <el-statistic title="难度" :value="chain.difficulty"></el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="挖矿奖励" :value="chain.minerReward"></el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="区块数量" :value="chain.blocks.length"></el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="交易池大小" :value="chain.transactionPool.length"></el-statistic>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="2">
          <el-button type="primary" @click="clickValidateChain">验证区块链</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="clickMine">挖矿</el-button>
        </el-col>
      </el-row>
      <div v-if="chain.blocks.length > 0" style="margin-top: 20px;">
        <h2>区块列表</h2>
        <el-timeline>
          <el-timeline-item v-for="(block, index) in chain.blocks" :timestamp="new Date(block.timestamp).toLocaleString()" placement="top">
            <el-card>
              <h3>区块{{ index + 1 }}</h3>
              <p>
                <span>时间戳: {{ block.timestamp }} ({{ new Date(block.timestamp).toLocaleString() }})</span><br/>
                <span>区块哈希: {{ block.hash }}</span><br/>
                <span>上一个区块哈希: {{ block.previousHash }}</span><br/>
                <span>随机数: {{ block.nonce }}</span>
              </p>
              <div v-if="block.transactions.length > 0">
                <hr/>
                <h4>交易列表</h4>
                <p v-for="(transaction, index) in block.transactions" :key="index">
                  <h5>交易{{ index + 1 }}</h5>
                  <span>时间戳: {{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
                  <span>发送方: {{ transaction.from }}</span><br/>
                  <span>接收方: {{ transaction.to }}</span><br/>
                  <span>金额: {{ transaction.amount }}</span><br/>
                  <span>交易信息: {{ transaction.message }}</span><br/>
                  <span>签名: {{ transaction.signature }}</span>
                </p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div v-if="chain.transactionPool.length > 0">
          <h2>交易池列表</h2>
          <el-card v-for="(transaction, index) in chain.transactionPool" :key="index" style="margin-bottom: 10px;">
            <h3>交易{{ index + 1 }}</h3>
            <p>
              <span>时间戳: {{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
              <span>发送方: {{ transaction.from }}</span><br/>
              <span>接收方: {{ transaction.to }}</span><br/>
              <span>金额: {{ transaction.amount }}</span><br/>
              <span>交易信息: {{ transaction.message }}</span><br/>
              <span>签名: {{ transaction.signature }}</span>
            </p>
          </el-card>
        </div>
      </div>
    </el-card>
  </main>
</template>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
