<script setup lang="ts">
import { inventory, chicken, farmEmojiArt} from '@/stores/farm';
import {clickGetFood, clickFeed, clickCollectEgg} from '@/controllers/farm';
import { wallet } from '@/stores/wallet';

const colors = [
  { color: '#f56c6c', percentage: 100 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 40 },
  { color: '#6f7ad3', percentage: 20 },
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
      <el-row :gutter="20">
        <el-col :span="4">
            <el-progress type="dashboard" :percentage="chicken.progress" :color="colors">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">生蛋进度</span>
              </template>
            </el-progress>
        </el-col>
        <el-col :span="20">
            <div v-for="line in farmEmojiArt">
              {{ line }}<br/>
            </div>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="4">
          <el-statistic title="饲料库存" :value="inventory.food"></el-statistic>
        </el-col>
        <el-col :span="4">
          <el-statistic title="加密蛋余额" :value="wallet.balance"></el-statistic>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="primary" @click="clickGetFood">领取饲料</el-button>
          <el-button type="primary" @click="clickFeed">喂食</el-button>
          <el-button type="primary" @click="clickCollectEgg">收蛋</el-button>
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
