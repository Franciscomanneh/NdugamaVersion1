## 2025-05-22 - [Context Memoization in AppContext]
**Learning:** The AppContext is the central state hub with 38+ consumer components. Without memoization of the context value and its state-updating functions, any state change (e.g., cart update, user role change) triggers a full application re-render cascade.
**Action:** Always wrap Context Provider values in `useMemo` and their functions in `useCallback` when the context has many consumers or frequent updates.

## 2025-05-22 - [Build Verification vs. Env Variables]
**Learning:** In this environment, `npm run build` fails during the static page generation phase due to missing Firebase API keys ('auth/invalid-api-key').
**Action:** Accept successful compilation and linting as valid verification of code integrity even if the final static export fails due to missing environment secrets.
