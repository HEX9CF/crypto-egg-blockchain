<script setup lang="ts">
import { ref } from 'vue';
import { Key } from "@/model/key";

const key = ref(new Key());

function clickGenKey() {
  key.value.generate();
  console.log(key.value.keyPair);
  console.log(key.value.privateKey);
  console.log(key.value.publicKey);
}

</script>

<template>
  <div>
    <input type="button" value="生成密钥对" @click="clickGenKey()"/>
    <p>
      <span>公钥：{{ key.publicKey }}</span><br/>
      <span>私钥：{{ key.privateKey }}</span>
    </p>
  </div>
</template>

<style scoped>

</style>