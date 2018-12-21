# react-iframe [![build status](https://travis-ci.org/trendmicro-frontend/react-iframe.svg?branch=master)](https://travis-ci.org/trendmicro-frontend/react-iframe) [![Coverage Status](https://coveralls.io/repos/github/trendmicro-frontend/react-iframe/badge.svg?branch=master)](https://coveralls.io/github/trendmicro-frontend/react-iframe?branch=master)

[![NPM](https://nodei.co/npm/@trendmicro/react-iframe.png?downloads=true&stars=true)](https://nodei.co/npm/@trendmicro/react-iframe/)

React Iframe

Demo: https://trendmicro-frontend.github.io/react-iframe

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-iframe](https://github.com/trendmicro-frontend/react-iframe):

  ```
  npm install --save react @trendmicro/react-iframe
  ```

2. Install [react-iframe](https://github.com/trendmicro-frontend/react-iframe)` with <b>@trendmicro</b> scope:

  ```js
  import Iframe from '@trendmicro/react-iframe';
  ```

## Usage

### Fixed Iframe Height

```js
<Iframe src="index.html" width="100%" height={240} />
```

### Resize Iframe to Fit Content (Same Domain Only)

```jsx
import ResizeObserver from 'resize-observer-polyfill';

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

## API

### Properties

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
src | string | | The src attribute specifies the address of the document to embed in the iframe.
width | string or number | '100%' | The width attribute specifies the width of an iframe, in pixels.
height | string or number | '100%' | The height attribute specifies the height of an iframe, in pixels.
sandbox | boolean, object, or string |  | The sandbox attribute enables an extra set of restrictions for the content in the iframe.
sandbox.allowForms | boolean | true | Re-enables form submission.
sandbox.allowModals | boolean | true | Sandboxed frames will block modal dialogs by default.
sandbox.allowPointerLock | boolean | false | Re-enables APIs.
sandbox.allowPopups | boolean | true | Re-enables popups.
sandbox.allowSameOrigin | boolean | true | Allows the iframe content to be treated as being from the same origin.
sandbox.allowScripts | boolean | true | Re-enables scripts.
sandbox.allowTopNavigation | boolean | false | Allows the iframe content to navigate its top-level browsing context.
onLoad | function | | Callback invoked when the iframe has been loaded: `({ event: Event, iframe: HTMLElement })`
onBeforeUnload | function | | Callback invoked when the iframe is about to be unloaded: `({ event: Event, iframe: HTMLElement })`
onUnload | function | | Callback invoked when the iframe has unloaded: `({ event: Event })`

## License

MIT
