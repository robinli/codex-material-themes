# Theme catalog source

This directory is the single editable source for the shared Codex Material
Themes catalog and its preview images.

- Edit `references/themes.json` for theme values, names, descriptions, font
  options, and defaults.
- Replace preview images in `assets/` while keeping each `preview` path in the
  catalog valid.
- Run `npm run sync:themes` after editing.
- Run `npm run check:themes` to verify that the website, standalone Skill, and
  Plugin packages match this source.

Do not edit generated catalog files or generated preview copies directly.
