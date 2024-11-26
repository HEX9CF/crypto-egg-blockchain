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

    generate(): void {
        this.keyPair = ec.genKeyPair();
        this.privateKey = this.keyPair.getPrivate('hex');
        this.publicKey = this.keyPair.getPublic('hex');
    }
}

export { Key };