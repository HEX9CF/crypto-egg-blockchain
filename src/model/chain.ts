import { Block } from './block';
import { Transaction } from './transaction';

class Chain {
    chain: Block[];
    transactionPool: Transaction[];
    minerReward: number;
    difficulty: number;

    constructor(minerReward: number, difficulty: number) {
        this.chain = [this.bigBang()];
        this.transactionPool = [];
        this.minerReward = minerReward;
        this.difficulty = difficulty;
    }

    // 创世
    bigBang(): Block {
        const genesisBlock = new Block([]);
        genesisBlock.previousHash = '';
        return genesisBlock;
    }

    // 获取最后一个区块
    getLastestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    // 添加区块
    addBlock(newBlock: Block): void {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    }

    // 挖矿
    mineTransactionPool(minerAddress: string) {
        // 发放奖励
        const rewardTransaction = new Transaction('', minerAddress, this.minerReward);
        this.transactionPool.push(rewardTransaction);

        // 挖矿
        const newBlock = new Block(this.transactionPool);
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
        this.transactionPool = [];
    }

    // 添加交易
    addTransaction(transaction: Transaction): void {
        if (!transaction.validate()) {
            throw new Error('非法交易！');
        }
        console.log('验证通过，交易已添加至交易池');
        this.transactionPool.push(transaction);
    }

    // 验证区块链
    validate(): boolean {
        if (this.chain.length === 1) {
            const block:Block = this.chain[0]
            if(block.hash !== block.computeHash()) {
                console.log('创世区块被篡改！');
                return false;
            }
        }
        for (let i: number = 1; i < this.chain.length; i++) {
            const block = this.chain[i];
            if (!block.validateTransactions()) {
                console.log('区块中存在非法交易！');
                return false;
            }
            if (block.hash !== block.computeHash()) {
                console.log('区块数据被篡改！');
                return false;
            }
            const previousBlock = this.chain[i - 1];
            if (block.previousHash !== previousBlock.hash) {
                console.log('区块链断裂！');
                return false;
            }
        }
        return true;
    }
}

export { Chain }