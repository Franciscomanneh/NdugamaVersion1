## 2025-05-14 - Stable Context References
**Learning:** In a centralized state management pattern using React Context, the provider value object and its functions should be memoized with `useMemo` and `useCallback`. Without this, every state change in the context causes a complete re-render of all consuming components because the context value object is recreated on every render.
**Action:** Always wrap context provider values in `useMemo` and exported functions in `useCallback` to prevent cascading re-renders in large component trees.
