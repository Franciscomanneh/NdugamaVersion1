## 2025-05-25 - [Home Page Filter Memoization]
**Learning:** Found that the Home Page was re-filtering product and bundle lists on every render, including unrelated state changes like opening a donation modal. Static arrays were also being recreated on every render.
**Action:** Always check for filtering logic in main entry pages and move static configuration arrays outside component definitions to minimize memory churn and CPU usage.
