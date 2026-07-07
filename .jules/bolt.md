## 2025-05-14 - [Next.js Image in Links]
**Learning:** When using Next.js `<Image fill />` inside a `<Link>`, the link container may collapse because the image is absolutely positioned. This results in a zero-height/width clickable area for the link.
**Action:** Always ensure the `<Link>` has `block relative` and explicit height/width classes (e.g., `h-full`, `w-full`) or a container with dimensions when it wraps an absolutely positioned `<Image />`.

## 2025-05-14 - [Filter Loop Optimization]
**Learning:** Calling `.toLowerCase()` on a search query inside a `.filter()` callback for a large array is redundant and adds O(N) extra string operations per render.
**Action:** Convert the search query to lowercase once before starting the filter operation to improve iteration speed.
