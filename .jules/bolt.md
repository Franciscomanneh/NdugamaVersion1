## 2026-05-30 - [Component-level Filter Memoization]
**Learning:** Found that the main entry point (src/app/page.tsx) was recalculating filtered lists and re-allocating static arrays on every render, even when unrelated context state (like 'location') changed. This is a common bottleneck in this app's architecture where many components consume a large, unmemoized AppContext.
**Action:** Always move static arrays outside component definitions and wrap derived data filters in 'useMemo' to shield components from the frequent re-renders caused by global context updates.
