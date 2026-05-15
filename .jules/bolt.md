## 2026-05-15 - [React Context Memoization Pattern]
**Learning:** In a large application using React Context for global state, failing to memoize the context value and its functions causes a cascade of unnecessary re-renders across all consumer components whenever the provider's parent re-renders or unrelated state changes.
**Action:** Always wrap context provider values in `useMemo` and state-modifying functions in `useCallback` to maintain stable references and optimize performance.
