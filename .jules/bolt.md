## 2026-06-14 - Global Context Memoization
**Learning:** In large React applications, the global context provider is a primary source of re-render cascades. Even small state updates (like toggling a favorite) can trigger a full-app re-render if the context value is an object literal.
**Action:** Always memoize the context provider's `value` with `useMemo` and its functions with `useCallback`. Use functional state updates to keep `useCallback` dependencies minimal (ideally `[]`).
