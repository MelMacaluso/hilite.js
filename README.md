# Hilite.js

<img src="https://user-images.githubusercontent.com/24974216/80926480-820dbe80-8d8f-11ea-86fb-bbe6205fa55f.gif">

## CDN use

Embed styles and script

```html
<script src="https://cdn.jsdelivr.net/gh/melmacaluso/hilite.js/build/index.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/melmacaluso/hilite.js/build/index.css"
/>
```

Create your custom Hilite class

```js
const { Hilite } = window.Hilite;
```

## NPM use

`npm i @melmacaluso/hitlite.js`

```js
import Hilite from '@melmacaluso/hilite.js';
```

## How to

Create a flow

```js
const exampleFlow = new Hilite([
  {
    target: document.querySelector('.example1'),
    message: 'this is an example 1',
  },
  {
    target: document.querySelector('.example2'),
    message: 'this is an example 2',
  },
]);
```

Start or finish the flow

```js
exampleFlow.start();
// or
exampleFlow.endOfFlow();
```
