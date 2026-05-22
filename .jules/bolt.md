## 2026-05-22 - Context Value Stabilization
**Learning:** React Context providers without memoized values cause global re-render cascades even in components that only consume a subset of the context state.
**Action:** Always memoize context values and state-updating functions (useCallback) to ensure component stability across the tree.
