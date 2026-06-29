## 2026-06-29 - [Optimized AppContext for referential integrity]
**Learning:** In a large Next.js application with a global AppContext, failing to memoize the provider value and its functions causes the entire component tree to re-render whenever any state (like a single cart item) changes.
**Action:** Always wrap context functions in `useCallback` and memoize the provider value object with `useMemo`, ensuring functional state updates are used to keep dependency arrays stable.
