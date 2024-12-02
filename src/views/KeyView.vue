<script setup lang="ts">

import {key} from "@/stores/blockchain";
import {clickClearKey, clickGenKey, clickKeyFromPrivate, clickValidateKey} from "@/controllers/blockchain";
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>密钥对</span>
      </div>
    </template>
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
</template>

<style scoped>

</style>