## 2025-05-15 - Optimizing Global Context Re-renders
**Learning:** In global React Context providers like `AppContext`, providing an object literal as a `value` causes every consumer to re-render on every provider update. Memoizing the value with `useMemo` and functions with `useCallback` (using functional state updates) is critical to prevent application-wide re-render cascades.
**Action:** Always memoize context provider values and use functional state updates in context hooks to keep dependency arrays stable.
