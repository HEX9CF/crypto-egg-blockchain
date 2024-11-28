import { Block } from '@/models/block';
import { Transaction } from '@/models/transaction';

class Chain {
    blocks: Block[];
    transactionPool: Transaction[];
    minerReward: number;
    difficulty: number;

    constructor(minerReward: number, difficulty: number) {
        this.blocks = [this.bigBang()];
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
        return this.blocks[this.blocks.length - 1];
    }

    // 添加区块
    addBlock(newBlock: Block): void {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mine(this.difficulty);
        this.blocks.push(newBlock);
    }

    // 挖矿
    mineTransactionPool(minerAddress: string) {
        if (minerAddress === '') {
            console.error('矿工地址不能为空！');
            return
        }
        if (this.minerReward !== 0) {
            // 发放奖励
            const rewardTransaction = new Transaction('', minerAddress, this.minerReward, "矿工奖励");
            this.transactionPool.push(rewardTransaction);
        }

        // 挖矿
        const newBlock = new Block(this.transactionPool);
        newBlock.mine(this.difficulty);
        this.addBlock(newBlock);
        this.transactionPool = [];
    }

    // 添加交易
    addTransaction(transaction: Transaction): void {
        if (!transaction.validate()) {
            console.error('非法交易！');
            return;
        }
        if (transaction.from === transaction.to) {
            console.error('不能给自己转账！');
            return;
        }
        if (transaction.amount <= 0) {
            console.error('交易金额不能为0！');
            return
        }
        console.log('交易已添加至交易池');
        this.transactionPool.push(transaction);
    }

    // 验证区块链
    validate(): boolean {
        if (this.blocks.length === 1) {
            const block:Block = this.blocks[0]
            if(block.hash !== block.computeHash()) {
                console.error('创世区块被篡改！');
                return false;
            }
        }
        for (let i: number = 1; i < this.blocks.length; i++) {
            const block = this.blocks[i];
            if (!block.validateTransactions()) {
                console.error('区块中存在非法交易！');
                return false;
            }
            if (block.hash !== block.computeHash()) {
                console.error('区块数据被篡改！');
                return false;
            }
            const previousBlock = this.blocks[i - 1];
            if (block.previousHash !== previousBlock.hash) {
                console.error('区块链断裂！');
                return false;
            }
        }
        return true;
    }
}

export { Chain };