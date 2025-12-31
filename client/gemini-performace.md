# React + TypeScript Performance Best Practices

## 20 World-Class Performance Strategies for High-Performance Web Applications

### 1. **Code Splitting and Lazy Loading**
Implement route-based and component-based code splitting using React.lazy() and Suspense. Split your bundle into smaller chunks that load on demand rather than loading everything upfront. This dramatically reduces initial bundle size and improves Time to Interactive (TTI). Use dynamic imports for heavy components, third-party libraries, and route components.

### 2. **Memoization with React.memo, useMemo, and useCallback**
Prevent unnecessary re-renders by wrapping components with React.memo for pure component behavior. Use useMemo for expensive computations that don't need to run on every render. Use useCallback to memoize function references, especially when passing callbacks to child components. This is critical for maintaining referential equality and preventing cascading re-renders.

### 3. **Virtualization for Large Lists**
Implement virtual scrolling using libraries like react-window or react-virtualized for rendering large datasets. Only render visible items in the viewport plus a small buffer, dramatically reducing DOM nodes and improving scroll performance. Essential for tables, feeds, and any list with more than 100 items.

### 4. **Image Optimization and Lazy Loading**
Use modern image formats like WebP and AVIF with fallbacks. Implement native lazy loading with the loading="lazy" attribute. Use responsive images with srcset for different screen sizes. Consider using image CDNs for automatic optimization. Preload critical above-the-fold images and defer below-the-fold images.

### 5. **Bundle Size Optimization**
Analyze your bundle using webpack-bundle-analyzer or similar tools. Tree-shake unused code by using ES6 imports. Replace heavy libraries with lighter alternatives (date-fns instead of moment, preact-compat for smaller builds). Use the production build which automatically minifies and optimizes code.

### 6. **Debouncing and Throttling**
Implement debouncing for search inputs, form validations, and API calls triggered by user input. Use throttling for scroll events, window resize handlers, and mouse move events. This prevents excessive function calls and reduces computational overhead, especially for expensive operations.

### 7. **Web Workers for Heavy Computations**
Offload CPU-intensive tasks like data processing, complex calculations, image manipulation, or large JSON parsing to Web Workers. This keeps the main thread free for UI updates and user interactions, preventing the interface from freezing during heavy operations.

### 8. **Proper State Management Architecture**
Avoid prop drilling by using Context API judiciously or state management libraries like Zustand or Redux Toolkit. Keep state as local as possible and only lift it up when necessary. Split global state into multiple contexts to prevent unnecessary re-renders across unrelated components.

### 9. **Resource Hints and Preloading**
Use preconnect for critical third-party domains to establish early connections. Implement dns-prefetch for domains you'll need later. Use preload for critical resources like fonts and hero images. Use prefetch for resources needed for subsequent navigation. This reduces latency and improves perceived performance.

### 10. **Efficient Event Handlers**
Use event delegation where possible by attaching listeners to parent elements rather than individual children. Remove event listeners in cleanup functions to prevent memory leaks. Avoid inline function definitions in JSX that create new function instances on every render.

### 11. **Optimize Third-Party Scripts**
Load analytics, chat widgets, and other third-party scripts asynchronously or defer them. Use facade patterns for heavy embeds like YouTube players, loading the real component only when user interacts. Audit and remove unused third-party dependencies regularly.

### 12. **Server-Side Rendering (SSR) or Static Site Generation (SSG)**
Implement SSR with frameworks like Next.js or Remix for faster First Contentful Paint (FCP) and better SEO. Use SSG for pages with relatively static content. Consider Incremental Static Regeneration (ISR) for semi-dynamic content that doesn't change frequently.

### 13. **Efficient Data Fetching**
Implement proper caching strategies using SWR or React Query. Use stale-while-revalidate pattern to show cached data immediately while fetching fresh data. Implement request deduplication to prevent multiple identical API calls. Use pagination or infinite scroll instead of loading all data at once.

### 14. **Avoid Unnecessary Effects and Renders**
Be mindful of useEffect dependencies to prevent infinite loops and unnecessary executions. Use the ESLint exhaustive-deps rule to catch missing dependencies. Consider if you actually need an effect or if logic can run during render. Avoid using effects for derived state—compute it during render instead.

### 15. **Optimize CSS and Animations**
Use CSS containment to limit layout, style, and paint calculations. Animate only transform and opacity properties for hardware-accelerated animations. Avoid animating layout properties like width, height, or margin. Use will-change sparingly for elements that will animate. Enable GPU acceleration for smooth 60fps animations.

### 16. **Production Build and Compression**
Always use production builds that strip development warnings and enable optimizations. Enable Gzip or Brotli compression on your server. Minify JavaScript, CSS, and HTML. Use environment variables to exclude development-only code from production bundles.

### 17. **Profiling and Performance Monitoring**
Regularly use React DevTools Profiler to identify slow components and unnecessary re-renders. Implement performance monitoring with tools like Lighthouse, WebPageTest, or Chrome DevTools. Set up Real User Monitoring (RUM) to track actual user experience. Establish performance budgets and monitor them in CI/CD.

### 18. **Reduce Re-renders with Key Props**
Use stable, unique keys for list items based on item IDs, never array indices. This helps React efficiently update the DOM when lists change. Avoid using random values or timestamps as keys, which force React to destroy and recreate components unnecessarily.

### 19. **Optimize Dependency Arrays and Closures**
Be careful with closure scope in useEffect, useMemo, and useCallback. Extract static values outside components to avoid recreating them. Use refs for values that change but shouldn't trigger re-renders. Consider using useReducer instead of multiple useState calls for related state.

### 20. **Asset Optimization and CDN**
Serve static assets from a CDN for faster delivery based on geographic location. Use proper cache headers for static assets. Implement asset versioning or hashing for cache busting. Compress text-based assets and minify all static resources. Consider using a service worker for advanced caching strategies and offline support.

---

## Performance Measurement Metrics to Track

- **First Contentful Paint (FCP)**: When first content appears on screen
- **Largest Contentful Paint (LCP)**: When main content is rendered (target: under 2.5s)
- **Time to Interactive (TTI)**: When page becomes fully interactive
- **First Input Delay (FID)**: Time from user interaction to browser response (target: under 100ms)
- **Cumulative Layout Shift (CLS)**: Visual stability score (target: under 0.1)
- **Total Blocking Time (TBT)**: Total time the main thread is blocked

## Tools for Performance Optimization

- React DevTools Profiler
- Chrome DevTools Performance tab
- Lighthouse CI
- webpack-bundle-analyzer
- Why Did You Render library
- Performance API for custom metrics

---

*Remember: Performance optimization is an iterative process. Measure first, optimize bottlenecks, then measure again. Premature optimization can lead to complex code without meaningful benefits. Focus on the metrics that matter most to your users.*