## 2026-06-03 - [Dependency & Build Environment]
**Learning:** Running `npm run lint` or `npm run build` in this environment requires an initial `npm install --no-package-lock` to ensure all ESLint plugins and dependencies are correctly linked. Additionally, `npm run build` will fail during static page generation (prerendering) because Firebase environment variables are missing, but the "Compiled successfully" message still serves as a valid indicator of code and type integrity.
**Action:** Always run `npm install --no-package-lock` before verification commands and look for the compilation success message even if the final export fails.

## 2026-06-03 - [Static Hoisting & Memoization]
**Learning:** The HomePage and BottomNav components were recreating static arrays and performing filtering/reductions on every render, even when unrelated state (like the donation modal) changed.
**Action:** Hoist static constants outside component scope and use `useMemo` for any data transformation logic to reduce CPU usage and prevent unnecessary downstream re-renders of memoized children.
