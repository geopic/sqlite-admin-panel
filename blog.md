### 30/03/2020

Hello all, and welcome to the development blog for my `sqlite-admin-panel` project. In this blog, I will be writing on the development process and approach I took in solving different problems and realising the concept of a web-based SQLite manager.

Having been acquainted with Vue for a while now, I have picked up how to tailor the initial directory structure from `@vue-cli` into a structure I find to be more sensible for full-stack development. `@vue-cli` places most of the files it generates into `/src`, with the assumption that you are simply developing a Vue app alone and will deal with the back-end separately once everything Vue-related has been compiled to `/dist`. Full-stack developers need `/src` to house back-end files as well, so this ownership of `/src` by Vue presents an obstacle.

In `vue.config.js`, there is a way to direct `vue-cli-service` to a different `main.ts` (or `main.js`) file when you run the `npm run serve` command, which works as of `@vue/cli` v4.2.3:

```js
module.exports = {
  // ...
  configureWebpack: {
    entry: {
      app: `${__dirname}/src/vue/main.ts`
    }
  }
};
```

By adding the properties shown above, I am able to re-assign the location which the compiler within `vue-cli-service` seeks out in order to compile and bundle the whole Vue project. This makes the project *so* much easier to manage and clearer when I'm writing server-side code as well as 'common' (cross-end) files inside `/src`.

Having laid down the foundations of the project, I began work on the site's basic design. One trick I like to use concerning the design of the page as a whole involves using the `grid` CSS property to lay out the `<header>`, `<main>` and `<footer>` elements in a clean manner. In `App.vue`, I give the eponymous element a height of `100vh` (so it is as tall as the display showing it) and the following other rules:

```scss
#app {
  /*...*/
  display: grid;
  grid-template-rows: 40px auto 40px;

  & > * {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }
  /*...*/
}
```

In SCSS, which provides the ability to nest selectors, `& > *` is an expression which, in English, points to all children of the element. I set the height of the rows which contain the header and footer to `40px`, to give them *some* space (but not too much), with the row containing the `<main>` element given as much space as it wants.

The rules I've given to the children are well-worn and a lot of designers working with CSS will know them like "the back of their hand". The elements within each child are vertically-aligned with `align-items: center`, which works because the children themselves are granted maximum height space with `height: 100%`, and then `justify-content: center` aligns the elements inside each child to the centre horizontally. I recall, from a dark time in the past (the early-to-mid 2000s, not dark at all outside of this context), a lack of a cohesive, non-hacky approach to vertically-align elements to the centre of their parent. Thankfully, languages have progressed since that time, particularly within the domain of the web.
