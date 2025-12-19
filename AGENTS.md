# Repository Guidelines

## Project Structure & Module Organization
- `src/main/`: Electron main process (app lifecycle, native integrations).
- `src/renderer/`: React UI entry and renderer logic.
- `src/components/`: Reusable UI components (many with local README files).
- `src/shared/`: Shared domain logic used by main/renderer.
- `src/utils/`, `src/lang/`, `src/res/`: helpers, i18n strings, and assets.
- `public/`: static assets used by the renderer build.
- `test/`: Jest unit/integration tests; `test/e2e/` for Electron e2e.
- `__mocks__/`: Jest mocks for assets, styles, and workers.

## Build, Test, and Development Commands
- `npm run start`: runs main + renderer in dev mode via webpack.
- `npm run start:prod`: builds and launches Electron from `dist/`.
- `npm run build`: production build for main and renderer bundles.
- `npm run test`: runs Jest with coverage enabled.
- `npm run test:e2e`: runs e2e tests (requires build first).
- `npm run lint`: TSLint checks for `src/` and `test/`.
- `npm run style`: launches the styleguidist component docs.

## Coding Style & Naming Conventions
- TypeScript + React; UI styling is done with `styled-components` (avoid standalone CSS).
- Prettier config: 4-space indent, single quotes, 100 column width (`.prettierrc`).
- TSLint extends Airbnb + React presets (`tslint.json`); lint-staged runs Prettier and TSLint on commits.

## Testing Guidelines
- Jest + ts-jest for unit/integration tests; Spectron is used for e2e.
- Test files match `**/*.(spec|test).[jt]s?(x)`; place e2e tests under `test/e2e/`.
- Coverage is collected by default via `jest.config.js`.

## Commit & Pull Request Guidelines
- Recent commits use a `type: subject` pattern (e.g., `fix: ...`, `chore: ...`). Follow this style.
- PRs should describe the change, link related issues, and include screenshots/GIFs for UI changes.
- Run `npm run lint` and `npm run test` before submitting.

## Configuration Tips
- Electron build scripts rely on `node-gyp` and `electron-builder` (see `.github/CONTRIBUTION.md`).
- If setup is slow in China, use the Electron mirror settings described in `.github/CONTRIBUTION.md`.
