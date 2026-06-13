## 2025-05-15 - [Home Page Performance Optimization]
**Learning:** React components often perform array filtering (e.g., .filter().slice()) directly in the render body. When multiple pieces of state (like searchQuery and location) exist, changing one triggers recalculation of all filtered lists. Memoizing filters that don't depend on the specific changing state (like featured sellers vs search query) prevents unnecessary work.
**Action:** Always check dependency arrays for useMemo to ensure expensive computations only run when their specific inputs change, not on every component update.
