## 2025-05-14 - [AppContext Memoization]
**Learning:** The `AppProvider` in `AppContext.tsx` was causing global re-render cascades because its context value object was being re-created on every render, and its action functions lacked stable references.
**Action:** Always wrap `AppContext` provider values in `useMemo` and its functions in `useCallback` to ensure that only components actually using changed state will re-render.
