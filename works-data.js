/**
 * works-data.js — 作品データ管理
 *
 * ▼ 作品を追加するには、このファイルの WORKS_DATA 配列に追記してください。
 *
 * 各作品の構造:
 * {
 *   id:         "一意のID（URLに使用。英数字とハイフンのみ）",
 *   category:   "videography" または "photography",
 *   sub:        カテゴリ内分類
 *               videography: "music-video" / "live-shoot" / "documentary" / "snap"
 *               photography: "portrait" / "snap"
 *   title:      "作品タイトル",
 *   date:       "2025-12",   // 年月
 *   client:     "クライアント名（任意）",
 *   description:"説明文（任意）",
 *   thumb:      "サムネイル画像パス",
 *   media: [    // 詳細ページに表示するメディア（順番通りに表示）
 *     { type: "image", src: "画像パス", caption: "キャプション（任意）" },
 *     { type: "video", src: "動画パス", caption: "キャプション（任意）" },
 *     { type: "youtube", id: "YouTubeのビデオID", caption: "キャプション（任意）" },
 *   ]
 * }
 */

const WORKS_DATA = [
  {
    id: "kanjo-wonderland",
    category: "videography",
    sub: "music-video",
    title: "感情ワンダーランド",
    date: "2025-12",
    client: "UIMUI",
    description: "UIMUI New Single「感情ワンダーランド」Music Video。",
    thumb: "kanjo-wonderland.png",
    displayTitle: 'UIMUI - MV "感情ワンダーランド"',
    media: [
      { type: "image", src: "kanjo-wonderland.png", caption: "感情ワンダーランド — UIMUI" },
    ]
  },

  // ▼ 作品を追加する場合はここに追記 ▼
  // {
  //   id: "sample-work",
  //   category: "photography",
  //   sub: "portrait",
  //   title: "作品タイトル",
  //   date: "2026-01",
  //   client: "クライアント名",
  //   description: "作品の説明文",
  //   thumb: "images/sample-thumb.jpg",
  //   media: [
  //     { type: "image", src: "images/sample-1.jpg" },
  //     { type: "image", src: "images/sample-2.jpg" },
  //     { type: "video", src: "videos/sample.mp4" },
  //   ]
  // },
];
