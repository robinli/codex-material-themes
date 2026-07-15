"use client";

import { useEffect, useState } from "react";

type Locale = "zh" | "en";

type CodexTheme = {
  id: number;
  name: string;
  en: string;
  note: string;
  noteEn: string;
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
    noteEn: "Calm and low-glare, tuned for long reading sessions and focused work.",
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
    noteEn: "Warm walnut and cream tones, like a café reading table at dusk.",
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
    noteEn: "A gentle paper ground that recalls ink, letterpress, and old book pages.",
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
    noteEn: "Deep drafting blue with clear type, made for structured thinking.",
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
    noteEn: "Near-black neutrals and muted gold keep late-night work composed.",
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
    noteEn: "Neutral grey ink on recycled-paper tones: bright without the glare.",
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
    noteEn: "High-visibility green on deep black-green, crisp as a night instrument panel.",
    image: "/themes/Theme07.png",
    surface: "#111A14",
    ink: "#C4D7BE",
    accent: "#9FCB72",
    contrast: 75,
    value: 'codex-theme-v1:{"codeThemeId":"codex","theme":{"accent":"#9FCB72","contrast":75,"fonts":{"code":"Cascadia Mono","ui":"Satoshi"},"ink":"#C4D7BE","opaqueWindows":true,"semanticColors":{"diffAdded":"#86C68A","diffRemoved":"#D48178","skill":"#B79BCD"},"surface":"#111A14"},"variant":"dark"}',
  },
];

const copy = {
  zh: {
    navGuide: "匯入方式",
    navThemes: "7 組主題",
    eyebrow: "以真實材質校準數位閱讀",
    headline: <>把你的 Codex，<br />變成一張想久坐的桌子。</>,
    heroLead: "7 組從黑板、羊皮紙到儀器面板取材的外觀設定。看見實際效果，複製一行文字，即刻套用。",
    chooseTheme: "挑選主題",
    seeGuide: "先看匯入方式",
    heroMeta: ["實景預覽", "行文字套用", "次隨時切換"],
    heroMaterial: "深綠霧面 × 粉筆白 × 黃銅標記",
    guideTitle: "五步完成，不用改設定檔。",
    guideLead: "在 Codex 裡沿著以下路徑操作；複製主題時，請整行貼上。",
    steps: ["設定", "外觀", "匯入", "貼上", "匯入主題"],
    pathLabel: "路徑：",
    pathText: "設定 → 外觀 → 匯入 → 貼上完整文字 → 按下「匯入主題」。",
    opaqueNote: <>所有範例皆開啟 <code>opaqueWindows:true</code>，會關閉半透明側邊欄，讓色彩更接近實體材質。</>,
    collectionTitle: "選一種今天的閱讀環境。",
    collectionLead: "切換查看實際畫面與色票；按下複製後，直接回到 Codex 匯入。",
    listLabel: "Codex 主題清單",
    selected: "已選擇",
    background: "背景",
    text: "文字",
    accent: "強調",
    copyTheme: "複製這組設定",
    copied: "已複製，可以貼上了",
    copiedStatus: "的設定已複製到剪貼簿。",
    footer: "為長時間閱讀與工作而調製的 7 種數位材質。",
    backToTop: "回到頂端 ↑",
  },
  en: {
    navGuide: "How to import",
    navThemes: "7 themes",
    eyebrow: "Digital reading, calibrated to real materials",
    headline: <>Make Codex feel like<br />a desk worth staying at.</>,
    heroLead: "Seven appearance presets inspired by chalkboards, parchment, drafting tables, and field instruments. Preview the result, copy one line, and apply it instantly.",
    chooseTheme: "Choose a theme",
    seeGuide: "See how to import",
    heroMeta: ["real previews", "line to apply", "anytime switching"],
    heroMaterial: "Matte green × chalk white × brass accent",
    guideTitle: "Five steps. No config file editing.",
    guideLead: "Follow this path inside Codex. When copying a theme, paste the complete line.",
    steps: ["Settings", "Appearance", "Import", "Paste", "Import theme"],
    pathLabel: "Path: ",
    pathText: "Settings → Appearance → Import → paste the full line → select “Import theme.”",
    opaqueNote: <>Every preset uses <code>opaqueWindows:true</code>, disabling translucent sidebars so the colors stay closer to their physical references.</>,
    collectionTitle: "Choose today’s reading environment.",
    collectionLead: "Switch themes to inspect the real interface and palette, then copy the preset and import it in Codex.",
    listLabel: "Codex theme list",
    selected: "Selected",
    background: "Surface",
    text: "Ink",
    accent: "Accent",
    copyTheme: "Copy this preset",
    copied: "Copied — ready to paste",
    copiedStatus: " preset copied to the clipboard.",
    footer: "Seven digital materials tuned for long reading and focused work.",
    backToTop: "Back to top ↑",
  },
};

export default function Home() {
  const [selectedId, setSelectedId] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [locale, setLocale] = useState<Locale>("zh");
  const selected = themes.find((theme) => theme.id === selectedId) ?? themes[0];
  const t = copy[locale];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("codex-material-locale");
    const browserLocale = navigator.languages?.[0] ?? navigator.language;
    const detectedLocale: Locale = browserLocale.toLowerCase().startsWith("zh") ? "zh" : "en";
    const initialLocale: Locale = savedLocale === "zh" || savedLocale === "en" ? savedLocale : detectedLocale;
    setLocale(initialLocale);
    document.documentElement.lang = initialLocale === "zh" ? "zh-Hant" : "en";
  }, []);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("codex-material-locale", nextLocale);
    document.documentElement.lang = nextLocale === "zh" ? "zh-Hant" : "en";
  }

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
        <a className="brand" href="#top" aria-label={locale === "zh" ? "Codex 材質主題首頁" : "Codex Material Themes home"}>
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CODEX / MATERIAL THEMES</span>
        </a>
        <div className="header-actions">
          <nav aria-label={locale === "zh" ? "頁面導覽" : "Page navigation"}>
            <a href="#guide">{t.navGuide}</a>
            <a href="#themes">{t.navThemes}</a>
          </nav>
          <div className="language-switch" role="group" aria-label={locale === "zh" ? "選擇語言" : "Choose language"}>
            <button type="button" className={locale === "zh" ? "active" : ""} onClick={() => changeLocale("zh")} aria-pressed={locale === "zh"}>中</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={locale === "en" ? "active" : ""} onClick={() => changeLocale("en")} aria-pressed={locale === "en"}>EN</button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t.eyebrow}</p>
          <h1>{t.headline}</h1>
          <p className="hero-lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="button primary" href="#themes">{t.chooseTheme} <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#guide">{t.seeGuide} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-meta" aria-label={locale === "zh" ? "主題特色" : "Theme features"}>
            <div><strong>07</strong><span>{t.heroMeta[0]}</span></div>
            <div><strong>01</strong><span>{t.heroMeta[1]}</span></div>
            <div><strong>∞</strong><span>{t.heroMeta[2]}</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label={locale === "zh" ? "傳統綠色黑板主題預覽" : "Chalkboard Green theme preview"}>
          <div className="material-label">01 / CHALKBOARD GREEN</div>
          <div className="image-frame">
            <img src="/themes/Theme01.png" alt={locale === "zh" ? "Codex 套用傳統綠色黑板主題後的畫面" : "Codex with the Chalkboard Green theme applied"} />
          </div>
          <div className="hero-swatches" aria-hidden="true">
            <span style={{ background: "#18382B" }} />
            <span style={{ background: "#E8E3D3" }} />
            <span style={{ background: "#D4B95E" }} />
          </div>
          <p>{t.heroMaterial}</p>
        </div>
      </section>

      <section className="guide-section" id="guide">
        <div className="section-heading">
          <p className="section-index">01 / HOW TO APPLY</p>
          <div>
            <h2>{t.guideTitle}</h2>
            <p>{t.guideLead}</p>
          </div>
        </div>
        <ol className="steps">
          {t.steps.map((step, index) => (
            <li key={step}>
              <span className="step-number">0{index + 1}</span>
              <strong>{step}</strong>
              {index < t.steps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
        <div className="guide-note">
          <span className="note-mark" aria-hidden="true">i</span>
          <p><strong>{t.pathLabel}</strong>{t.pathText}<br />{t.opaqueNote}</p>
        </div>
      </section>

      <section className="themes-section" id="themes">
        <div className="section-heading inverse">
          <p className="section-index">02 / THE COLLECTION</p>
          <div>
            <h2>{t.collectionTitle}</h2>
            <p>{t.collectionLead}</p>
          </div>
        </div>

        <div className="theme-workbench">
          <div className="theme-list" role="list" aria-label={t.listLabel}>
            {themes.map((theme) => (
              <div className={`theme-row ${theme.id === selected.id ? "active" : ""}`} key={theme.id} role="listitem">
                <button className="theme-select" type="button" onClick={() => setSelectedId(theme.id)} aria-pressed={theme.id === selected.id}>
                  <span className="theme-no">0{theme.id}</span>
                  <span className="theme-name"><strong>{locale === "zh" ? theme.name : theme.en}</strong><small>{locale === "zh" ? theme.en : theme.name}</small></span>
                  <span className="mini-swatches" aria-hidden="true">
                    <i style={{ background: theme.surface }} />
                    <i style={{ background: theme.ink }} />
                    <i style={{ background: theme.accent }} />
                  </span>
                </button>
                <button className="quick-copy" type="button" onClick={() => copyTheme(theme)} aria-label={locale === "zh" ? `複製${theme.name}設定` : `Copy ${theme.en} preset`} title={t.copyTheme}>
                  {copiedId === theme.id ? "✓" : "＋"}
                </button>
              </div>
            ))}
          </div>

          <article className="theme-preview" style={{ "--theme-surface": selected.surface, "--theme-accent": selected.accent } as React.CSSProperties}>
            <div className="preview-topline">
              <span>{t.selected.toUpperCase()} / 0{selected.id}</span>
              <span>CONTRAST {selected.contrast}</span>
            </div>
            <div className="preview-image-wrap">
              <img src={selected.image} alt={locale === "zh" ? `Codex 套用${selected.name}主題後的實際畫面` : `Codex with the ${selected.en} theme applied`} />
            </div>
            <div className="preview-info">
              <div>
                <p className="preview-en">{locale === "zh" ? selected.en : selected.name}</p>
                <h3>{locale === "zh" ? selected.name : selected.en}</h3>
                <p>{locale === "zh" ? selected.note : selected.noteEn}</p>
              </div>
              <div className="palette" aria-label={locale === "zh" ? `${selected.name}主要色票` : `${selected.en} primary palette`}>
                <div><span style={{ background: selected.surface }} /><small>{t.background}<br />{selected.surface}</small></div>
                <div><span style={{ background: selected.ink }} /><small>{t.text}<br />{selected.ink}</small></div>
                <div><span style={{ background: selected.accent }} /><small>{t.accent}<br />{selected.accent}</small></div>
              </div>
            </div>
            <div className="copy-panel">
              <code>{selected.value}</code>
              <button className={`copy-button ${copiedId === selected.id ? "copied" : ""}`} type="button" onClick={() => copyTheme(selected)}>
                <span aria-hidden="true">{copiedId === selected.id ? "✓" : "⧉"}</span>
                {copiedId === selected.id ? t.copied : t.copyTheme}
              </button>
            </div>
          </article>
        </div>
        <p className="copy-status" aria-live="polite">{copiedId ? `${locale === "zh" ? themes[copiedId - 1].name : themes[copiedId - 1].en}${t.copiedStatus}` : ""}</p>
      </section>

      <footer>
        <div><span className="brand-mark" aria-hidden="true">C</span><strong>Codex Material Themes / Robin Li</strong></div>
        <p>{t.footer}</p>
        <a href="#top">{t.backToTop}</a>
      </footer>
    </main>
  );
}
