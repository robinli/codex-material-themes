# Codex Material Themes

Codex Material Themes 提供七款適合不同工作情境的 Codex 主題。你可以透過網頁預覽主題並複製設定，也可以安裝 Codex Skill，在對話中描述偏好的明暗、色調、對比度或使用情境，由 Codex 推薦主題、協助選擇字體，並產生可匯入的主題設定。

範例網站：[https://codex-material-themes.bud4net.chatgpt.site/](https://codex-material-themes.bud4net.chatgpt.site/)

## 安裝 Codex Skill

在 Codex 對話中輸入：

```text
請安裝 Skill：
https://github.com/robinli/codex-material-themes/tree/main/.agents/skills/choose-codex-theme
```

## Edit the site

![Codex Material Themes preview](public/readme-preview.png)

The example site is built with plain HTML, CSS, and browser JavaScript. It does not require React, a database, login, or an application server.

- `index.html`: page metadata and the HTML entry point.
- `public/site.js`: theme data, Chinese/English text, language switching, theme
  selection, and copy-to-clipboard interaction.
- `public/site.css`: layout and visual styling.
- `public/themes/`: the seven preview images.

## Run locally

```powershell
npm install
npm run dev
```

## Build and publish

```powershell
npm run build
```

The browser files are generated in `dist/client`. `dist/server` contains only a
small Sites-compatible entry point that forwards requests to those static files.
Both folders are deployment output and are ignored by Git.
