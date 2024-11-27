import { ec, EC } from "@/main";

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
}

export { Key };