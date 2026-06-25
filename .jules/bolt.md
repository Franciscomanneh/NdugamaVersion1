
## 2026-06-25 - Performance optimization of Home page
**Learning:** Hoisting static constants and memoizing filtered lists in a frequently re-rendered component like the Home page significantly reduces CPU overhead. Using Next.js <Image /> with the 'priority' prop for hero images is a critical pattern for improving LCP metrics in this mobile-first application.
**Action:** Always check the Home page and other high-traffic entry points for non-hoisted constants and unmemoized filters. Ensure hero images use Next.js <Image /> with 'priority'.
