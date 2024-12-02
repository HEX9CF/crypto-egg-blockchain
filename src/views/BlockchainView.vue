<script setup lang="ts">

import {message} from "@/stores/message";
import {chain} from "@/stores/blockchain";
import {clickMine, clickValidateChain} from "@/controllers/blockchain";
</script>

<template>
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
              <div v-for="(transaction, index) in block.transactions" :key="index">
                <h5>交易{{ index + 1 }}</h5>
                <span>时间戳: {{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
                <span>发送方: {{ transaction.from }}</span><br/>
                <span>接收方: {{ transaction.to }}</span><br/>
                <span>金额: {{ transaction.amount }}</span><br/>
                <span>交易信息: {{ transaction.message }}</span><br/>
                <span>签名: {{ transaction.signature }}</span><br/>
              </div>
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
</template>

<style scoped>

</style>