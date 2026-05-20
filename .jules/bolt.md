## 2025-05-15 - Context Re-render Cascade Optimization
**Learning:** In a large Next.js application with a central `AppContext`, failing to memoize the context value and its functions causes every consumer (38+ components in this case) to re-render whenever *any* piece of global state changes (e.g., a simple location update or a background Firebase sync). This is especially impactful for layout-level components like `BottomNav`.

**Action:** Always wrap `AppContext.Provider` value in `useMemo` and its internal functions in `useCallback`. Combine this with `React.memo` for layout components to prune the render tree effectively.
