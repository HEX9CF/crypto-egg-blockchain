import {ElMessage} from "element-plus";
import {wallet} from "@/stores/wallet";
import {updateFarmEmojiArt} from "@/stores/farm";

export function clickGenKey(): void {
    wallet.value.generateKey();
    updateFarmEmojiArt();
    // console.log(wallet.value.privateKey);
    // console.log(wallet.value.publicKey);
    console.log("生成密钥对成功，请保管好私钥");
    ElMessage.success("生成密钥对成功，请保管好私钥");
}

export function clickKeyFromPrivate(): void {
    if (wallet.value.privateKey === "") {
        console.error("私钥不能为空！");
        ElMessage.warning("私钥不能为空！");
        return;
    }
    if(!wallet.value.fromPrivateKey(wallet.value.privateKey)) {
        console.error("通过私钥导入密钥对失败！");
        ElMessage.error("通过私钥导入密钥对失败！");
        return;
    }
    updateFarmEmojiArt();
    console.log("通过私钥导入密钥对成功");
    ElMessage.success("通过私钥导入密钥对成功");
}

export function clickClearKey(): void {
    wallet.value.clear();
    updateFarmEmojiArt();
    console.log("清空密钥对成功");
    ElMessage.success("清空密钥对成功");
}

export function clickValidateKey(): void {
    if (wallet.value.validateKey()) {
        console.log("密钥对有效");
        ElMessage.success("密钥对有效");
        return;
    }
    console.error("密钥对无效！");
    ElMessage.error("密钥对无效！");
}

export function clickUpdateBalance(): void {
    if (wallet.value.keyPair === null) {
        console.error("密钥对不存在！");
        ElMessage.error("密钥对不存在！");
        return;
    }
    if (!wallet.value.updateBalance()) {
        console.log("刷新余额失败！");
        ElMessage.error("刷新余额失败！");
    }
    console.log("刷新余额成功");
    ElMessage.success("刷新余额成功");
}