## 2026-06-16 - Context Memoization as Foundation
**Learning:** In a global state architecture where many components consume a single context, missing memoization on the provider value creates an (N)$ re-render cascade for the entire app on every state update. This was especially critical in this codebase due to frequent Firebase snapshot updates.
**Action:** Always wrap Context Provider values in `useMemo` and stabilize handler functions with `useCallback` using functional state updates to keep dependencies minimal. Ensure all state and setters are included in the `useMemo` dependency array.
