# BKBarn Timescope

![CI Test](https://img.shields.io/github/actions/workflow/status/bagaking/obsidian-bkbarn-timescope/test.yml?branch=main&label=CI%20Test&logo=github&style=for-the-badge)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/bagaking/obsidian-bkbarn-timescope?style=for-the-badge&sort=semver)

BKBarn Timescope is an Obsidian plugin for time-scoped daily planning. It tracks timed checklist items in Markdown notes, shows day progress in the status bar, and can render timeline or Mermaid Gantt views from the same plan.

This project is maintained as `bkbarn-timescope`. It is derived from an earlier daily-planner codebase, but this repository, package, release assets, and validation flow are owned here.

## Current Status

This plugin is maintained from source and GitHub releases. It is not advertised here as an Obsidian Community Plugins directory listing. Test it in a non-critical vault first and keep normal backups of notes that the plugin can update automatically.

## Features

- Create or link a daily planner note in file mode or command mode.
- Track top-level timed checklist items in `HH:mm` format.
- Optionally mark past planner items complete as time passes.
- Show current and next planner items in the Obsidian status bar.
- Open a timeline view for the current day plan.
- Optionally include a Mermaid Gantt chart in the planner note.
- Configure break/end keywords, planner folder, status bar behavior, notifications, and timeline zoom.

## Planner Format

Timed tasks are Markdown checklist items with a 24-hour time prefix:

```markdown
## Day Planner

- [ ] 09:30 Setup workspace
- [ ] 10:00 Review notes
- [ ] 11:30 BREAK
- [ ] 12:00 Draft project update
- [ ] 13:00 END
```

The plugin uses the `Day Planner` heading to find the planner section. Timed tasks must be top-level checklist items. Nested checklist items may be used as sub-tasks below a timed item, but they are not separate timed blocks.

`BREAK` and `END` are special keywords used to model breaks and the end of the tracked plan. They are configurable in plugin settings.

## Usage

In file mode, the plugin creates day planner notes under the configured planner folder, which defaults to `Day Planners`, using names like `Day Planner-YYYYMMDD.md`.

In command mode, use the Obsidian command palette to add, link, unlink, show, or open today's planner in the current note. Only the planner section is intended to be updated as time progresses.

## Installation

### Manual GitHub Release Install

1. Download the latest release from <https://github.com/bagaking/obsidian-bkbarn-timescope/releases/latest>.
2. In your vault, create `<vault>/.obsidian/plugins/bkbarn-timescope/` if it does not already exist.
3. Copy `main.js`, `manifest.json`, and `styles.css` from the release assets into that folder. You can also extract the release zip, which contains the same plugin folder layout.
4. Reload Obsidian.
5. Enable the plugin from Obsidian settings.

### BRAT Install

If you use the BRAT plugin for beta plugins, add this repository:

```text
https://github.com/bagaking/obsidian-bkbarn-timescope
```

BRAT installs from GitHub release assets, so use a tagged release rather than an arbitrary source checkout for normal vault use.

### Source Build Install

For development or local testing:

```bash
npm install
npm run verify
```

After a successful build, copy these files into `<vault>/.obsidian/plugins/bkbarn-timescope/`:

```text
dist/main.js -> main.js
manifest.json
styles.css
```

The source tree keeps the built bundle at `dist/main.js`. Obsidian and GitHub releases consume that bundle as the plugin asset named `main.js`.

## Verification

Use:

```bash
npm run verify
```

This command builds the plugin, checks the required plugin assets, validates core manifest/package consistency, and runs the test suite.

The asset boundary is:

- build output: `dist/main.js`
- Obsidian plugin folder asset: `main.js`
- release assets: `main.js`, `manifest.json`, `styles.css`, and `bkbarn-timescope-<tag>.zip`

## Release Boundary

Releases are produced by the `Release Build` GitHub workflow on tag pushes. The workflow runs `npm run verify`, packages `dist/main.js` as `main.js`, and uploads the Obsidian release assets.

Do not install directly from the repository root by copying source files. A usable Obsidian plugin install needs the release asset names and folder layout described above.

## Compatibility

The manifest currently declares `minAppVersion` as `0.9.10` and `isDesktopOnly` as `false`. Compatibility should be verified with the target Obsidian version before publishing a release.

## Development

Useful commands:

```bash
npm run build
npm run check:assets
npm run test
npm run verify
```

`npm run build` writes `dist/main.js` and copies test-vault assets for local plugin testing. `npm run verify` is the expected pre-release and pre-change validation command.
