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

```js
<Iframe src="./index.html" />
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

## License

MIT
