## 2025-05-15 - AppContext Re-render Cascade Prevention
**Learning:** React context providers with object literals as values cause every consumer to re-render on every provider update. In "God Context" architectures where many disparate state values are stored together, this is a major performance bottleneck.
**Action:** Always memoize context provider values with `useMemo` and ensure all provided functions are wrapped in `useCallback` with stable dependencies (using functional state updates).
