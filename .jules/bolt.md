## 2025-05-15 - Global Context Re-render Cascades
**Learning:** In applications using a central AppContext, the lack of memoization in the Context Provider leads to global re-render cascades. Even if a component only consumes a single stable piece of state, it will re-render whenever the Provider's value (a new object literal) changes.
**Action:** Always wrap context functions in `useCallback` and the provider's `value` object in `useMemo` to ensure stable references and prevent unnecessary re-renders of the entire component tree.
