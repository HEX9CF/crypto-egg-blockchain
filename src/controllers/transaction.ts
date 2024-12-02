import {ElMessage} from "element-plus";
import {transactionForm} from "@/stores/form";
import {chain} from "@/stores/blockchain";
import {wallet} from "@/stores/wallet";
import {Transaction} from "@/models/transaction";

export function clickAddTransaction(): void {
    if (wallet.value.keyPair === null) {
        console.error("密钥对不存在！");
        ElMessage.error("密钥对不存在！");
        return;
    }
    if (transactionForm.value.to === "") {
        console.error("收款人公钥不能为空！");
        ElMessage.warning("收款人公钥不能为空！");
        return;
    }
    if (transactionForm.value.amount <= 0) {
        console.error("转账金额必须大于0！");
        ElMessage.warning("转账金额必须大于0！");
        return;
    }
    wallet.value.updateBalance();
    if (transactionForm.value.amount > wallet.value.balance) {
        console.error("余额不足！");
        ElMessage.warning("余额不足！");
        return
    }
    let transaction: Transaction = new Transaction(
        wallet.value.publicKey,
        transactionForm.value.to,
        transactionForm.value.amount,
        transactionForm.value.message
    );
    transaction.sign(wallet.value.keyPair);
    chain.value.addTransaction(transaction);
    wallet.value.updateBalance();
    console.log("添加交易成功");
    ElMessage.success("添加交易成功");
}