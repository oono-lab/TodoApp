# プロジェクト起動手順

## 前提条件

- Docker / Docker Compose
- Git Bash（Windowsの場合）
- Node.js（推奨バージョン：v18以上）
- Java（推奨：17以上）
- Maven（手動インストール手順は下記）

---

## Backend の起動手順

1. `backend` ディレクトリに移動:

   ```bash
   cd backend
2. `docker-compose.yml` が存在することを確認し、以下のコマンドを実行:
   
   ```bash
   docker-compose up --build

✅ [backend] という名前の Docker コンテナが起動されればOK。


## Maven が未インストールの場合の手順（Windows）

1. [Maven公式サイト](https://maven.apache.org/download.cgi) にアクセスし、  
   `apache-maven-3.9.10-bin.zip` をダウンロードします。

2. ZIPファイルを解凍します（例：`C:\Users\あなたの名前\Downloads\apache-maven-3.9.10-bin`）。

3. 解凍したディレクトリの中にある `bin` フォルダのパスをコピーします。例：C:\Users\あなたの名前\Downloads\apache-maven-3.9.10-bin\apache-maven-3.9.10\bin


4. システム環境変数を開き、**ユーザー環境変数**の「Path」に上記のパスを追加します。

5. Git Bash またはコマンドプロンプトを開いて、以下のコマンドでインストール確認をします：

   ```bash
   mvn -v

✅ Maven のバージョン情報が表示されればインストール完了です。


## Spring Boot の実行手順

1. `backend` ディレクトリに移動します。

   ```bash
   cd backend
2. 以下のコマンドで Spring Boot アプリケーションを起動します：

   ```bash
   mvn spring-boot:run

3. 起動に成功すると、以下のようなログが表示されます：

   ```bash
   process running for {数字}
4.注意：このターミナル（Git Bash）はバックエンドのプロセスが実行中のため、閉じずにそのままにしておいてください。

5.次の手順として、別の Git Bash を開き frontend ディレクトリでフロントエンドの起動に進みます。


## Frontend の起動手順

1. 新しく開いた Git Bash（または別のターミナル）で `frontend` ディレクトリに移動します。

   ```bash
   cd frontend
2. 必要なパッケージをインストールします。

   ```bash
   npm install
3. 開発サーバーを起動します。

   ```bash
   npm run start

4. 起動後、ブラウザが自動的に開き、以下のような画面が表示されれば成功です。
✅ 通常、http://localhost:3000 にアクセスされます。

## 動作デモ（動画挿入場所）

以下はアプリケーション実行後の動作デモです。

[![アプリケーションデモ][([https://img.youtube.com/vi/動画ID/0.jpg)](https://www.youtube.com/watch?v=動画ID](https://youtu.be/n0WkQtPHH7I))](https://youtu.be/n0WkQtPHH7I)


---



