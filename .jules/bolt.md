## 2025-05-15 - [Centralized Context Bottleneck]
**Learning:** The application uses a single, comprehensive `AppContext` to manage all global state (auth, cart, market data, etc.). Without memoization of the provider's value object and its action functions, any minor state update (e.g., toggling a favorite) triggers a full re-render of almost every component in the app, including the `BottomNav` and all page content.
**Action:** Always prioritize memoizing context values and function references in this architecture to prevent global re-render cascades.
