<script setup lang="ts">
import {
  clickGetFood,
  clickFeed,
  clickCollectEgg,
  clickDonateEgg
} from '@/controllers/farm';

import { message } from '@/stores/message';
import { inventory, chicken, donateForm } from '@/stores/farm';

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
