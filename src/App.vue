<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>CRYPTO EGG Blockchain</h1>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu
              active-text-color="#9cf"
              background-color="#112"
              class="el-menu-vertical-demo"
              default-active="1"
              text-color="#fff"
              router
            >
              <el-menu-item index="/">
                <span>养鸡场</span>
              </el-menu-item>
              <el-menu-item index="/wallet">
                <span>钱包</span>
              </el-menu-item>
              <el-menu-item index="/transaction">
                <span>交易</span>
              </el-menu-item>
              <el-menu-item index="/blockchain">
                <span>区块链</span>
              </el-menu-item>
              <el-menu-item index="/pool">
                <span>交易池</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
        <el-main>
          <RouterView class="router-view" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>

</style>