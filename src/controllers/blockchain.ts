import { ElMessage } from 'element-plus';
import { chain } from '@/stores/blockchain';
import { key } from '@/stores/key';

export function clickMine(): void {
    if (key.value.keyPair === null) {
        console.error("密钥对不存在！");
        ElMessage.error("密钥对不存在！");
        return;
    }
    chain.value.mineTransactionPool(key.value.publicKey);
    console.log("挖矿成功");
    ElMessage.success("挖矿成功");
}

export function clickValidateChain(): void {
    if (chain.value.validate()) {
        console.log("区块链有效");
        ElMessage.success("区块链有效");
    } else {
        console.error("区块链无效！");
        ElMessage.error("区块链无效！");
    }
}

