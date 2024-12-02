<script setup lang="ts">
import {transactionForm} from "@/stores/blockchain";
import {clickAddTransaction} from "@/controllers/blockchain";
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>交易</span>
      </div>
    </template>
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
</template>

<style scoped>

</style>