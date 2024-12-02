import { ElMessage } from 'element-plus';
import { Transaction } from '@/models/transaction';
import { chain, key, transactionForm } from '@/stores/blockchain';
import {inventory} from "@/stores/farm";

function clickGenKey(): void {
    key.value.generate();
    console.log(key.value.privateKey);
    console.log(key.value.publicKey);
    console.log("生成密钥对成功");
    ElMessage.success("生成密钥对成功");
}

function clickKeyFromPrivate() {
    if (key.value.privateKey === "") {
        console.error("私钥不能为空！");
        ElMessage.warning("私钥不能为空！");
        return;
    }
    key.value.fromPrivate(key.value.privateKey);
    console.log("通过私钥导入密钥对成功");
    ElMessage.success("通过私钥导入密钥对成功");
}

function clickClearKey() {
    key.value.clear();
    console.log("清空密钥对成功");
    ElMessage.success("清空密钥对成功");
}

function clickValidateKey() {
    if (key.value.validate()) {
        console.log("密钥对有效");
        ElMessage.success("密钥对有效");
    } else {
        console.error("密钥对无效！");
        ElMessage.error("密钥对无效！");
    }
}

function clickAddTransaction(): void {
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

function clickMine(): void {
    if (key.value.keyPair === null) {
        console.error("密钥对不存在！");
        ElMessage.error("密钥对不存在！");
        return;
    }
    chain.value.mineTransactionPool(key.value.publicKey);
    console.log("挖矿成功");
    ElMessage.success("挖矿成功");
}

function clickValidateChain(): void {
    if (chain.value.validate()) {
        console.log("区块链有效");
        ElMessage.success("区块链有效");
    } else {
        console.error("区块链无效！");
        ElMessage.error("区块链无效！");
    }
}

export {
    clickGenKey,
    clickKeyFromPrivate,
    clickClearKey,
    clickValidateKey,
    clickAddTransaction,
    clickMine,
    clickValidateChain
};

