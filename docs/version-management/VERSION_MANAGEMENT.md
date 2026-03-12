# Website Version Management Guide

## Branch Structure

- **website_v1**: Stable baseline version
- **website_v2**: Active development with feedback incorporation

---

## Quick Commands

### Switch Between Versions
```bash
# Work on v2 (current)
git checkout website_v2

# Go back to v1
git checkout website_v1
```

### Compare Versions
```bash
# See all changes
git diff website_v1..website_v2

# See file statistics
git diff website_v1..website_v2 --stat

# See commits unique to v2
git log website_v1..website_v2 --oneline

# Use the comparison script
./docs/version-management/compare-versions.sh
```

### Push v2 to Remote
```bash
# First time
git push -u origin website_v2

# Subsequent pushes
git push origin website_v2
```

---

## Workflow

### Starting a New Iteration
1. Make sure you're on `website_v2`:
   ```bash
   git checkout website_v2
   ```

2. Make your changes based on feedback

3. Update `docs/version-management/CHANGELOG.md` with:
   - What feedback you received
   - What changes you made
   - Why you made those changes

4. Commit changes:
   ```bash
   git add .
   git commit -m "feat: Description of changes"
   ```

### Comparing with v1
```bash
# Quick comparison
./docs/version-management/compare-versions.sh

# Or manually
git diff website_v1..website_v2
```

### Viewing Change History
```bash
# See all commits in v2
git log website_v1..website_v2 --oneline

# See detailed changes
git log website_v1..website_v2
```

---

## Best Practices

1. **Always update docs/version-management/CHANGELOG.md** when making changes
2. **Commit frequently** with descriptive messages
3. **Compare regularly** to see what's changed
4. **Keep v1 stable** - don't modify it once v2 is created
5. **Document feedback** in the changelog before implementing

---

## Example Workflow

```bash
# 1. Start working on v2
git checkout website_v2

# 2. Make changes based on feedback
# ... edit files ...

# 3. Update changelog
# ... edit docs/version-management/CHANGELOG.md ...

# 4. Commit
git add .
git commit -m "fix: Address feedback about navigation dropdown"

# 5. Compare with v1 to see what changed
git diff website_v1..website_v2 --stat

# 6. Push when ready
git push origin website_v2
```

---

## Tracking Feedback

Use `docs/version-management/CHANGELOG.md` to track:
- ✅ Feedback received
- ✅ Changes made
- ✅ Rationale for changes
- ✅ Testing notes
- ✅ Next steps

---

## Merging Back to v1 (When Ready)

When v2 is stable and ready to become the new baseline:

```bash
# Switch to v1
git checkout website_v1

# Merge v2 into v1
git merge website_v2

# Push updated v1
git push origin website_v1

# Create new v3 from updated v1 (if needed)
git checkout -b website_v3
```

