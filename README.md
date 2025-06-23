# プロジェクトの実行方法

このリポジトリでは、`backend` と `frontend` の2つのディレクトリに分かれて構成されています。以下の手順に従って、ローカル環境でアプリケーションを起動できます。

---

## 📦 Backend の起動方法

1. `backend` ディレクトリに移動します。

   ```bash
   cd backend
docker-compose.yml があることを確認し、以下のコマンドを実行して Docker コンテナをビルド＆起動します。

bash
コピーする
編集する
docker-compose up --build
✅ [backend] という名前のコンテナが起動されれば成功です。

Maven がインストールされていない場合は、以下の手順でインストールします。

Maven公式サイト から apache-maven-3.9.10-bin.zip をダウンロード

解凍後、ユーザー環境変数の Path に以下を追加
例：

python
コピーする
編集する
C:\User\Downloads\apache-maven-3.9.10-bin\apache-maven-3.9.10\bin
Git Bash などで以下を実行してバージョン確認

bash
コピーする
編集する
mvn -v
backend を実行

bash
コピーする
編集する
mvn spring-boot:run
✅ process running for {数字} と表示されればOKです。

🌐 Frontend の起動方法
別のターミナル（Git Bashなど）を開き、frontend ディレクトリに移動します。

bash
コピーする
編集する
cd frontend
依存パッケージをインストール

bash
コピーする
編集する
npm install
フロントエンドを起動

bash
コピーする
編集する
npm run start
✅ 以下のような画面が表示されれば成功です。

🎥 動作イメージ
<!-- 動画やGIFをこの下に挿入してください -->

<!-- または YouTube を使用する場合は以下を使ってください --> <!-- [![Demo Video](https://img.youtube.com/vi/動画ID/0.jpg)](https://www.youtube.com/watch?v=動画ID) -->
