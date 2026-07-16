const siteAssetBase = location.protocol === "file:" ? "./public/" : "./";

const fontOptions = {
  ui: ["Noto Sans TC", "Microsoft JhengHei UI", "Segoe UI Variable"],
  code: ["Cascadia Mono", "Cascadia Code", "JetBrains Mono", "monospace"],
};

const themes = [
  ["Chalkboard Green", "黑板綠", "Calm and low-glare, tuned for long reading sessions and focused work.", "沉穩低眩光，適合長時間閱讀與專注工作。", "#18382B", "#E8E3D3", "#D4B95E", 68],
  ["Cafe Walnut", "咖啡胡桃木", "Warm walnut and cream tones, like a cafe reading table at dusk.", "溫暖的胡桃木與奶油色，像傍晚咖啡館的閱讀桌。", "#3A241B", "#F1E2CF", "#D6A756", 70],
  ["Parchment & Ink", "羊皮紙與墨", "A gentle paper ground that recalls ink, letterpress, and old book pages.", "柔和紙質底色，令人想起墨水、活字印刷與舊書頁。", "#E4D8BE", "#302A25", "#8C5A3C", 72],
  ["Drafting Blue", "製圖藍", "Deep drafting blue with clear type, made for structured thinking.", "深邃製圖藍與清晰字體，為結構化思考而設計。", "#163A52", "#DCE8EC", "#E0B85C", 70],
  ["Midnight Study", "午夜研讀", "Near-black neutrals and muted gold keep late-night work composed.", "近黑中性色與低調金色，讓深夜工作保持平靜。", "#181817", "#D5D0C7", "#BFA36A", 62],
  ["Recycled Paper", "再生紙", "Neutral grey ink on recycled-paper tones: bright without the glare.", "中性灰墨搭配再生紙色調：明亮卻不刺眼。", "#D3CEC3", "#333230", "#A9784D", 69],
  ["Field Instrument", "野外儀器", "High-visibility green on deep black-green, crisp as a night instrument panel.", "高辨識綠色置於深黑綠底，如夜間儀器面板般清晰。", "#111A14", "#C4D7BE", "#9FCB72", 75],
].map(([en, zh, noteEn, noteZh, surface, ink, accent, contrast], index) => ({
  id: index + 1, en, zh, noteEn, noteZh, surface, ink, accent, contrast,
  image: `${siteAssetBase}themes/Theme${String(index + 1).padStart(2, "0")}.png`,
}));

const copy = {
  zh: { guide: "匯入方式", themes: "7 款主題", eyebrow: "數位閱讀，向真實材質校準", title: "讓 Codex 像一張\n值得久坐的桌子。", lead: "七款介面預設，靈感來自黑板、羊皮紙、製圖桌與野外儀器。預覽效果、複製一行設定，立即套用。", choose: "選擇主題", how: "查看匯入方式", meta: ["真實預覽", "一行套用", "隨時切換"], guideTitle: "五個步驟，不必編輯設定檔。", guideLead: "在 Codex 內依此路徑操作；貼上時請保留完整設定行。", steps: ["設定", "外觀", "匯入", "貼上", "匯入主題"], path: "設定 → 外觀 → 匯入 → 貼上完整設定行 → 選擇「匯入主題」。", collection: "選一個今天的閱讀環境。", collectionLead: "切換主題以查看實際介面與色盤，再複製預設並在 Codex 匯入。", selected: "已選擇", surface: "背景", ink: "文字", accent: "強調色", fonts: "字體設定", fontHint: "從下拉選項選擇，或直接輸入其他字體名稱。", uiFont: "UI 字體", codeFont: "程式碼字體", showFontOptions: "顯示字體選項", copy: "複製主題設定", copied: "已複製設定", footer: "七種數位材質，為長時間閱讀與專注工作調校。", top: "回到頂端" },
  en: { guide: "How to import", themes: "7 themes", eyebrow: "Digital reading, calibrated to real materials", title: "Make Codex feel like\na desk worth staying at.", lead: "Seven appearance presets inspired by chalkboards, parchment, drafting tables, and field instruments. Preview the result, copy one line, and apply it instantly.", choose: "Choose a theme", how: "See how to import", meta: ["real previews", "line to apply", "anytime switching"], guideTitle: "Five steps. No config file editing.", guideLead: "Follow this path inside Codex. When copying a theme, paste the complete line.", steps: ["Settings", "Appearance", "Import", "Paste", "Import theme"], path: "Settings → Appearance → Import → paste the full line → select “Import theme”.", collection: "Choose today’s reading environment.", collectionLead: "Switch themes to inspect the real interface and palette, then copy the preset and import it in Codex.", selected: "Selected", surface: "Surface", ink: "Ink", accent: "Accent", fonts: "Font settings", fontHint: "Choose from the dropdown or enter another font name.", uiFont: "UI font", codeFont: "Code font", showFontOptions: "Show font options", copy: "Copy theme settings", copied: "Settings copied", footer: "Seven digital materials tuned for long reading and focused work.", top: "Back to top" },
};

let locale = localStorage.getItem("codex-material-locale") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
let selectedId = 1;
const selectedFonts = {
  ui: localStorage.getItem("codex-material-ui-font") || fontOptions.ui[0],
  code: localStorage.getItem("codex-material-code-font") || fontOptions.code[0],
};
const app = document.querySelector("#app");
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

function themeValue(theme) {
  return `codex-theme-v1:${JSON.stringify({
    codeThemeId: "codex",
    theme: {
      accent: theme.accent,
      contrast: theme.contrast,
      fonts: { code: selectedFonts.code, ui: selectedFonts.ui },
      ink: theme.ink,
      opaqueWindows: true,
      semanticColors: {
        diffAdded: theme.id === 3 || theme.id === 6 ? "#477A4A" : "#9EBB84",
        diffRemoved: "#D9907E",
        skill: "#C3A7D8",
      },
      surface: theme.surface,
    },
    variant: "dark",
  })}`;
}

function updateThemeCode() {
  const themeCode = document.querySelector(".copy-panel code");
  if (themeCode) themeCode.textContent = themeValue(themes[selectedId - 1]);
}

function closeFontMenus() {
  document.querySelectorAll(".font-combobox").forEach((combobox) => {
    combobox.querySelector(".font-menu").hidden = true;
    combobox.querySelector(".font-toggle").setAttribute("aria-expanded", "false");
    combobox.querySelector("input").setAttribute("aria-expanded", "false");
  });
}

function openFontMenu(type) {
  closeFontMenus();
  const combobox = document.querySelector(`[data-font-combobox="${type}"]`);
  if (!combobox) return;
  combobox.querySelector(".font-menu").hidden = false;
  combobox.querySelector(".font-toggle").setAttribute("aria-expanded", "true");
  combobox.querySelector("input").setAttribute("aria-expanded", "true");
}

function setFont(type, value) {
  selectedFonts[type] = value.trim() || fontOptions[type][0];
  localStorage.setItem(`codex-material-${type}-font`, selectedFonts[type]);
  const input = document.querySelector(`input[data-font="${type}"]`);
  if (input) input.value = selectedFonts[type];
  document.querySelectorAll(`[data-font-combobox="${type}"] [data-font-option]`).forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.fontOption === selectedFonts[type]));
  });
  updateThemeCode();
}

function render() {
  const t = copy[locale];
  const selected = themes[selectedId - 1];
  document.documentElement.lang = locale === "zh" ? "zh-Hant" : "en";
  app.innerHTML = `
    <header class="site-header"><a class="brand" href="#top"><span class="brand-mark">C</span><span>CODEX / MATERIAL THEMES</span></a><div class="header-actions"><nav><a href="#guide">${t.guide}</a><a href="#themes">${t.themes}</a></nav><div class="language-switch"><button data-locale="zh" class="${locale === "zh" ? "active" : ""}">中文</button><span>/</span><button data-locale="en" class="${locale === "en" ? "active" : ""}">EN</button></div></div></header>
    <section class="hero" id="top"><div class="hero-copy"><p class="eyebrow"><span></span>${t.eyebrow}</p><h1>${t.title.replace("\n", "<br>")}</h1><p class="hero-lead">${t.lead}</p><div class="hero-actions"><a class="button primary" href="#themes">${t.choose} <b>→</b></a><a class="text-link" href="#guide">${t.how} →</a></div><div class="hero-meta"><div><strong>07</strong><span>${t.meta[0]}</span></div><div><strong>01</strong><span>${t.meta[1]}</span></div><div><strong>∞</strong><span>${t.meta[2]}</span></div></div></div><div class="hero-visual"><div class="material-label">01 / CHALKBOARD GREEN</div><div class="image-frame"><img src="${siteAssetBase}themes/Theme01.png" alt="Chalkboard Green preview"></div><div class="hero-swatches"><i style="background:#18382B"></i><i style="background:#E8E3D3"></i><i style="background:#D4B95E"></i></div></div></section>
    <section class="guide-section" id="guide"><div class="section-heading"><p class="section-index">01 / HOW TO APPLY</p><div><h2>${t.guideTitle}</h2><p>${t.guideLead}</p></div></div><ol class="steps">${t.steps.map((step, index) => `<li><span>0${index + 1}</span><strong>${step}</strong>${index < 4 ? "<b>→</b>" : ""}</li>`).join("")}</ol><p class="guide-note"><b>Path: </b>${t.path}<br><span>Every preset uses <code>opaqueWindows:true</code>, so interface colours stay closer to their material reference.</span></p></section>
    <section class="themes-section" id="themes"><div class="section-heading inverse"><p class="section-index">02 / THE COLLECTION</p><div><h2>${t.collection}</h2><p>${t.collectionLead}</p></div></div><div class="theme-workbench"><div class="theme-list">${themes.map((theme) => `<div class="theme-row ${theme.id === selectedId ? "active" : ""}"><button class="theme-select" data-select="${theme.id}"><span>0${theme.id}</span><span><strong>${locale === "zh" ? theme.zh : theme.en}</strong><small>${locale === "zh" ? theme.en : theme.zh}</small></span><em><i style="background:${theme.surface}"></i><i style="background:${theme.ink}"></i><i style="background:${theme.accent}"></i></em></button><button class="quick-copy" data-copy="${theme.id}" aria-label="${t.copy}">⧉</button></div>`).join("")}</div><article class="theme-preview" style="--surface:${selected.surface};--accent:${selected.accent}"><div class="preview-topline"><span>${t.selected.toUpperCase()} / 0${selected.id}</span><span>CONTRAST ${selected.contrast}</span></div><img class="preview-image" src="${selected.image}" alt="${esc(selected.en)} preview"><div class="preview-info"><div><p class="preview-en">${locale === "zh" ? selected.en : selected.zh}</p><h3>${locale === "zh" ? selected.zh : selected.en}</h3><p>${locale === "zh" ? selected.noteZh : selected.noteEn}</p></div><div class="palette"><div><i style="background:${selected.surface}"></i><small>${t.surface}<br>${selected.surface}</small></div><div><i style="background:${selected.ink}"></i><small>${t.ink}<br>${selected.ink}</small></div><div><i style="background:${selected.accent}"></i><small>${t.accent}<br>${selected.accent}</small></div></div></div><div class="font-panel"><div class="font-heading"><strong>${t.fonts}</strong><span>${t.fontHint}</span></div><div class="font-fields">${["ui", "code"].map((type) => `<div class="font-field"><span id="${type}-font-label">${type === "ui" ? t.uiFont : t.codeFont}</span><div class="font-combobox" data-font-combobox="${type}"><input type="text" data-font="${type}" value="${esc(selectedFonts[type])}" autocomplete="off" role="combobox" aria-autocomplete="none" aria-labelledby="${type}-font-label" aria-controls="${type}-font-menu" aria-expanded="false"><button type="button" class="font-toggle" data-font-toggle="${type}" aria-label="${t.showFontOptions}: ${type === "ui" ? t.uiFont : t.codeFont}" aria-controls="${type}-font-menu" aria-expanded="false"></button><div class="font-menu" id="${type}-font-menu" role="listbox" aria-labelledby="${type}-font-label" hidden>${fontOptions[type].map((font) => `<button type="button" role="option" data-font-option="${esc(font)}" data-font-type="${type}" aria-selected="${font === selectedFonts[type]}">${esc(font)}</button>`).join("")}</div></div></div>`).join("")}</div></div><div class="copy-panel"><code>${esc(themeValue(selected))}</code><button class="copy-button" data-copy="${selected.id}">${t.copy}</button></div></article></div></section>
    <footer><div><span class="brand-mark">C</span><strong>Codex Material Themes / Robin Li</strong></div><p>${t.footer}</p><a href="#top">${t.top}</a></footer>`;
}

async function copyTheme(id) {
  const value = themeValue(themes[id - 1]);
  try { await navigator.clipboard.writeText(value); } catch { const field = document.createElement("textarea"); field.value = value; document.body.append(field); field.select(); document.execCommand("copy"); field.remove(); }
  const button = document.querySelector(`.copy-button[data-copy="${id}"]`);
  if (button) { const original = button.textContent; button.textContent = copy[locale].copied; button.classList.add("copied"); setTimeout(() => { button.textContent = original; button.classList.remove("copied"); }, 1800); }
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.fontToggle) {
    const type = button.dataset.fontToggle;
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    if (shouldOpen) openFontMenu(type); else closeFontMenus();
    return;
  }
  if (button.dataset.fontOption) {
    const type = button.dataset.fontType;
    setFont(type, button.dataset.fontOption);
    closeFontMenus();
    document.querySelector(`input[data-font="${type}"]`)?.focus();
    return;
  }
  if (button.dataset.locale) { locale = button.dataset.locale; localStorage.setItem("codex-material-locale", locale); render(); }
  if (button.dataset.select) { selectedId = Number(button.dataset.select); render(); document.querySelector(".theme-preview")?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  if (button.dataset.copy) copyTheme(Number(button.dataset.copy));
});

app.addEventListener("input", (event) => {
  const input = event.target.closest("input[data-font]");
  if (!input) return;
  const type = input.dataset.font;
  selectedFonts[type] = input.value;
  localStorage.setItem(`codex-material-${type}-font`, input.value);
  updateThemeCode();
});

app.addEventListener("change", (event) => {
  const input = event.target.closest("input[data-font]");
  if (!input) return;
  setFont(input.dataset.font, input.value);
});

app.addEventListener("keydown", (event) => {
  const input = event.target.closest("input[data-font]");
  if (input && event.key === "ArrowDown" && event.altKey) {
    event.preventDefault();
    openFontMenu(input.dataset.font);
  }
  if (event.key === "Escape" && event.target.closest(".font-combobox")) {
    closeFontMenus();
  }
});

app.addEventListener("focusout", (event) => {
  const combobox = event.target.closest(".font-combobox");
  if (!combobox) return;
  setTimeout(() => {
    if (!combobox.contains(document.activeElement)) closeFontMenus();
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".font-combobox")) closeFontMenus();
});

render();
