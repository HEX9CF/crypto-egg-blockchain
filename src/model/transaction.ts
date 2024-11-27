import { ec, EC, sha256 } from '../main'

class Transaction {
    timestamp: number;
    from: string;
    to: string;
    amount: number;
    signature: string;

    constructor(from: string, to: string, amount: number) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    // 计算哈希
    computeHash() {
        return sha256(this.from + this.to + this.amount).toString();
    }

    // 签名
    sign(key: EC.KeyPair): void {
        this.signature = key.sign(this.computeHash(), 'base64').toDER('hex');
    }

    // 验证签名
    validate(): boolean {
        if (this.from === '') {
            return true;
        }
        const keyObject = ec.keyFromPublic(this.from, 'hex');
        return keyObject.verify(this.computeHash(), this.signature);
    }
}

export { Transaction }