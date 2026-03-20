# Node.js
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# 依存関係コピー
COPY package*.json ./

# install
RUN npm install

# 全コピー
COPY . .

# 開発サーバー起動
CMD ["npm", "run", "dev"]