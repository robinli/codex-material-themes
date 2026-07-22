# Codex Material Themes — Submission Notes

## Release

- Plugin name: `codex-material-themes`
- Display name: `Codex Material Themes`
- Version: `1.0.2`
- Plugin type: Skill-only
- Publisher: `Robin Li / 瑞彬 李`
- Developer identity selected in the upload form: `Individual — 瑞彬 李`

## Plugin Portal upload fields

Use these exact values whenever uploading a release ZIP or creating a new draft:

- Subtitle: `Choose and export Codex themes`
- Customer support URL: `https://codex-themes.robinks.net/support/`

## Publisher identity note

My OpenAI Platform profile name is **Robin Li**, while the verified Developer Identity dropdown displays the same individual's legal Chinese name, **瑞彬 李**. The Plugin manifest and all public publisher pages therefore identify the publisher as **Robin Li / 瑞彬 李**.

OpenAI Support advised me to submit the Plugin for review under case **11788023**.

## 1.0.2 changes

- Replaced conversation preview references to remote execution paths with public HTTPS preview URLs that work across ChatGPT and Codex Desktop.
- Kept all eight bundled preview images as local assets and fallbacks.
- Added a clickable HTTPS fallback link when an interface cannot embed a preview image.
- Kept the existing eight themes, recommendation rules, font workflow, localized import steps, and deterministic `codex-theme-v1:` output unchanged.
- Updated the privacy, terms, and support disclosures for hosted preview requests.

## Public URLs

- Website: https://codex-themes.robinks.net/
- Privacy Policy: https://codex-themes.robinks.net/privacy/
- Terms of Service: https://codex-themes.robinks.net/terms/
- Support: https://codex-themes.robinks.net/support/
- Repository: https://github.com/robinli/codex-material-themes

## Capability disclosure

- External authentication: None
- MCP servers: None
- Apps: None
- Network access: Public HTTPS preview images only; no authenticated API, MCP server, analytics, or advertising
- Write actions: None
- Automatic Codex settings changes: None
- User action required: The user manually imports the generated `codex-theme-v1:` setting in Codex.

## Test cases

The submission test prompts are stored in:

- `positive-tests.json` — five positive activation and workflow cases
- `negative-tests.json` — three scope and guardrail cases
