## 2026-05-28 - [Memoizing Global Context]
**Learning:** In a large React application where many components consume a global context, failing to memoize the context value and its action functions causes a global re-render cascade every time the provider's parent re-renders or any piece of state within the provider changes (if not carefully managed). Memoizing action functions with `useCallback` and the context value with `useMemo` ensures that consumers only re-render when the specific data they depend on actually changes.

**Action:** Always wrap context provider values in `useMemo` and stable action functions in `useCallback` to prevent unnecessary re-render propagation throughout the component tree.
