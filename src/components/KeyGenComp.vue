<script setup lang="ts">
import { Key } from "@/model/key";

var key: Key = new Key();
// console.log(key.keyPair);
// console.log(key.privateKey);
// console.log(key.publicKey);

</script>

<template>
  <div>
    <p>公钥：{{ key.publicKey }}</p>
    <p>私钥：{{ key.privateKey }}</p>
  </div>
</template>

<style scoped>

</style>