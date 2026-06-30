## 2025-05-15 - [Global state & rendering optimization]
**Learning:** In applications using a central context (like AppContext), creating a new object literal for the provider value on every render causes a global re-render cascade. Even if children use React.memo, they still re-render because the context value has a new reference.
**Action:** Always wrap the Context Provider value in `useMemo` and ensure all context functions are wrapped in `useCallback`. Use functional state updates to keep `useCallback` dependency arrays empty or minimal.

## 2025-05-15 - [Image LCP optimization]
**Learning:** Next.js `<Image />` with the `priority` prop is essential for above-the-fold content like hero images to improve Largest Contentful Paint (LCP). However, when using `fill`, the parent container must be `relative`, `fixed`, or `absolute` and have a defined height/width, or the layout will collapse.
**Action:** When replacing hero `<img>` with `<Image fill priority />`, verify the parent container has `relative` positioning and appropriate dimensions.
