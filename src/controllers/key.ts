import {ElMessage} from "element-plus";
import {key} from "@/stores/key";

export function clickGenKey(): void {
    key.value.generate();
    console.log(key.value.privateKey);
    console.log(key.value.publicKey);
    console.log("生成密钥对成功");
    ElMessage.success("生成密钥对成功");
}

export function clickKeyFromPrivate() {
    if (key.value.privateKey === "") {
        console.error("私钥不能为空！");
        ElMessage.warning("私钥不能为空！");
        return;
    }
    key.value.fromPrivate(key.value.privateKey);
    console.log("通过私钥导入密钥对成功");
    ElMessage.success("通过私钥导入密钥对成功");
}

export function clickClearKey() {
    key.value.clear();
    console.log("清空密钥对成功");
    ElMessage.success("清空密钥对成功");
}

export function clickValidateKey() {
    if (key.value.validate()) {
        console.log("密钥对有效");
        ElMessage.success("密钥对有效");
    } else {
        console.error("密钥对无效！");
        ElMessage.error("密钥对无效！");
    }
}
