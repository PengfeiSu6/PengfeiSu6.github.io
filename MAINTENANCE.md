# Personal website maintenance

This is a buildless bilingual GitHub Pages site. No package installation or build is needed.

## Structure
- Chinese pages at `/`; English counterparts at `/en/`.
- Shared identity fields: `data/profile.js`; bindings: `assets/js/site.js`.
- Shared theme: `assets/css/main.css`; small additions: `custom.css`.
- Research layout is separately scoped in `research.css`.
- Home news: five recent entries visible; earlier entries retained in an expandable archive.

## Before publishing
1. Read current remote changes; do not overwrite unrelated work.
2. Preserve titles, author order, dates, role descriptions and existing links unless verified evidence supports a correction.
3. Keep Chinese and English pages aligned. PhD start is March 2021 (owner correction); do not restore January 2021.
4. Do not infer publication acceptance, awards or roles from private drafts. Treat undated citation counts/impact factors as unverified snapshots, not live metrics. Flag them for source verification rather than inventing updates.
5. Run `python3 scripts/check_site.py`, `node --check assets/js/site.js`, `node --check data/profile.js`, and `git diff --check`.
6. Check desktop/mobile layout and keyboard navigation when a browser is available. Verify language switching and the News archive.
7. After authorized publication, verify the remote commit, deployment status, and changed live pages. Report any verification limits.

## Routine upkeep
Check broken internal/external links, outdated deadline notices, bilingual differences, publication metadata and mobile usability. Keep historical news; archive rather than delete. Ask for missing consequential facts instead of guessing. Do not publish personal/private material just because it is available in a connected source.
