## 2026-07-06 - [Memoized AppContext Provider]
**Learning:** In global contexts like AppContext, functional state updates in context hooks (e.g., `setCart(prev => ... )`) are critical for keeping `useCallback` dependency arrays empty/stable. This prevents cascading re-renders in large component trees that consume the context.
**Action:** Always memoize Context Provider values using `useMemo` and wrap provided functions in `useCallback` with minimal dependencies (utilizing functional state updates where possible).
