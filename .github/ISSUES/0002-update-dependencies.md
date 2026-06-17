---
title: "Update transitive dependencies: tar and glob deprecation warnings"
labels: ['dependencies', 'security', 'chore']
---

## Summary

During CI `npm ci` / `npx ng build`, we see deprecation warnings for transitive packages `tar` and `glob`:

```
npm warn deprecated tar@6.2.1: Old versions of tar are not supported...
npm warn deprecated glob@10.5.0: Old versions of glob are not supported...
Node packages may not be installed. Try installing with 'npm install'.
```

These warnings indicate that some dependency (or transitive dependency) is using older versions of `tar` / `glob` that contain security vulnerabilities.

## Impact

- Warnings themselves won't necessarily break the build, but they indicate packages with known vulnerabilities should be updated.
- Leaving them unaddressed may be flagged by security scans or audits.

## Recommended actions

1. Run `npm audit` locally to see which package paths pull in `tar` / `glob`.

2. Try to update direct dependencies to versions that depend on newer `tar`/`glob`:

   ```bash
   npm outdated
   npm update
   ```

3. If transitive dependencies remain outdated, consider:

   - Adding a `resolutions` entry (if using Yarn) or using `npm-force-resolutions` for npm to force a newer transitive version (use carefully).
   - Upgrading `@angular-devkit/build-angular` / `@angular/cli` to a newer patch release that uses updated transitive deps.

4. Re-run `npm ci` and `npm audit` and commit the updated `package-lock.json`.

## Notes

- These warnings are common with older npm package trees; addressing them reduces security noise and improves scan results.
