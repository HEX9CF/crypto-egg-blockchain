import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

class Key {
    keyPair: EC.KeyPair | null;
    privateKey: string;
    publicKey: string;

    constructor() {
        this.keyPair = null;
        this.privateKey = '';
        this.publicKey = '';
    }

    // 生成密钥对
    generate(): void {
        this.keyPair = ec.genKeyPair();
        this.privateKey = this.keyPair.getPrivate('hex');
        this.publicKey = this.keyPair.getPublic('hex');
    }

    // 从私钥导入
    fromPrivate(privateKey: string) {
        this.keyPair = ec.keyFromPrivate(privateKey);
        this.privateKey = privateKey;
        this.publicKey = this.keyPair.getPublic('hex');
    }

    // 验证密钥对
   validate(): boolean {
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
    }
}

export { Key };