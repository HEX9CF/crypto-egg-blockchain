<script setup lang="ts">
import {chain} from "@/stores/blockchain";
import {clickMine, clickValidateChain} from "@/controllers/blockchain";
import { formatTimestamp } from "@/utils/formatters";
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>区块链</span>
      </div>
    </template>
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
      <el-col :span="24">
        <el-button type="primary" @click="clickValidateChain">验证区块链</el-button>
        <el-button type="primary" @click="clickMine">挖矿</el-button>
      </el-col>
    </el-row>
  </el-card>
  <br/>
  <el-card v-if="chain.blocks.length > 0">
    <template #header>
      <div class="card-header">
        <span>区块列表</span>
      </div>
    </template>
      <el-timeline>
        <el-timeline-item v-for="(block, index) in chain.blocks.slice().reverse()" :timestamp="new Date(block.timestamp).toLocaleString()" placement="top">
          <el-card>
            <h3>区块{{ chain.blocks.length - index }}</h3>
            <p>
              <span>时间戳: {{ block.timestamp }} ({{ new Date(block.timestamp).toLocaleString() }})</span><br/>
              <span>区块哈希: {{ block.hash }}</span><br/>
              <span>上一个区块哈希: {{ block.previousHash }}</span><br/>
              <span>随机数: {{ block.nonce }}</span>
            </p>
            <div v-if="block.transactions.length > 0">
              <h4>交易列表</h4>
              <el-table :data="block.transactions" stripe border show-overflow-tooltip style="width: 100%" height="200">
                <el-table-column fixed prop="timestamp" label="时间戳" :formatter="formatTimestamp"/>
                <el-table-column prop="from" label="发送方"/>
                <el-table-column prop="to" label="接收方"/>
                <el-table-column prop="amount" label="金额"/>
                <el-table-column prop="message" label="交易信息"/>
                <el-table-column prop="signature" label="签名"/>
              </el-table>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
  </el-card>
</template>

<style scoped>

</style>