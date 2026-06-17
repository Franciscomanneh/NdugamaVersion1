## 2026-06-17 - Context Memoization and Home Page Filtering
**Learning:** In a global context-heavy application, failing to memoize the context provider's value and its functions causes the entire component tree to re-render whenever any state (like a simple search query or loading status) changes. Combining this with un-memoized heavy filtering in the Home page creates a significant performance bottleneck.
**Action:** Always memoize context values and functions. Independently memoize filtered lists in complex components to isolate re-render impacts.
