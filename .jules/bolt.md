## 2025-05-15 - [Global State Re-render Cascade]
**Learning:** The `AppProvider` in `src/context/AppContext.tsx` serves as the central state hub but recreates its value object and all action functions (addToCart, toggleFavorite, etc.) on every render. This causes a "global re-render cascade" whenever any piece of state (even unrelated ones like `loading`) updates, because all context consumers receive a new reference.
**Action:** Prioritize memoizing the `AppContext` value and wrapping all context functions in `useCallback` to stabilize references across the application.
