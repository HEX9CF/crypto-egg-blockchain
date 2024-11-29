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

