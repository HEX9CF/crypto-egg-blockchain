import { ec } from "@/main";

class Key {
    keyPair: any;
    privateKey: string;
    publicKey: string;

    constructor() {
        this.gen();
    }

    gen(): void {
        this.keyPair = ec.genKeyPair();
        this.privateKey = this.keyPair.getPrivate('hex');
        this.publicKey = this.keyPair.getPublic('hex');
    }
}

export { Key };