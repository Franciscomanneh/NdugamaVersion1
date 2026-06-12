## 2026-06-12 - AppContext Performance Optimization
**Learning:** In global context providers, failing to memoize the value object and action functions leads to a re-render of every component consuming the context whenever *any* piece of state within the provider updates.
**Action:** Always use `useMemo` for the context provider's `value` and `useCallback` for functions passed into the context. Use functional state updates (`setState(prev => ...)`) to keep `useCallback` dependency arrays minimal or empty.
