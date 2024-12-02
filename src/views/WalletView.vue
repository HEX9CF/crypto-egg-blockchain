<script setup lang="ts">
import {ref} from "vue";
import {wallet} from "@/stores/wallet";
import {chain} from "@/stores/blockchain";
import {formatTimestamp} from "@/utils/formatters";
import {
  clickClearKey,
  clickGenKey,
  clickKeyFromPrivate,
  clickValidateKey,
  clickUpdateBalance
} from "@/controllers/wallet";

const inTransactions = ref(chain.value.getInTransactions(wallet.value.publicKey));
const outTransactions = ref(chain.value.getOutTransactions(wallet.value.publicKey));
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>加密蛋钱包</span>
      </div>
    </template>
    <el-row>
      <el-col :span="6">
        <el-statistic title="加密蛋余额" :value="wallet.balance"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="总交易数" :value="inTransactions.length + outTransactions.length"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="转入交易数" :value="inTransactions.length"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="转出交易数" :value="outTransactions.length"></el-statistic>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-button type="primary" @click="clickUpdateBalance()">刷新余额</el-button>
      </el-col>
    </el-row>
  </el-card>
  <br/>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>密钥对</span>
      </div>
    </template>
    <el-form>
      <el-form-item label="私钥">
        <el-input v-model="wallet.privateKey"></el-input>
      </el-form-item>
      <el-form-item label="公钥">
        <el-input v-model="wallet.publicKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickClearKey">清空密钥对</el-button>
        <el-button type="primary" @click="clickGenKey">生成密钥对</el-button>
        <el-button type="primary" @click="clickKeyFromPrivate">从私钥导入</el-button>
        <el-button type="primary" @click="clickValidateKey">验证密钥对</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card v-if="wallet.keyPair" style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>转入交易</span>
      </div>
    </template>
    <el-table :data="inTransactions" stripe border show-overflow-tooltip style="width: 100%" height="400">
      <el-table-column fixed prop="timestamp" label="时间戳" :formatter="formatTimestamp"/>
      <el-table-column prop="from" label="发送方"/>
      <el-table-column prop="message" label="交易信息"/>
    </el-table>
  </el-card>
  <el-card v-if="wallet.keyPair" style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>转出交易</span>
      </div>
    </template>
    <el-table :data="outTransactions" stripe border show-overflow-tooltip style="width: 100%" height="400">
      <el-table-column fixed prop="timestamp" label="时间戳" :formatter="formatTimestamp"/>
      <el-table-column prop="to" label="接收方"/>
      <el-table-column prop="message" label="交易信息"/>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>