---
title: "CI build fails: '@angular-devkit/build-angular:application' builder not found"
labels: ['ci', 'build', 'bug']
---

## Summary

The GitHub Actions build for this repo fails with the following error when running the Angular build step:

```
Error: Could not find the '@angular-devkit/build-angular:application' builder's node package.
Error: Process completed with exit code 1.
```

This appears after the workflow installs packages and calls the Angular CLI (via `npx` in CI).

## Logs (excerpt)

```
Run npm run build
> demo-frontend@0.0.0 build
> npx -y @angular/cli@19.2.13 build --base-href=/demo-frontend/

Node packages may not be installed. Try installing with 'npm install'.
Error: Could not find the '@angular-devkit/build-angular:application' builder's node package.
```

## Steps to reproduce

1. Merge or push a change to the branch that triggers the Actions workflow.
2. Let the `build` job run (it executes `npm ci` then `npx ... build`).

## Expected

The build should complete and produce `dist/demo-frontend/browser`.

## Observed

The build fails because the build system cannot find the `@angular-devkit/build-angular` builder package at runtime.

## Possible causes

- `@angular-devkit/build-angular` (a devDependency) was not installed successfully in CI (npm errors, environment variables, or production install flags might have prevented devDependencies from installing).
- Version mismatch between the Angular CLI invoked with `npx` and the installed `@angular-devkit/build-angular` package.
- Corrupt or missing `node_modules` / `package-lock.json` mismatch in CI cache or during install.

## Recommended fixes (try in order)

1. Verify CI installation step:

   - Ensure `npm ci` runs successfully and its output is visible in the workflow logs.
   - Confirm `@angular-devkit/build-angular` is present in `node_modules` after install (add a debug step in the workflow:

     ```yaml
     - run: npm ci
     - run: ls -la node_modules/@angular-devkit || true
     - run: npm ls @angular-devkit/build-angular || true
     ```
   )

2. Ensure the CLI and builder versions match. We currently call the CLI via:

   `npx -y @angular/cli@19.2.13 build ...`

   Make sure `@angular-devkit/build-angular` in `package.json` (devDependencies) is compatible (same major/minor). If not, update it and commit `package-lock.json`.

3. If CI sets `NODE_ENV=production` or `npm install --production`, devDependencies will be skipped. Ensure the workflow uses `npm ci` without production flags (or explicitly sets `NPM_CONFIG_PRODUCTION=false`).

4. As a temporary debug, run the build with `--verbose` to get more information:

   `npx -y @angular/cli@19.2.13 build --base-href=/demo-frontend/ --verbose`

5. If installs sometimes fail due to network, add retry or caching steps for `~/.npm` or `.npm` cache.

## Helpful troubleshooting commands (locally)

```bash
npm ci
npm ls @angular-devkit/build-angular
npx -y @angular/cli@19.2.13 build --base-href=/demo-frontend/ --verbose
```

If you'd like, I can add the debug steps to the workflow or add caching to the Actions file.
