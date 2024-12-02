<script setup lang="ts">
import {chain} from "@/stores/blockchain";
import {formatTimestamp} from "@/utils/formatter";
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>交易池</span>
      </div>
    </template>
    <el-table :data="chain.transactionPool" stripe border show-overflow-tooltip style="width: 100%" height="400">
      <el-table-column fixed prop="timestamp" label="时间戳" :formatter="formatTimestamp"/>
      <el-table-column prop="from" label="发送方"/>
      <el-table-column prop="to" label="接收方"/>
      <el-table-column prop="amount" label="金额"/>
      <el-table-column prop="message" label="交易信息"/>
      <el-table-column prop="signature" label="签名"/>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>