import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { ec as EC } from 'elliptic';
import sha256 from 'crypto-js/sha256';
const ec = new EC('secp256k1');
export { ec, EC, sha256 }

createApp(App).mount('#app')

