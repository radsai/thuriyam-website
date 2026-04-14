# Agent Builder demo video — icon assets

Drop **PNG** files here (typically under `icons/`). Reference them from `scripts/agent-builder-demo-manifest.json` with the `iconPng` field.

## Layout

- **Base folder** (default): `agent-builder-demo-assets/` next to this file (override with top-level `"assetsBase"` in the manifest).
- **Manifest paths** are relative to that base folder, e.g. `"iconPng": "icons/channels.png"`.

### Manifest fields (per slide)

| Field | Required | Description |
|--------|----------|-------------|
| `iconPng` | No | Relative path under `assetsBase`. If missing or file not found, the slide uses the built-in vector `icon`. |
| `iconTintAccent` | No | If `true`, RGB is replaced with the slide `accent` color; alpha is kept. Use for **white / single-color** glyphs on transparency. |
| `iconMaxPx` | No | Max width **or** height in pixels **before** the animated scale (default ~236). Increase for a larger logo. |

## Guidelines

- **Transparent background** works best (alpha channel).
- **Rough size**: 256–512 px on the long edge; the renderer scales to fit (~236 px max by default, animated with scale).
- **White / single-color icons**: set `"iconTintAccent": true` to recolor with the slide `accent` hex (keeps your alpha).

If `iconPng` is missing or the file is not found, the slide falls back to the built-in vector `icon` name.
