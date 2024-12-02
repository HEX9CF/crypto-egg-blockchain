import { ec as EC } from 'elliptic';
import {chain} from "@/stores/blockchain";
import {Transaction} from "@/models/transaction";
const ec = new EC('secp256k1');

export class Wallet {
    keyPair: EC.KeyPair | null;
    privateKey: string;
    publicKey: string;
    balance: number;

    constructor() {
        this.keyPair = null;
        this.privateKey = '';
        this.publicKey = '';
        this.balance = 0;
    }

    // 生成密钥对
    generateKey(): boolean {
        this.keyPair = ec.genKeyPair();
        if (!this.keyPair.validate()) {
            console.log("密钥对无效！");
            this.keyPair = null;
            return false;
        }
        this.privateKey = this.keyPair.getPrivate('hex');
        this.publicKey = this.keyPair.getPublic('hex');
        this.balance = chain.value.getBalance(this.publicKey);
        return true;
    }

    // 从私钥导入
    fromPrivateKey(privateKey: string): boolean {
        this.keyPair = ec.keyFromPrivate(privateKey);
        if (!this.keyPair.validate()) {
            console.log("私钥无效！");
            this.keyPair = null;
            return false;
        }
        this.privateKey = privateKey;
        this.publicKey = this.keyPair.getPublic('hex');
        this.balance = chain.value.getBalance(this.publicKey);
        return true;
    }

    // 验证密钥对
   validateKey(): boolean {
        if (this.keyPair === null) {
            return false;
        }
        if (this.privateKey !== this.keyPair.getPrivate('hex')) {
            return false;
        }
        if (this.publicKey !== this.keyPair.getPublic('hex')) {
            return false;
        }
        return this.keyPair.validate();
   }

   // 清空
    clear(): void {
        this.keyPair = null;
        this.privateKey = '';
        this.publicKey = '';
        this.balance = 0;
    }

    // 更新
    updateBalance(): boolean {
        if (this.keyPair === null) {
            console.log("密钥对不存在！");
            this.balance = 0;
            return false;
        }
        this.balance = chain.value.getBalance(this.publicKey);
        return true;
    }
}
