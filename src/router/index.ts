import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import KeyView from "@/views/KeyView.vue";
import BlockchainView from "@/views/BlockchainView.vue";
import TransactionView from "@/views/TransactionView.vue";

const routes = [
    { path: '/', name: 'home', component: HomeView},
    { path: '/key', name: 'key', component: KeyView},
    { path: '/blockchain', name: 'blockchain', component: BlockchainView},
    { path: '/transaction', name: 'transaction', component: TransactionView},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router