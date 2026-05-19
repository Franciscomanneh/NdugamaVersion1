## 2025-05-15 - Context Reference Stability
**Learning:** In applications using a "God Object" AppContext pattern, every state update triggers a re-render in all consuming components if the context value is a fresh object literal. Functional state updates in `useCallback` and `useMemo` for the context value are essential to enable `React.memo` to work effectively for downstream components.
**Action:** Always ensure AppProvider values are memoized and functions have stable references via `useCallback` with functional state updates where possible.
