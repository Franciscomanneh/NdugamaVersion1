## 2026-05-29 - [React Performance Optimization]
**Learning:** Even simple list filtering can be a bottleneck on mobile devices if repeated on every re-render. Memoizing filtered lists and moving static data outside components provides a measurable smoothness in UI interactions.
**Action:** Always check if filtering logic is memoized in main view components, especially when multiple state-driven UI elements (modals, tabs) are present.
