---
title: Let's create ReactJS from scratch- Part 1
date: '2019-01-18'
spoiler: I have always wondered how React works under the hood
tags: reactjs, reverse-engineering, architecture
---

Being a React fanboy, I have always wondered how it is so performant even in heavy data-driven applications. Also, I have always wanted to contribute to ReactJS on GitHub but somehow, I feel that the repository can be overwhelming for someone who has never contributed to open-source apart from creating issues.

Right now I am brushing up my Data Structures and Algorithmic skills and was thinking where to apply what I have learnt. Implementing your own linked lists and hashmaps is cool but what next? This is when I thought to create my own version of ReactJS.

This would help me with a couple of things:

- Understand how React works internally.
- Apply my little knowledge of data structures to re-create something which I currently use as a black box.
- Make me a better Javascript developer.
- Helping me in contributing to the original ReactJS library.

Let's also list out the features which I am planning to add to _MyReact_

- Render DOM elements
- Possibly explore JSX and use it to render DOM elements.
- Custom Class components and state
- And the MVP virtual DOM!
- Also, I want to understand the Fiber Architecture and re-create it

So let's get started, first of all, we need a name. I am really not good at naming things. So I named it _MyReact_. Pretty innovative eh?

Okay now, let's really start. So our aim is to create a basic version of ReactJs first without worrying about performance, debuggability, portability etc. Although, we are going to improve it over time and _soon replace the original ReactJS with MyReact._ \*laughs like a villain\*

> You can find more information about the [implementation details](https://reactjs.org/docs/codebase-overview.html) or enjoy [this talk](https://www.youtube.com/watch?v=_MAD4Oly9yg) by Paul O’Shannessy.

Let's start by creating the `render()` function which is responsible for creating the DOM elements. You don't need to be a pro with javascript to understand the `document.createElement()` function but for the sake of this tutorial, let's revisit the basic DOM API available in the browser

```js
// Get an element by its id,
var parent = document.getElementByID('app-root')

// Now create a new element of a given tag
var child = document.createElement('h1')

// Add properties to the DOM element
child.classList = ['bold', 'fancy-color']
child.innerHTML = 'Hello World!'

// Now append that element to the parent
parent.appendChild(child)
```

So far we haven't defined anything new, all the operations above are supported in all browsers without any libraries.

As you can see in order to render tags on a webpage we are going to use the `document.createElement()`. That will take care of rendering tags on a page. Also, we can modify the properties and make it look like whatever we want using classes and custom inline CSS.

Now that we have a way to render tags on the webpage, let's go a step back and define what an element may look like in MyReact.

```js
// If we want to represent a DOM element as an object,
// following would be its properties
var element = {
  type: 'div',
  props: {
    // properties of the element
    id: 'body',
    // children can again contain elements,
    // which are going to have the same structure
    children: [
      { type: 'p', props: { nodeValue: 'If you want to know more ' } },
      { type: 'a', props: { href: '/home', nodeValue: 'Click here' } },
    ],
  },
}
```

Nothing fancy here, just a javascript object which represents the following structure in MyReact. Let's call them MyReact Elements from now on.

```html
<div id="body">
  <p>If you want to know more</p>
  <a href="/home">Click here</a>
</div>
```

MyReact elements are **not** really different from [React Elements](https://reactjs.org/blog/2014/10/14/introducing-react-elements.html). You usually don't use javascript objects to define and create elements in React and probably use JSX. We are going to do the same in future posts. For now, we are going to use the above javascript object to define and render MyReact elements as DOM elements.

## The Render function

We have MyReact elements, let's implement the `MyReact.render` function which is equivalent to [ReactDOM.render](https://facebook.github.io/react/docs/react-dom.html#render). This function will create the DOM element defined by the javascript object and append it's to its parent.

```js
function render(element, parent) {
  // Get the props and type from element object
  const { type, props } = element

  // Check if there are any childrens of the given element
  const childElements = props.children || []

  // render those childrens recursively first
  childElements.forEach(el => render(el, dom))

  // finally append the element to the parent element
  parent.appendChild(dom)
}
```

This is the most basic version of the `render` function you'll ever see. All this is doing is creating a DOM element and recursively adding all its children to the parent. This is still missing all the attributes and the eventListeners.

Let's iterate over the `props` keys using `Object.keys` to get eventListeners & attributes and set them properly.

```js
function render(element, parent) {
  // Get the props and type from element object
  const { type, props } = element

  // Filter for eventListeners in the props
  const isListener = name => name.startsWith('on')

  // Add eventListeners to the dom element
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, props[name])
    })

  const isAttribute = name => !isAttribute && name !== 'children'

  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name]
    })

  // Check if there are any childrens of the given element
  const childElements = props.children || []

  // render those childrens recursively first
  childElements.forEach(el => render(el, dom))

  // finally append the element to the parent element
  parent.appendChild(dom)
}
```

## Render DOM Text Nodes

Now, this looks like a pretty complete `render` function. Except for one thing. The pure Text Nodes. Let's define how a text element will look like as a javascript object.

```js
const textElement = {
  type: span,
  props: {
    children: [
      {
        type: 'TEXT_NODE',
        props: { nodeValue: 'Hello World!' },
      },
    ],
  },
}
```

The above definition would define something like when passed through our `render` function

```html
<span> Hello World! </span>
```

Notice how we defined a new type `TEXT_ELEMENT` which we will use in our render function. Let's see how we use that. Instead of using `createElement` we are going to use `createTextNode` function. The `nodeValue` property will be set in the same way as before and we don't need to pass it explicitly in the `createTextNode` function.

```js
function render(element, parent) {
  // Get the props and type from element object
  const { type, props } = element

  // Check if it is a text element
  const isTextElement = type === 'TEXT_ELEMENT'

  // Create a new dom element or TextNode based on the type
  const dom = !isTextElement
    ? document.createElement(type)
    : document.createTextNode("")

  // Filter for eventListeners in the props
  const isListener = name => name.startsWith('on')

  // Add eventListeners to the dom element
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, props[name])
    })

  const isAttribute = name => !isAttribute && name !== 'children'

  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name]
    })

  // Check if there are any childrens of the given element
  const childElements = props.children || []

  // render those childrens recursively first
  childElements.forEach(el => render(el, dom))

  // finally append the element to the parent element
  parent.appendChild(dom)
}
```

The entire code for this is available on [Github](https://github.com/anamritraj/my-react/blob/master/src/render.js).

## Endnotes
This was really fun! The entire code for this is available on [Github](https://github.com/anamritraj/my-react). This will be a series of posts where I will incrementally add features and post about my findings.

I would love to know what features would you want me to implement next. Though I have only started, I plan to make this as close to original React as possible. It might never be production ready but I will learn a lot.

See you next time!