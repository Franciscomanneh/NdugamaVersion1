## 2025-05-14 - [React Render Optimization in Home Page]
**Learning:** Hoisting static arrays and memoizing derived state from Context (like filtered lists) is a high-impact, low-risk optimization in Next.js/React applications. In this codebase, `src/app/page.tsx` was performing array filtering on every render, including during search input updates, which could lead to lag on low-end mobile devices.
**Action:** Always check for static definitions inside components and wrap expensive derived data (filters, sorts) in `useMemo` when the source data comes from a global Context.
