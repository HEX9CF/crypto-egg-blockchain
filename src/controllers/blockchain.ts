import { ElMessage } from 'element-plus';
import { chain } from '@/stores/blockchain';
import { wallet } from '@/stores/wallet';

export async function clickMine(): Promise<void> {
    if (wallet.value.keyPair === null) {
        console.error("密钥对不存在！");
        ElMessage.error("密钥对不存在！");
        return;
    }
    await chain.value.mineTransactionPool(wallet.value.publicKey).then((val: boolean): void => {
        if (!val) {
            console.error("挖矿失败！");
            ElMessage.error("挖矿失败！");
            return;
        }
        wallet.value.updateBalance();
        console.log("挖矿成功");
        ElMessage.success("挖矿成功");
    });
}

export function clickValidateChain(): void {
    if (!chain.value.validate()) {
        console.error("区块链无效！");
        ElMessage.error("区块链无效！");
    }
    console.log("区块链有效");
    ElMessage.success("区块链有效");
}

