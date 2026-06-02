## 2024-12-18 - Component Hoisting & Memoization Anti-pattern
**Learning:** In highly interactive components like `HomePage` where global context updates frequently (location changes, donation modals), lack of memoization for search filtering and static object definitions leads to redundant CPU cycles and garbage collection on every render.
**Action:** Always hoist static arrays outside of component definitions and wrap derived state (filters, slices) in `useMemo` to ensure stability across context-driven re-renders.
