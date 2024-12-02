<script setup lang="ts">
import {chain} from "@/stores/blockchain";
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>交易池</span>
      </div>
    </template>
    <el-card v-for="(transaction, index) in chain.transactionPool" :key="index" style="margin-bottom: 10px;">
      <h4>交易{{ index + 1 }}</h4>
      <p>
        <span>时间戳: {{ transaction.timestamp }} ({{ new Date(transaction.timestamp).toLocaleString() }})</span><br/>
        <span>发送方: {{ transaction.from }}</span><br/>
        <span>接收方: {{ transaction.to }}</span><br/>
        <span>金额: {{ transaction.amount }}</span><br/>
        <span>交易信息: {{ transaction.message }}</span><br/>
        <span>签名: {{ transaction.signature }}</span>
      </p>
    </el-card>
  </el-card>
</template>

<style scoped>

</style>