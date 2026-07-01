## 2026-07-01 - [Next.js Image Fill and Link Hit Areas]
**Learning:** When using Next.js `<Image fill />` inside a `<Link>`, the link's clickable hit area can collapse because the image is absolutely positioned.
**Action:** Always ensure the wrapping `<Link>` (or an intermediate container) has `block relative` and explicit dimensions (height/width) to maintain the intended touch target.

## 2026-07-01 - [LCP Optimization with Priority Images]
**Learning:** Standard `<img>` tags above the fold contribute to poor LCP scores.
**Action:** Identify hero images or critical viewport assets and replace them with Next.js `<Image />` using the `priority` prop to ensure they are preloaded and rendered early.
