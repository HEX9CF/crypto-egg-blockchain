import sha256 from 'crypto-js/sha256';
import { Transaction } from '@/models/transaction';

class Block {
    transactions: Transaction[];
    previousHash: string;
    timestamp: number;
    nonce: number;
    hash: string;

    constructor(transactions: Transaction[]) {
        this.transactions = transactions;
        this.previousHash = '';
        this.timestamp = Date.now();
        this.nonce = 1;
        this.hash = this.computeHash();
    }

    // 计算哈希
    computeHash(): string{
        return sha256(
            JSON.stringify(this.transactions)
            + this.previousHash
            + this.timestamp
            + this.nonce
        ).toString();
    }

    getAnswer(difficulty: number): string {
        let answer: string = '';
        for (let i: number = 0; i < difficulty; i++) {
            answer += '0';
        }
        return answer;
    }

    // 挖矿
    mine(difficulty: number): void {
        if (!this.validateTransactions()) {
            console.error('存在非法交易！')
            return;
        }
        while (true) {
            this.hash = this.computeHash();
            if (this.hash.substring(0, difficulty) !== this.getAnswer(difficulty)) {
                this.nonce++;
            } else {
                break;
            }
        }
    }

    // 验证交易
    validateTransactions(): boolean {
        for (let t of this.transactions) {
            if (!t.validate())  {
                return false;
            }
        }
        return true;
    }
}

export { Block };