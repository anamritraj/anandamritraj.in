---
title: Let's create ReactJS from scratch- Part 2
date: '2019-01-23'
spoiler: JSX from scratch!
tags: reactjs, reverse-engineering, architecture
---

## Recap

In this series of posts, we are creating major react functionalities from scratch. So far we have covered the `render` function. You can read more about it here: [Let's create ReactJS from scratch- Part 1](/lets-create-reactjs-from-scratch-part-1).

## Introducing JSX

Okay, so we got till this point where we have created our own `render` function which takes _MyReact_ elements as arguments and renders them to DOM. While this is cool to render a link inside a div, if you have to render anything more than that, say navigation, it becomes annoying to write our HTML tags as javascript objects.

Let's see an example,

```js
const myElement = {
  type: 'div',
  props: {
    children: [
      {
        type: 'ul',
        props: {
          children: [
            {
              type: 'li',
              props: {
                children: [
                  {
                    type: 'TEXT_ELEMENT',
                    props: {
                      nodeValue: 'I want to use JSX',
                    },
                  },
                ],
              },
            },
            {
              type: 'li',
              props: {
                children: [
                  {
                    type: 'TEXT_ELEMENT',
                    props: {
                      nodeValue: "Its only second li and I'm annoyed!",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
}
```

The above lines will render this

```html
<div>
  <ul>
    <li>I want to use JSX</li>
    <li>Its only second li and I'm annoyed!</li>
  </ul>
</div>
```

Introducing JSX! JSX is just syntactic sugar. Using a JSX transpiler you can convert your HTML looking syntax into elements which can be understood by javascript and rendered correctly by the browser.

As a JSX transpiler, you can use [Babel](https://github.com/babel/babel/). It has a great open-source community and easy to use CLI tool.

If you are working with React you are most probably using it. But JSX is not actually tied to react it can be used without react and is not very tough to understand and use.

> If you want to learn more about JSX check out [this article](https://jasonformat.com/wtf-is-jsx/), [Draft: JSX Specification](http://facebook.github.io/jsx/) and also [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html) react documentation.

So in case of the above example, you can write something like below,

```js
/** @jsx createElement */
const myElement = (
  <div>
    <ul>
      <li>I want to use JSX</li>
      <li>Its only second li and I'm annoyed!</li>
    </ul>
  </div>
)
```

If you are familiar with javascript you would be guessing if the above is a valid javascript: _its not_.

The first line is a comment which babel understands, the name `createElement` is the name of the function which babel is going to call for each tag it encounters. It is known as _pragma_ in [babel configuration](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma).

Babel will transpile the JSX code into a bunch of function calls like this

```js
const someJsx = (
  createElement(
  "div",
  { "class": "nav" },
  createElement(
    "ul",
    { "class": "nav-links" },
    createElement(
      "li",
      null,
      "Home"
    ),
    createElement(
      "li",
      null,
      "Profile"
    ),
    createElement(
      "li",
      null,
      "Logout"
    )
  )
);
)
```

So all we need to do now is implement `createElement` function. The first argument of the function is `type` of the element. The second element is `props` and the following elements are children. If you remember our implementation of the `render` function from [here](/lets-create-reactjs-from-scratch-part-1/), you will remember that the render function takes the element in the form,

```js
const myElement = {
  type: 'div',
  props: {
    ..
    children: []
  }
}
```

So what we need to do in `createElement` function is to move the third argument which contains the `children` under the `props` and return the resulting object which can be consumed by our `MyReact.render` function.

If I am not making sense there, let's create the `createElement` function and let the code do the talking. Its similar to the `React.createElement` function. Check out [this page](https://reactjs.org/docs/jsx-in-depth.html) to learn more.

## The createElement function

I would just put it out there and explain the code.

```js
function createElement(type, config, ...args) {
  const props = Object.assign({}, config)
  const hasChildren = args.length > 0

  props.children = hasChildren ? [].concat(...args) : []

  return { type, props }
}
```

The tree arguments are provided to the function by the transpiler (which is babel in our case). The third argument will contain all of the children of the current node. We are simply assigning the props to the `props` object, children to `props.children` object. Then return the object, this is something our `MyReact.render` function can work with!

Well, that was pretty simple. But our render function `MyReact.render` expects the text elements to have a type of `TEXT_ELEMENT` and also a `nodeValue` prop. So let's do that!

```js
function createElement(type, config, ...args) {
  const props = Object.assign({}, config)
  const hasChildren = args.length > 0

  const allChildren = hasChildren ? [].concat(...args) : []
  // Filter all the children which are null,
  // we don't need to render them
  props.children = allChildren
    .filter(child => child !== null && child !== false)
    .map(child => (child instanceof Object ? child : createTextElement(child)))
  // For text nodes, child above is a string
  return { type, props }
}

// This function handles the creation of text nodes
function createTextElement(value) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: value,
    },
  }
}
```

Now our `createElement` function is complete and ready to use. A couple of things before you try to use this to create a web app. Since we are using JSX which is not a part of standard javascript, we need to transpile this code before we can use this. I am going to use Babel for transpiling the code into something which the browser can understand.

You can check out this [REPL](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PQKhAIAECsGcA9wFkCeAlApgQwMYBcA6HAJ2zwwFEAbDAWwwDs9wRgAoHAewdmdU1zMAvOADmGPP2z4AFAEoA3B269wAFQoANNQH0KAGQpIKAOTXgRAIg3a9h42ctLlPZrRTU6jYeBltw4AA8ACYAlgBuAHz-AUEArlTRsbGBVKGRAJK0AA409EzgAvjgpAzBGMSBwGlJyUE1WbleBUXMXDnc3lU1Mcmp6Y153oXSzABmoQBGFd3pvSk1mLm4GOCcxKGioQxYVCOCs7V9NQDC3ACOcRXgeAAWqwDu61TBAISH81UJtVVhUWyKNhsKSCAilcrEGTuTz5PAAGnAwU4ODisII4jwMO8ACEUBlgjJLO4ALSkQTErDZbKWOSAthjOIMfChbhiCQg2RycAAbxiDKZeBZDBKjAhMgwQyYCOyWFKeC5vOSwGA4AA4hIbvdwNliJxsrBwFgyjcUNlVmNdbRwBLmsxOJNoBh8PMuK4eSazdLdfrwABfCzWyV4ZxKlUne44ADW4FCYxjzFCBqwNww8GYNthLpUCdgalTmKDAbwptWQjL4GsWl0BiMpjUTiBofAJzJ5EN4AYGAeiM4Voz3izbqRVpEr0TebTWKY8wCAH4eyi0SQyJQgzJi2a5DPwAAuBeo7xEVsYCd4EyccoyHV62AEBgXjAANV2VzpTYAYqEqORiOAxutrXCbx9ETchO2IA1tk1VZr31QdVETEDeEYa4RB2egLEiDssHoAheFlPBYAAdVCO5CW4GkQ1iZVwAAQWCYJAOA0CUIgm5OGgns-yDeYAHkHSdQhIwwFBYCvb1YC3OpwAICZvwqGREJY8CpLqWT1goXBbhkdDSywxVpPAV1VAwICmDUEsA10gg8E4fROAeCoTiwWAMHkPC4kmXgNgYUQZAAJkBQyuIILAGIoMy8CQsCFNM7wLM9bUJIAbV0gBdIK6l9N9YmMnNaLwPANkmOI2zQnC9PAMdYAKoqplK1YADJGuwjDXnLSwcFuL9glKBs-IE_ACGE0TxJvVTklkr8f0UmrCuKhqJtidTiE0rqdIqzCeW3AJh1Siq0oDWDYH2-g0qUaTsqogIaPDJ1o1jaDSENZ6jRQIzupeUoDU4OM7lWLYzMDW14LaT7ginQijokohwdKcAAB8EfAZLzsbaiVXBa47k4VyPp676RRRCCIgld6JggvAXXByHb3_VatPFPYhCwrHIQlBFh1pa7wBoiYdioKh3spM1jX-4HYXYziZTlCWB2SGXDxF0Vwx6mQuYuv10f5ZlWWXLByEh9cSwRV0JlEBECCt2VREk7bkjypKbwDfjHSGlzYE2BgZG5X1Te4c3MoCR3bhc1WvsYAMbdvGhfLucAsIABh5x3diocPesjkRQ9gDP4fnVGiG4HADZkK3QuIW2uT3VGeeO2GCazw1Bbzxhtym-TIS6nqtu7l4qvLBgEj2Zr8f79qRDGXZXKWgICFoSkZD7xiWZ2sfGO2fCmQwX7wFdwTwHnZfdyM49TyN5fZ_AHKAlIPA4mIYVuQ9DAvWd31Nd9bXGV14V9fIc-a5wgvgwAqeYd8H5P23BuDAe4bDVnsHWOE25jp7gMtJe85RnxUCuHuYBOCMDbi_skD-MRiEinvo_e2sQ2bIIdseSGZClBfyAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=6.26.0&envVersion=1.6.2) to see how babel converts the code into a bunch of `createElement` calls.

> If you just want to see how this is used in a real-world application, I made a [**codepen demo**](https://codepen.io/anamritraj/pen/gZVKBy) to show the usage.

## Making it work in the browser

The above codepen demo works since we are using babel as a preprocessor and it includes a bunch of plugins with it. If you want to make it work in your local machine you would have to include a couple of packages to transpile your JSX into `createElement` function calls.

We'll start of by adding a bunch of npm packages,

```bash
npm i --save-dev @babel/cli @babel/core @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx @babel/preset-env
```

- `@babel/core` is the core babel package

- `@babel/cli` allows us to use babel as a CLI tool

- `@babel/plugin-syntax-jsx` helps babel to understand the JSX syntax as babel does not support it out of the box

- `@babel/plugin-transform-react-jsx` this is the main package which transpiles JSX into function calls. By default this uses React.createElement as the pragma function. You can read more about it [here](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma).

- `@babel/preset-env` is responsible for allowing us to use the latest JavaScript without needing to micromanage syntax transforms (and optionally, browser polyfills) that are needed by the browser. This is just a collection of plugins.

Now one final thing we need to do is add a `.babelrc` file which is just to tell babel which presets and plugins (which we installed above) to use. Let's define one.

```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-react-jsx"]
}
```

We are almost done, now all we need to do is run the babel-cli to compile our file containing JSX code into a which the browser can understand.

```sh
babel ./src/main.js -o ./dist/bundle.js
```

`-o` flag tells babel to output the file as a specified name in a folder.

## Code & Demo

The entire code for this is available on [Github](https://github.com/anamritraj/my-react).

You can check out this [REPL](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PQKhAIAECsGcA9wFkCeAlApgQwMYBcA6HAJ2zwwFEAbDAWwwDs9wRgAoHAewdmdU1zMAvOADmGPP2z4AFAEoA3B269wAFQoANNQH0KAGQpIKAOTXgRAIg3a9h42ctLlPZrRTU6jYeBltw4AA8ACYAlgBuAHz-AUEArlTRsbGBVKGRAJK0AA409EzgAvjgpAzBGMSBwGlJyUE1WbleBUXMXDnc3lU1Mcmp6Y153oXSzABmoQBGFd3pvSk1mLm4GOCcxKGioQxYVCOCs7V9NQDC3ACOcRXgeAAWqwDu61TBAISH81UJtVVhUWyKNhsKSCAilcrEGTuTz5PAAGnAwU4ODisII4jwMO8ACEUBlgjJLO4ALSkQTErDZbKWOSAthjOIMfChbhiCQg2RycAAbxiDKZeBZDBKjAhMgwQyYCOyWFKeC5vOSwGA4AA4hIbvdwNliJxsrBwFgyjcUNlVmNdbRwBLmsxOJNoBh8PMuK4eSazdLdfrwABfCzWyV4ZxKlUne44ADW4FCYxjzFCBqwNww8GYNthLpUCdgalTmKDAbwptWQjL4GsWl0BiMpjUTiBofAJzJ5EN4AYGAeiM4Voz3izbqRVpEr0TebTWKY8wCAH4eyi0SQyJQgzJi2a5DPwAAuBeo7xEVsYCd4EyccoyHV62AEBgXjAANV2VzpTYAYqEqORiOAxutrXCbx9ETchO2IA1tk1VZr31QdVETEDeEYa4RB2egLEiDssHoAheFlPBYAAdVCO5CW4GkQ1iZVwAAQWCYJAOA0CUIgm5OGgns-yDeYAHkHSdQhIwwFBYCvb1YC3OpwAICZvwqGREJY8CpLqWT1goXBbhkdDSywxVpPAV1VAwICmDUEsA10gg8E4fROAeCoTiwWAMHkPC4kmXgNgYUQZAAJkBQyuIILAGIoMy8CQsCFNM7wLM9bUJIAbV0gBdIK6l9N9YmMnNaLwPANkmOI2zQnC9PAMdYAKoqplK1YADJGuwjDXnLSwcFuL9glKBs-IE_ACGE0TxJvVTklkr8f0UmrCuKhqJtidTiE0rqdIqzCeW3AJh1Siq0oDWDYH2-g0qUaTsqogIaPDJ1o1jaDSENZ6jRQIzupeUoDU4OM7lWLYzMDW14LaT7ginQijokohwdKcAAB8EfAZLzsbaiVXBa47k4VyPp676RRRCCIgld6JggvAXXByHb3_VatPFPYhCwrHIQlBFh1pa7wBoiYdioKh3spM1jX-4HYXYziZTlCWB2SGXDxF0Vwx6mQuYuv10f5ZlWWXLByEh9cSwRV0JlEBECCt2VREk7bkjypKbwDfjHSGlzYE2BgZG5X1Te4c3MoCR3bhc1WvsYAMbdvGhfLucAsIABh5x3diocPesjkRQ9gDP4fnVGiG4HADZkK3QuIW2uT3VGeeO2GCazw1Bbzxhtym-TIS6nqtu7l4qvLBgEj2Zr8f79qRDGXZXKWgICFoSkZD7xiWZ2sfGO2fCmQwX7wFdwTwHnZfdyM49TyN5fZ_AHKAlIPA4mIYVuQ9DAvWd31Nd9bXGV14V9fIc-a5wgvgwAqeYd8H5P23BuDAe4bDVnsHWOE25jp7gMtJe85RnxUCuHuYBOCMDbi_skD-MRiEinvo_e2sQ2bIIdseSGZClBfyAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=6.26.0&envVersion=1.6.2) to see how babel converts the code into a bunch of `MyReact.createElement` calls.

I also made a [**codepen demo**](https://codepen.io/anamritraj/pen/gZVKBy) to demonstrate how you would use this in a real-world application.

## Endnotes

This is the second post in the series where we are creating a clone of ReactJs! As always, the entire code for this is available on [Github](https://github.com/anamritraj/my-react).

If you see any errors then please let me know! I am also human and don't know everything. Thanks for reading! :)

I would love to know what features would you want me to implement next. Though I have only started, I plan to make this as close to original React as possible. It may never be production ready but I will learn a lot.

See you next time!
