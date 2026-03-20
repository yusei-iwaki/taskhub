# TaskHub（仮） - 技術検証用タスク管理 + API公開サービス

## 概要

本プロジェクトは、SES案件で想定されるモダンなWeb開発スタックを網羅的に学習することを目的とした、タスク管理サービスです。
単なるCRUDアプリではなく、API公開・IaC・CI/CDまで含めた実践的な構成を採用しています。

---

## 使用技術

### フロントエンド / バックエンド

* Next.js (App Router)
* TypeScript
* HTML / CSS

### API / スキーマ

* OpenAPI（Swagger）

### ORM

* Prisma

### インフラ

* AWS
* Terraform（HCL）

### データベース

* Aurora MySQL

### 開発環境

* Docker
* DevContainer
* VSCode

### CI/CD

* GitHub Actions

---

## アーキテクチャ概要

```
[ Next.js ]
   ├─ App Router（UI）
   ├─ Server Actions / API Routes
   └─ OpenAPI エンドポイント

[ Prisma ]
   └─ MySQL（ローカル）→ Aurora（本番）

[ Docker / DevContainer ]
   └─ 開発環境統一

[ GitHub Actions ]
   ├─ Lint
   ├─ Build
   └─ Deploy

[ Terraform ]
   └─ AWSインフラ構築
```

---

## セットアップ手順

### 前提条件

* Docker / Docker Compose
* Node.js（LTS）
* VSCode（DevContainer拡張推奨）

---

## 開発ステップ

---

### Step1：ローカル開発環境構築（MVP作成）

#### 目的

アプリケーションの基本機能（CRUD）をローカルで動作させる

#### 実施内容

* Next.js プロジェクト作成
* Prisma セットアップ
* MySQL（Docker）起動
* タスク管理機能実装

  * ユーザー登録 / ログイン
  * タスクCRUD
  * ステータス管理（TODO / DOING / DONE）

#### コマンド例

```bash
docker-compose up -d
npx prisma migrate dev
npm run dev
```

---

### Step2：OpenAPI導入

#### 目的

API仕様を明文化し、外部公開を想定した設計にする

#### 実施内容

* OpenAPIスキーマ作成
* API Routesとスキーマの統一
* Swagger UI導入

#### 成果物

* `/openapi.yaml`
* `/api/*` エンドポイント

---

### Step3：Docker / DevContainer対応

#### 目的

開発環境の統一と再現性の確保

#### 実施内容

* Dockerfile作成
* docker-compose整備
* DevContainer設定（.devcontainer）

#### 確認項目

* コンテナ起動のみで開発可能
* 環境差異が発生しない

---

### Step4：CI/CD構築（GitHub Actions）

#### 目的

自動化による品質担保

#### 実施内容

* GitHub Actionsワークフロー作成

#### 内容

* Lint
* Build
* Prisma generate
* （余裕があれば）テスト

#### サンプルフロー

```yaml
- install dependencies
- run lint
- build app
```

---

### Step5：AWS + Terraformによるインフラ構築

#### 目的

本番環境をコードで管理（IaC）

#### 実施内容

* Terraformで以下を構築

  * VPC
  * Aurora MySQL
  * ECS または App Runner
  * ECR
  * IAM

#### デプロイフロー

1. Dockerイメージ作成
2. ECRへpush
3. ECS / App Runnerへデプロイ

#### Terraform実行

```bash
terraform init
terraform plan
terraform apply
```

---

## ディレクトリ構成（例）

```
.
├── app/                # Next.js App Router
├── components/
├── lib/
├── prisma/
│   └── schema.prisma
├── openapi/
│   └── openapi.yaml
├── terraform/
├── .devcontainer/
├── docker-compose.yml
├── Dockerfile
└── .github/workflows/
```

---

## 今後の拡張予定

* APIキー認証
* 権限管理（RBAC）
* コメント機能
* 検索 / フィルタ
* Webhook
* リアルタイム更新（WebSocket）

---

## 学習ポイント

本プロジェクトで習得できる内容：

* フルスタック開発（Next.js + Prisma）
* API設計（OpenAPI）
* コンテナ開発（Docker / DevContainer）
* CI/CD（GitHub Actions）
* IaC（Terraform）
* AWSを用いた実践的なインフラ構築

---

## 想定ユースケース

* SES案件の事前準備
* ポートフォリオ作成
* モダンWeb開発のキャッチアップ

---

## 備考

本プロジェクトは学習目的のため、段階的に機能追加・改善を行う前提とする。
