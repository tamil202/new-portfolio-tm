# Repository Guidelines

## Project Structure & Module Organization
This is an Angular single-page app. Source lives in `src/`, with the main bootstrap at `src/main.ts` and global styles in `src/styles.css`. Feature code is organized under `src/app/`:
- `src/app/core` for app-wide services/singletons.
- `src/app/features` for page/feature modules.
- `src/app/shared` for reusable UI or utilities.
Static assets live alongside `src/index.html` and `src/favicon.svg`.

## Build, Test, and Development Commands
Use npm scripts from `package.json`:
- `npm run start` runs the dev server with hot reload.
- `npm run build` creates a standard production build.
- `npm run build:prod` builds with the production configuration.
- `npm run build:subdomain` builds for `/portfolio/` base path (nginx subdirectory).
- `npm run serve:prod` serves the built app from `dist/developer-portfolio/browser`.
- `npm run lint` runs Angular linting.
- `npm run test` runs unit tests (none are currently present).
- `npm run pm2:start` / `pm2:stop` / `pm2:restart` / `pm2:logs` manage production with PM2.

## Coding Style & Naming Conventions
Use TypeScript and Angular conventions. Match existing file casing and module patterns. Keep indentation at 2 spaces in TS/CSS. Prefer descriptive, feature-based naming (e.g., `hero-section.component.ts`). Run `npm run lint` before submitting changes. Tailwind is present; prefer utility classes over bespoke CSS unless a component needs custom styling.

## Testing Guidelines
`ng test` is configured, but there are no `*.spec.ts` files yet. When adding tests, place them next to the implementation using Angular/Karma conventions (e.g., `app.component.spec.ts`) and keep them focused on behavior.

## Commit & Pull Request Guidelines
Recent commits use short, imperative messages (e.g., “Fix …”, “Update …”). Follow that style and keep subjects under 72 characters. PRs should include:
- A concise description of the change and motivation.
- Screenshots for UI changes.
- Notes about deployment impact (especially `nginx.conf` or `ecosystem.config.js` edits).

## Configuration & Deployment Notes
`nginx.conf` and `ecosystem.config.js` control production hosting. If you change build output paths or base href, update these files together to keep PM2 and nginx aligned.
