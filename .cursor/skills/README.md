# Project Agent Skills

## `remotion-best-practices`

Vendored from [remotion-dev/skills](https://github.com/remotion-dev/skills) (`skills/remotion/`). Cursor loads `SKILL.md` and the agent should open `rules/*.md` as needed for Remotion, FFmpeg, captions, etc.

**Refresh from upstream** (from repo root):

```bash
rm -rf /tmp/remotion-skills-up && git clone --depth 1 https://github.com/remotion-dev/skills.git /tmp/remotion-skills-up
rm -rf .cursor/skills/remotion-best-practices
cp -R /tmp/remotion-skills-up/skills/remotion .cursor/skills/remotion-best-practices
# Re-apply local patches: fix sfx link + extra caption rule bullets in SKILL.md if desired
```

Local tweaks in this copy: `sound-effects.md` → `rules/sfx.md`; extra index entries for `display-captions`, `import-srt-captions`, `transcribe-captions`.
