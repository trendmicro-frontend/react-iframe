### Fixed Iframe Height

```jsx
<Iframe
    src="iframe.html"
    style={{
        width: '100%',
        height: 240
    }}
/>
```

### Resize Iframe to Fit Content (Same Domain Only)

```jsx
const ResizeObserver = require('resize-observer-polyfill').default;

<Iframe
    src="iframe.html"
    onLoad={({ event, iframe }) => {
        if (!(iframe && iframe.contentDocument)) {
            return;
        }

        const target = iframe.contentDocument.body;
        const nextHeight = target.offsetHeight;
        iframe.style.height = `${nextHeight}px`;

        const observer = new ResizeObserver(entries => {
            const target = iframe.contentDocument.body;
            const nextHeight = target.offsetHeight;
            iframe.style.height = `${nextHeight}px`;
        });
        observer.observe(target);
    }}
/>
```
