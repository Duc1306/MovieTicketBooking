🎬 Movie Ticket Booking System
📖 プロジェクト概要 

このプロジェクトは、映画チケットをオンラインで予約できる フルスタック Web アプリケーション です。
ユーザーは上映スケジュールを確認し、座席を選択してオンライン決済まで行えます。
管理者は映画や上映スケジュール、シアタールーム、売上レポートを効率的に管理することができます。

🎯 開発目的 

アナログなチケット販売を効率化し、ユーザー体験を向上させる

座席予約や二重予約の課題を解決する

管理者が収益や上映スケジュールを簡単に把握できる仕組みを構築する

🔑 主な機能 
👤 ユーザー機能

会員登録 / ログイン（Clerk 認証 + JWT）

映画一覧・詳細・トレーラー表示

上映スケジュール & 座席選択

チケット予約 & オンライン決済

予約履歴の管理

🛠 管理者機能

映画・上映スケジュール・シアタールーム管理

売上レポート出力

ユーザー管理

🚀 技術スタック (Tech Stack)

フロントエンド: React, Vite, TailwindCSS, Lucide Icons

バックエンド: Node.js, Express

データベース: MongoDB

認証: Clerk (JWT)

その他: Inngest (イベント駆動関数), REST API, Git

🛠️ セットアップ方法
1. server
cd backend
npm server
npm run server

2. client
cd client
npm install
npm run dev

👥 開発体制 (Team & Role)

開発期間: 約4ヶ月

開発者: 個人 (フルスタック担当)

役割:

システム設計

バックエンド API 実装

フロントエンド UI 開発

認証 / 決済機能統合

デプロイ & テスト

🌟 工夫したポイント (Highlights)

UI/UX → API → DB → 認証 → 決済まで エンドツーエンド開発を経験

イベント駆動処理 (Inngest) により二重予約を防止

JWT + Clerk によるセキュアなログイン処理

レスポンシブデザインを採用し、PC / モバイル両対応

拡張性を意識した設計（ポイント制度、複数映画館対応などへの拡張が容易）

👤 作者 (Author)

Trinh Minh Duc  – Fullstack Developer
GitHub: https://github.com/Duc1306/MovieTicketBooking
