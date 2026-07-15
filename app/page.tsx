"use client";

import { useState } from "react";

type CodexTheme = {
  id: number;
  name: string;
  en: string;
  note: string;
  image: string;
  surface: string;
  ink: string;
  accent: string;
  contrast: number;
  value: string;
};

const themes: CodexTheme[] = [
  {
    id: 1,
    name: "傳統綠色黑板",
    en: "Chalkboard Green",
    note: "沉靜、低反光，適合長時間閱讀與專注工作。",
    image: "/themes/Theme01.png",
    surface: "#18382B",
    ink: "#E8E3D3",
    accent: "#D4B95E",
    contrast: 68,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#D4B95E","contrast":68,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#E8E3D3","opaqueWindows":true,"semanticColors":{"diffAdded":"#9EBB84","diffRemoved":"#D9907E","skill":"#C3A7D8"},"surface":"#18382B"},"variant":"dark"}',
  },
  {
    id: 2,
    name: "老式咖啡館木桌",
    en: "Café Walnut",
    note: "暖木色與奶油字色，像黃昏咖啡館的閱讀桌。",
    image: "/themes/Theme02.png",
    surface: "#3A241B",
    ink: "#F1E2CF",
    accent: "#D6A756",
    contrast: 70,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#D6A756","contrast":70,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#F1E2CF","opaqueWindows":true,"semanticColors":{"diffAdded":"#9CAF78","diffRemoved":"#C9705C","skill":"#B88FAF"},"surface":"#3A241B"},"variant":"dark"}',
  },
  {
    id: 3,
    name: "羊皮紙與墨水",
    en: "Parchment & Ink",
    note: "柔和紙張底色，重現鉛字與舊書頁的閱讀感。",
    image: "/themes/Theme03.png",
    surface: "#E4D8BE",
    ink: "#302A25",
    accent: "#8C5A3C",
    contrast: 72,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#8C5A3C","contrast":72,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#302A25","opaqueWindows":true,"semanticColors":{"diffAdded":"#477A4A","diffRemoved":"#A3433E","skill":"#76518A"},"surface":"#E4D8BE"},"variant":"dark"}',
  },
  {
    id: 4,
    name: "藍圖工程桌",
    en: "Drafting Blue",
    note: "深藍工作面搭配清亮文字，適合結構化思考。",
    image: "/themes/Theme04.png",
    surface: "#163A52",
    ink: "#DCE8EC",
    accent: "#E0B85C",
    contrast: 70,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#E0B85C","contrast":70,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#DCE8EC","opaqueWindows":true,"semanticColors":{"diffAdded":"#88C6A2","diffRemoved":"#E39488","skill":"#C3A6D9"},"surface":"#163A52"},"variant":"dark"}',
  },
  {
    id: 5,
    name: "深夜書房",
    en: "Midnight Study",
    note: "近黑灰階與低彩度金色，讓深夜畫面維持安定。",
    image: "/themes/Theme05.png",
    surface: "#181817",
    ink: "#D5D0C7",
    accent: "#BFA36A",
    contrast: 62,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#BFA36A","contrast":62,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#D5D0C7","opaqueWindows":true,"semanticColors":{"diffAdded":"#899A7C","diffRemoved":"#B8776E","skill":"#9D91AA"},"surface":"#181817"},"variant":"dark"}',
  },
  {
    id: 6,
    name: "墨水灰與再生紙",
    en: "Recycled Paper",
    note: "中性灰墨與再生紙色，明亮但不刺眼。",
    image: "/themes/Theme06.png",
    surface: "#D3CEC3",
    ink: "#333230",
    accent: "#A9784D",
    contrast: 69,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#A9784D","contrast":69,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#333230","opaqueWindows":true,"semanticColors":{"diffAdded":"#4F7C55","diffRemoved":"#A84E47","skill":"#76588A"},"surface":"#D3CEC3"},"variant":"dark"}',
  },
  {
    id: 7,
    name: "軍用儀器面板",
    en: "Field Instrument",
    note: "高辨識螢光綠與深黑綠，俐落如夜間儀表。",
    image: "/themes/Theme07.png",
    surface: "#111A14",
    ink: "#C4D7BE",
    accent: "#9FCB72",
    contrast: 75,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#9FCB72","contrast":75,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#C4D7BE","opaqueWindows":true,"semanticColors":{"diffAdded":"#86C68A","diffRemoved":"#D48178","skill":"#B79BCD"},"surface":"#111A14"},"variant":"dark"}',
  },
];

const steps = ["設定", "外觀", "匯入", "貼上", "匯入主題"];

export default function Home() {
  const [selectedId, setSelectedId] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const selected = themes.find((theme) => theme.id === selectedId) ?? themes[0];

  async function copyTheme(theme: CodexTheme) {
    try {
      await navigator.clipboard.writeText(theme.value);
    } catch {
      const field = document.createElement("textarea");
      field.value = theme.value;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopiedId(theme.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Codex 材質主題首頁">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CODEX / MATERIAL THEMES</span>
        </a>
        <nav aria-label="頁面導覽">
          <a href="#guide">匯入方式</a>
          <a href="#themes">7 組主題</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> 以真實材質校準數位閱讀</p>
          <h1>把你的 Codex，<br />變成一張想久坐的桌子。</h1>
          <p className="hero-lead">
            7 組從黑板、羊皮紙到儀器面板取材的外觀設定。看見實際效果，複製一行文字，即刻套用。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#themes">挑選主題 <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#guide">先看匯入方式 <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-meta" aria-label="主題特色">
            <div><strong>07</strong><span>實景預覽</span></div>
            <div><strong>01</strong><span>行文字套用</span></div>
            <div><strong>∞</strong><span>次隨時切換</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="傳統綠色黑板主題預覽">
          <div className="material-label">01 / CHALKBOARD GREEN</div>
          <div className="image-frame">
            <img src="/themes/Theme01.png" alt="Codex 套用傳統綠色黑板主題後的畫面" />
          </div>
          <div className="hero-swatches" aria-hidden="true">
            <span style={{ background: "#18382B" }} />
            <span style={{ background: "#E8E3D3" }} />
            <span style={{ background: "#D4B95E" }} />
          </div>
          <p>深綠霧面 × 粉筆白 × 黃銅標記</p>
        </div>
      </section>

      <section className="guide-section" id="guide">
        <div className="section-heading">
          <p className="section-index">01 / HOW TO APPLY</p>
          <div>
            <h2>五步完成，不用改設定檔。</h2>
            <p>在 Codex 裡沿著以下路徑操作；複製主題時，請整行貼上。</p>
          </div>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step}>
              <span className="step-number">0{index + 1}</span>
              <strong>{step}</strong>
              {index < steps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
        <div className="guide-note">
          <span className="note-mark" aria-hidden="true">i</span>
          <p><strong>路徑：</strong>設定 → 外觀 → 匯入 → 貼上完整文字 → 按下「匯入主題」。<br />所有範例皆開啟 <code>opaqueWindows:true</code>，會關閉半透明側邊欄，讓色彩更接近實體材質。</p>
        </div>
      </section>

      <section className="themes-section" id="themes">
        <div className="section-heading inverse">
          <p className="section-index">02 / THE COLLECTION</p>
          <div>
            <h2>選一種今天的閱讀環境。</h2>
            <p>切換查看實際畫面與色票；按下複製後，直接回到 Codex 匯入。</p>
          </div>
        </div>

        <div className="theme-workbench">
          <div className="theme-list" role="list" aria-label="Codex 主題清單">
            {themes.map((theme) => (
              <div className={`theme-row ${theme.id === selected.id ? "active" : ""}`} key={theme.id} role="listitem">
                <button className="theme-select" type="button" onClick={() => setSelectedId(theme.id)} aria-pressed={theme.id === selected.id}>
                  <span className="theme-no">0{theme.id}</span>
                  <span className="theme-name"><strong>{theme.name}</strong><small>{theme.en}</small></span>
                  <span className="mini-swatches" aria-hidden="true">
                    <i style={{ background: theme.surface }} />
                    <i style={{ background: theme.ink }} />
                    <i style={{ background: theme.accent }} />
                  </span>
                </button>
                <button className="quick-copy" type="button" onClick={() => copyTheme(theme)} aria-label={`複製${theme.name}設定`} title="複製設定">
                  {copiedId === theme.id ? "✓" : "＋"}
                </button>
              </div>
            ))}
          </div>

          <article className="theme-preview" style={{ "--theme-surface": selected.surface, "--theme-accent": selected.accent } as React.CSSProperties}>
            <div className="preview-topline">
              <span>SELECTED / 0{selected.id}</span>
              <span>CONTRAST {selected.contrast}</span>
            </div>
            <div className="preview-image-wrap">
              <img src={selected.image} alt={`Codex 套用${selected.name}主題後的實際畫面`} />
            </div>
            <div className="preview-info">
              <div>
                <p className="preview-en">{selected.en}</p>
                <h3>{selected.name}</h3>
                <p>{selected.note}</p>
              </div>
              <div className="palette" aria-label={`${selected.name}主要色票`}>
                <div><span style={{ background: selected.surface }} /><small>背景<br />{selected.surface}</small></div>
                <div><span style={{ background: selected.ink }} /><small>文字<br />{selected.ink}</small></div>
                <div><span style={{ background: selected.accent }} /><small>強調<br />{selected.accent}</small></div>
              </div>
            </div>
            <div className="copy-panel">
              <code>{selected.value}</code>
              <button className={`copy-button ${copiedId === selected.id ? "copied" : ""}`} type="button" onClick={() => copyTheme(selected)}>
                <span aria-hidden="true">{copiedId === selected.id ? "✓" : "⧉"}</span>
                {copiedId === selected.id ? "已複製，可以貼上了" : "複製這組設定"}
              </button>
            </div>
          </article>
        </div>
        <p className="copy-status" aria-live="polite">{copiedId ? `${themes[copiedId - 1].name}的設定已複製到剪貼簿。` : ""}</p>
      </section>

      <footer>
        <div><span className="brand-mark" aria-hidden="true">C</span><strong>Codex Material Themes</strong></div>
        <p>為長時間閱讀與工作而調製的 7 種數位材質。</p>
        <a href="#top">回到頂端 ↑</a>
      </footer>
    </main>
  );
}
