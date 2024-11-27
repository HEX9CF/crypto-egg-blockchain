<script setup lang="ts">
import { ref } from 'vue';
import { ec } from '@/main';
import { Chain } from '@/model/chain';
import { Block } from '@/model/block';
import { Key } from '@/model/key';
import { Transaction } from '@/model/transaction';

const chain = ref(new Chain(1, 2));
const key = ref(new Key());
const newTransaction = ref(new Transaction());

function clickGenKey(): void {
  key.value.generate();
  console.log(key.value.keyPair);
  console.log(key.value.privateKey);
  console.log(key.value.publicKey);
}

function clickAddTransaction(): void {
  if (key.value.keyPair === null) {
    console.error('密钥对不存在');
    return;
  }
  newTransaction.value.from = key.value.publicKey;
  newTransaction.value.sign(key.value.keyPair);
  chain.value.addTransaction(newTransaction.value);
  // console.log(newTransaction);
  alert('添加交易成功');
}

function clickMine(): void {
  chain.value.mineTransactionPool(key.value.publicKey);
  // console.log(chain);
  alert('挖矿成功');
}

// chain.mineTransactionPool(publicKeyReceiver);
// console.log(chain);
// console.log(chain.blocks[1].transactions)
</script>

<template>
  <header>
  </header>

  <main>
    <div>
      <p>
        <input type="button" value="生成密钥对" @click="clickGenKey()"/><br/>
        <span>公钥：{{ key.publicKey }}</span><br/>
        <span>私钥：{{ key.privateKey }}</span>
      </p>
    </div>

    <div>
      <p>
        <form>
          <label>收款人公钥</label><br/>
          <input type="text" v-model="newTransaction.to"/><br/>
          <label>转账金额</label><br/>
          <input type="text" v-model="newTransaction.amount"/><br/>
          <input type="button" value="添加交易" @click="clickAddTransaction()"/>
        </form>
      </p>
    </div>

    <div>
      <p>
        <input type="button" value="挖矿" @click="clickMine()"/>
      </p>
    </div>

  </main>
</template>

<style scoped>

</style>
