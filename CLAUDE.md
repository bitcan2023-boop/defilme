# DeFilMe サイト（defilme.com）

GitHub Pages で公開している静的サイト。ビルド工程はなく、`main` に push した内容がそのまま本番になる。

- 本番: https://defilme.com
- リポジトリ: `bitcan2023-boop/defilme`（ブランチ `main`）
- CMS: https://defilme.com/admin （作品・ニュースの更新はここから。`works-data.js` / `news.json` に直接コミットされる）
- 運営マニュアル（Notion）: https://app.notion.com/p/38bf7a04c7b681879b49e469a38885ca

## 着手前に必ずやること

**編集を始める前に、必ずライブ最新へ追随する。**

```bash
git -C ~/Documents/GitHub/defilme fetch origin && git -C ~/Documents/GitHub/defilme status
```

このローカルクローンは**しばしば数十コミット遅れている**。CMSがブラウザから直接GitHubへコミットするため、ローカルで作業している間にもリモートが進む。「最新のはず」と信用しないこと。

2026-06-30、古いローカルコピーを元にデプロイしてライブ最新を全消しする事故が起きている。デスクトップ配下の `_ARCHIVE_DO-NOT-USE_*` は編集元にしない。

## デプロイ

`main` への push がそのままデプロイ。反映まで1〜2分。

```bash
git -C ~/Documents/GitHub/defilme push origin main
```

- 認証は SSH 鍵（`~/.ssh/id_ed25519`、GitHubに登録済み）
- push が拒否されたらリモートが進んでいる。`git pull --rebase origin main` してから push
- 確認はシークレットウィンドウで（GitHub Pagesはキャッシュが残る）

以前は `deploy.html` にPATを入力する方式だったが、Claude Code からは上記の push に置き換えた。

## 戻したいとき

```bash
git -C ~/Documents/GitHub/defilme log --oneline -10
git -C ~/Documents/GitHub/defilme revert <SHA>   # 打ち消しコミットを積む（履歴が残るのでこちらを優先）
```

`reset --hard` + force push は最終手段。CMSからのコミットを巻き込んで消す危険がある。

## バックアップ（自動）

`~/defilme-backup.sh` が launchd（`com.defilme.backup`）で毎日3時に動く。

- `~/Documents/DeFilMe-バックアップ/repo/` … ライブ最新のミラー
- このクローンも `git pull --ff-only` で追随（**未コミット変更やローカル未pushコミットがある時はスキップされる**ので、その間は自動同期が止まる点に注意）
- ログ: `~/Documents/DeFilMe-バックアップ/backup.log`

## 画像のルール

**必ず表示サイズに合わせてから入れる。** 過去にリポジトリの画像が236MBまで膨らんだ（20MBの写真が1枚混ざっていた）。

| 用途 | 上限 | 品質 |
|---|---|---|
| Worksのカードサムネ（4:5表示） | 高さ1200px | q90 |
| 16:9の映像サムネ（4:5に切られる） | 幅2000px | q88 |
| ギャラリー／NEWSの写真（ライトボックス表示） | 高さ2600px・幅3400px | q94 |
| トップのナビ画像（3カラム4:3） | 長辺1600px | q88 |

ライトボックスは `max-height: 90〜92vh` なので、高さ2600pxを超える画素は5Kディスプレイの全画面でも表示に使われない。

PNGの写真は必ずJPEGへ。サムネをギャラリー用のフル解像度写真で兼用しない（専用の `*_thumb.jpg` を作る）。

## 日本語ファイル名の落とし穴

macOSはファイル名をNFD（分解形）で保持することがあり、リポジトリ内でもNFC/NFDが混在している（`しがらみMVサムネ2_2` はNFD、他はNFC）。

- ファイルの存在確認や `grep` は `unicodedata.normalize()` で両方試すこと。素朴に比較すると「無い」と誤判定する
- 新規ファイルはNFCで統一する

## 主要ファイル

| ファイル | 役割 |
|---|---|
| `index.html` | トップ |
| `works.html` / `work-detail.html` | 作品一覧・詳細 |
| `news.html` / `news-detail.html` | ニュース |
| `works-data.js` / `news.json` | **CMSが生成。手で書き換えるときは競合に注意** |
| `admin.html`, `admin/` | CMS本体 |
| `style.css` | 共通スタイル |
| `CNAME`, `.nojekyll` | GitHub Pages設定。触らない |

作品カードの縦横比は `works.html` の `.work-item-thumb`（既定 16/10、`orientation: "portrait"` で 4/5）。現状すべての作品が portrait。
