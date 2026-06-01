## 2026-06-01 - Global Context Re-render Bottleneck
**Learning:** In this architecture, almost all components consume `AppContext`. Without `useMemo` on the context value and `useCallback` on action functions, every state update (like adding to cart or toggling a favorite) triggers a re-render of the entire application.
**Action:** Always memoize context values and action functions in `AppContext.tsx` to ensure that only components actually using the changed state are re-rendered.
