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
            >
              <el-menu-item index="1">
                <router-link to="/">
                <span>养鸡场</span>
                </router-link>
              </el-menu-item>
              <el-menu-item index="2">
                <router-link to="/key">
                <span>密钥对</span>
                </router-link>
              </el-menu-item>
              <el-menu-item index="3">
                <router-link to="/transaction">
                <span>交易</span>
                </router-link>
              </el-menu-item>
              <el-menu-item index="4">
                <router-link to="/blockchain">
                <span>区块链</span>
                </router-link>
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