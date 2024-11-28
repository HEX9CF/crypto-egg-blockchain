import { Transaction } from '@/models/transaction';
import { message } from '@/stores/message';
import { chain, key, newTransaction } from '@/stores/blockchain';

function clickGenKey(): void {
    key.value.generate();
    console.log(key.value.privateKey);
    console.log(key.value.publicKey);
    console.log("生成密钥对成功");
    message.value.key = "生成密钥对成功";
}

function clickKeyFromPrivate() {
    if (key.value.privateKey === "") {
        console.error("私钥不能为空！");
        message.value.key = "私钥不能为空！";
        return;
    }
    key.value.fromPrivate(key.value.privateKey);
    console.log("通过私钥导入密钥对成功");
    message.value.key = "通过私钥导入密钥对成功";
}

function clickClearKey() {
    key.value.clear();
    console.log("清空密钥对成功");
}

function clickValidateKey() {
    if (key.value.validate()) {
        console.log("密钥对有效");
        message.value.key = "密钥对有效";
    } else {
        console.error("密钥对无效！");
        message.value.key = "密钥对无效！";
    }
}

function clickAddTransaction(): void {
    if (key.value.keyPair === null) {
        console.error("密钥对不存在！");
        message.value.transaction = "密钥对不存在！";
        return;
    }
    if (newTransaction.value.to === "") {
        console.error("收款人公钥不能为空！");
        message.value.transaction = "收款人公钥不能为空！";
        return;
    }
    if (newTransaction.value.amount <= 0) {
        console.error("转账金额必须大于0！");
        message.value.transaction = "转账金额必须大于0！";
        return;
    }
    let transaction: Transaction = new Transaction(
        key.value.publicKey,
        newTransaction.value.to,
        newTransaction.value.amount,
        newTransaction.value.message
    );
    transaction.sign(key.value.keyPair);
    chain.value.addTransaction(transaction);
    console.log("添加交易成功");
    message.value.transaction = "添加交易成功";
}

function clickMine(): void {
    if (key.value.keyPair === null) {
        console.error("密钥对不存在！");
        message.value.block = "密钥对不存在！";
        return;
    }
    chain.value.mineTransactionPool(key.value.publicKey);
    console.log("挖矿成功");
    message.value.block = "挖矿成功";
}

function clickValidateChain(): void {
    if (chain.value.validate()) {
        console.log("区块链有效");
        message.value.block = "区块链有效";
    } else {
        console.error("区块链无效！");
        message.value.block = "区块链无效！";
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

