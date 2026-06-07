## 2025-05-15 - [Context Memoization Strategy]
**Learning:** In a global state provider like AppContext, every child component re-renders when the provider's value object changes. Standardizing on `useCallback` for all context-provided functions and `useMemo` for the value object itself is the most effective way to prevent "re-render cascades" across the entire application.
**Action:** Always wrap context provider values in `useMemo` and functions in `useCallback` when defining global state providers in Next.js/React applications.
