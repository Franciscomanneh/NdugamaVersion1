
## 2026-06-23 - Memoize AppContext to prevent re-render cascades
**Learning:** In a global context provider like AppContext, passing a fresh object literal to `value` on every render causes all consuming components to re-render, even if the specific state they use is unchanged. Memoizing context functions with `useCallback` and the provider value with `useMemo` is a foundational performance pattern.
**Action:** Always memoize global context values and functions. Use functional state updates (`setX(prev => ...)`) inside `useCallback` to keep dependency arrays stable and minimal.
