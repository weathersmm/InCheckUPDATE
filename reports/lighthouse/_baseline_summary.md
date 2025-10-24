# Baseline Lighthouse Opportunities

Source: /workspace/lh-desktop.json

| Rank | Audit | Potential savings |
|---:|---|---:|
| 1 | Properly size images | 44 KB |
| 2 | Serve images in next-gen formats | 2620 ms |
| 3 | Enable text compression | 2400 ms |
| 4 | Eliminate render-blocking resources | 1655 ms |
| 5 | Reduce unused CSS | 1500 ms |
| 6 | Reduce unused JavaScript | 1200 ms |
| 7 | Avoid serving legacy JavaScript to modern browsers | 1 KB |
| 8 | Defer offscreen images | 450 ms |
| 9 | Minify CSS | 150 ms |
| 10 | Minify JavaScript | 150 ms |

## Notes
- 1. Properly size images: Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/).
- 2. Serve images in next-gen formats: Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighth
- 3. Enable text compression: Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-com
- 4. Eliminate render-blocking resources: Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/do
- 5. Reduce unused CSS: Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/perform
- 6. Reduce unused JavaScript: Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/
- 7. Avoid serving legacy JavaScript to modern browsers: Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile [Baseline](https://web
- 8. Defer offscreen images: Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/perfor
- 9. Minify CSS: Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).
- 10. Minify JavaScript: Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).

## Top Diagnostics