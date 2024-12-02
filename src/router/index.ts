import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import KeyView from "@/views/WalletView.vue";
import BlockchainView from "@/views/BlockchainView.vue";
import TransactionView from "@/views/TransactionView.vue";
import PoolView from "@/views/PoolView.vue";

const routes = [
    { path: '/', name: 'home', component: HomeView},
    { path: '/wallet', name: 'key', component: KeyView},
    { path: '/transaction', name: 'transaction', component: TransactionView},
    { path: '/blockchain', name: 'blockchain', component: BlockchainView},
    { path: '/pool', name: 'pool', component: PoolView},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router