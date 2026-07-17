# Codex Material Themes

![Codex Material Themes](public/og.png)

Codex Material Themes 提供十二款適合不同工作情境的 Codex 主題。你可以透過網頁預覽主題並複製設定，也可以安裝 Codex Skill，在對話中描述偏好的明暗、色調、對比度或使用情境，由 Codex 推薦主題、協助選擇字體，並產生可匯入的主題設定。

範例網站：[https://codex-material-themes.bud4net.chatgpt.site/](https://codex-material-themes.bud4net.chatgpt.site/)

## 安裝 Codex Skill

在 Codex 對話中輸入：

```text
請安裝 Skill：
https://github.com/robinli/codex-material-themes/tree/main/.agents/skills/choose-codex-theme
```

安裝完成後，下一輪對話即可使用 Skill；若尚未出現在 Codex 中，請重新啟動 Codex。

## 使用 Codex Skill

在 Codex 對話中描述想要的色調、明暗、對比度或使用情境，例如：

```text
請使用 $choose-codex-theme，幫我找適合夜間長時間閱讀、低眩光的主題。
```

Skill 會依序引導完成以下步驟：

1. **選擇主題**：Codex 推薦一款適合情境的主題並顯示預覽圖。回覆「使用這個」即可確認，或回覆「換一個」取得其他建議。
2. **選擇字體**：確認主題後，Codex 會提供 UI 字體與程式碼字體選項。可以回覆「使用預設字體」，或分別指定已安裝的字體名稱。
3. **取得設定**：確認主題與兩種字體後，Codex 會產生一行完整的 `codex-theme-v1:` 主題設定。
4. **手動匯入**：依 Codex 提供的本地化步驟，前往 `設定 → 外觀 → 匯入`，貼上完整設定並選擇 `匯入主題`。英文版介面會顯示對應的英文選單名稱。

Skill 不會直接修改 Codex 設定或自動套用主題。匯入後若只關閉視窗仍未生效，請從工作管理員完整結束 Codex，再重新開啟。

---
## Edit the site

The example site is built with plain HTML, CSS, and browser JavaScript. It does not require React, a database, login, or an application server.

- `index.html`: page metadata and the HTML entry point.
- `public/site.js`: theme data, Chinese/English text, language switching, theme
  selection, and copy-to-clipboard interaction.
- `public/site.css`: layout and visual styling.
- `public/themes/`: the twelve preview images.

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
