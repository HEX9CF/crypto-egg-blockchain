import {ElMessage} from "element-plus";
import {transactionForm} from "@/stores/form";
import {inventory} from "@/stores/farm";
import {chain} from "@/stores/blockchain";
import {key} from "@/stores/key";

export function clickAddTransaction(): void {
    if (key.value.keyPair === null) {
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
    if (transactionForm.value.amount > inventory.value.egg) {
        console.error("余额不足！");
        ElMessage.warning("余额不足！");
        return
    }
    let transaction: Transaction = new Transaction(
        key.value.publicKey,
        transactionForm.value.to,
        transactionForm.value.amount,
        transactionForm.value.message
    );
    transaction.sign(key.value.keyPair);
    chain.value.addTransaction(transaction);
    inventory.value.egg -= transactionForm.value.amount;
    console.log("添加交易成功");
    ElMessage.success("添加交易成功");
}