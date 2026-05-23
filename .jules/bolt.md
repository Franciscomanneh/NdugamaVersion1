## 2026-05-23 - [HomePage Filtering Optimization]
**Learning:** Moving static arrays outside of a functional component prevents them from being recreated on every render, saving memory and processing time. Memoizing complex filtering operations with `useMemo` avoids redundant CPU cycles when unrelated states (like modals or simple location selects) change.
**Action:** Always check for static data defined within components and expensive filtering logic that could be memoized.
