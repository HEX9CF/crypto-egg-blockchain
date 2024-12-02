<script setup lang="ts">
import {wallet} from "@/stores/wallet";
import {clickClearKey, clickGenKey, clickKeyFromPrivate, clickValidateKey, clickUpdateBalance} from "@/controllers/wallet";
import {chain} from "@/stores/blockchain";
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>钱包</span>
      </div>
    </template>
    <el-row>
      <el-col :span="6">
        <el-statistic title="余额" :value="wallet.balance"></el-statistic>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-button type="primary" @click="clickUpdateBalance()">更新余额</el-button>
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
</template>

<style scoped>

</style>