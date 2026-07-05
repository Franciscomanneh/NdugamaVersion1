## 2025-05-15 - [Next.js Image fill and Link Hit Area]
**Learning:** When using Next.js `<Image fill />` inside a `<Link>`, the link's clickable hit area may collapse to 0x0 if the link container doesn't have an explicit height/width or `relative` positioning. This is because `fill` uses absolute positioning, which removes the image from the document flow.
**Action:** Always ensure the `<Link>` wrapping an `<Image fill />` has `relative` and appropriate dimension classes (e.g., `h-full`, `w-full`, `block`).

## 2025-05-15 - [Static Data Lifting]
**Learning:** Lifting static arrays like `LOCATIONS` or `CATEGORIES` outside of the component function prevents them from being re-allocated on every render, which saves memory and maintains referential equality for child components that might depend on them.
**Action:** Move all non-reactive static data to the module level or a separate constants file.
