# 🐔🏀 CRYPTO EGG Blockchain 🥚🔗

## 项目介绍

一个基于区块链技术的加密货币系统。“加密蛋🥚”是一种加密货币。玩家通过喂养“虚拟鸡🐔”，可以获得“加密蛋🥚”，“加密蛋🥚”可用于和其他玩家交易。该项目使用 secp256k1 椭圆曲线生成密钥对，并使用 sha256 哈希算法进行签名。

A cryptocurrency system based on blockchain technology. CRYPTO EGG 🥚 is a type of cryptocurrency. Players can obtain CRYPTO EGGS 🥚 by feeding VIRTUAL CHICKENS 🐔, and CRYPTO EGGS 🥚 can be used for trading with other players. The project uses the secp256k1 elliptic curve to generate key pairs and the sha256 hash algorithm for signing.

## 功能简介

- 🐔**虚拟养鸡场**：玩家可以经营一个虚拟养鸡场，通过喂养虚拟鸡来生产加密蛋。每生产一个加密蛋，系统就会在区块链上创建一个新区块。
- 🥚**钱包管理**：玩家可以生成、导入和验证密钥对（私钥和公钥）来管理他们的加密蛋。
- 💰**交易**：玩家可以创建交易，将加密蛋转移给其他玩家。
- 🔗**区块链**：系统包含一个区块链，用于安全记录所有交易并验证链的完整性。

## 加密技术

- **secp256k1** 一种特定的椭圆曲线，广泛用于加密货币中。它的全称是 "secp256k1 椭圆曲线"，其中 secp 表示 "标准椭圆曲线参数"，256 表示曲线的位数，k1 表示曲线的特定参数选择。
- **sha256** 一种哈希算法，用于将任意长度的数据转换为固定长度的哈希值。SHA-256 是 SHA-2 系列中的一种，输出长度为 256 位。

## 部署项目

```sh
npm install
```

### 编译并热重载以进行开发

```sh
npm run dev
```

### 编译并压缩以进行生产

```sh
npm run build
```

## 用户手册

### 区块链管理

1. **自动创建初始区块**：系统启动时会自动创建一个初始区块，作为区块链的起点。
     
2. **验证区块链**：用户可以点击“验证区块链”按钮，系统会校验区块链中每个区块的哈希值。如果区块链断裂，系统会报错提示。

### 钱包管理

1. **生成密钥对**：用户可以点击“生成密钥对”按钮，系统会使用 `secp256k1` 椭圆曲线生成一对新的公钥和私钥。

2. **从私钥导入**：用户可以输入已有的私钥，并点击“从私钥导入”按钮，系统会根据私钥生成对应的公钥。

3. **验证密钥对**：用户可以点击“验证密钥对”按钮，系统会验证当前的公钥和私钥是否匹配。

### 虚拟养鸡场

1. **领取饲料**：用户可以点击“领取饲料”按钮，系统会将饲料添加到用户的库存中。

2. **喂食**：用户点击“喂食”按钮，系统会消耗一定数量的饲料，并随机增加生蛋进度。 用户可以多次点击“喂食”按钮，直到生蛋进度达到100%。

3. **收蛋**：当生蛋进度达到100%时，用户可以点击“收蛋”按钮，系统会执行挖矿计算哈希，创建一个新区块，并将交易池中的交易写入新区块的交易列表。玩家将获得虚拟蛋奖励。

### 交易

1. **创建交易**：用户可以输入收款人公钥、转账金额和交易信息，并点击“添加交易”按钮，系统会将交易添加到交易池中。

