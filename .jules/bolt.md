## 2025-05-22 - [Context Memoization]
**Learning:** In a root-level context like AppContext, failing to memoize functions and the provider value object causes an application-wide re-render cascade every time any state (like a search query or cart update) changes. Even if components are memoized with React.memo, they will still re-render if the context value reference changes.
**Action:** Always use useCallback for functions and useMemo for the provider value in global contexts. Use functional state updates to keep useCallback dependency arrays empty/stable.
