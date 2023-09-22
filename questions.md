# Deel FE Questions

## What is the difference between Component and PureComponent? Give an example where it might break my app.
In React, Components update whenever something changes, while PureComponent updates only if there's a real change in the data. For instance, if you have a list of items, using Components can lead to unnecessary updates when the parent changes, even if the item itself remains the same. PureComponent helps avoid this.

## Context + ShouldComponentUpdate might be dangerous. Why is that?
Using Context with ShouldComponentUpdate can be problematic because it can force all components that consume the context to re-render, even when the data they rely on hasn't actually changed. *This can slow down the app.*

## Describe 3 ways to pass information from a component to its PARENT. 
- Callback functions: The child calls a function provided by the parent.
- Props: The child updates a prop, and the parent receives the new value.
- Context API: Components can share data with their ancestors using the Context API.

## Give 2 ways to prevent components from re-rendering.
To prevent unnecessary component re-renders, you can use PureComponent or memoization to optimize updates.

- `React.memo` is a higher-order component (HOC) that memoizes a functional component, preventing it from re-rendering if its props have not changed.
- Use Callbacks for Event Handlers: When defining event handlers in functional components, make sure to use callback functions to prevent re-creation of event handlers on each render.

```js
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // Good: Using a callback function to update state
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
```

## What is a fragment and why do we need it? Give an example where it might break my app.
Fragments in React let you group multiple elements without introducing an extra HTML element. They come in handy when you need to structure JSX without adding an unnecessary container element.

_pending example_

## Give 3 examples of the HOC pattern.
Higher Order Components are patterns in React for adding functionality to components.

- Auth HOC that adds authentication logic
- Logging HOC that logs actions and events,
- Styling HOC that applies CSS based on conditions

## What's the difference in handling exceptions in promises, callbacks and async… Await?

Handling exceptions in Promises, callbacks, and async-await differs in terms of syntax and approach, but the underlying concept of error handling remains consistent. 

- Promises: Errors in Promises are caught using .catch() or .then(null, rejectionHandler).
- Callbacks: Errors in callbacks are typically checked by looking at the error argument.
- Async/Await: When using async/await, you can use try/catch blocks to handle exceptions.

## How many arguments does setState take and why is it async.
The setState function in React accepts an object or a function, and it's asynchronous. It's designed this way to batch multiple state updates for better performance, allowing React to optimize when to actually update the component and trigger re-renders.

## List the steps needed to migrate a Class to Function Component.
- Create a new function component.
- Replace `this.state` with the `useState` hook.
- Replace lifecycle methods with useEffect and other hooks as needed.
- Remove class-related syntax (constructor, render method, etc.).

## List a few ways styles can be used with components.
- Inline styles: Define styles directly in JSX using the style attribute.
- CSS Modules: Import and use CSS with component-specific class names.
- styled-components: Use a library to define component-specific styles using tagged template literals in JavaScript.

## How to render an HTML string coming from the server.
To render an HTML string coming from the server in React, you can use the dangerouslySetInnerHTML prop. However, you should be extremely cautious when doing this, as it can pose security risks if the HTML string contains malicious code

```js
import React from 'react';

function HTMLRenderer({ htmlString }) {
  // Sanitize and validate the HTML string on the server-side
  // to prevent security vulnerabilities before sending it to the client.

  // Use the 'dangerouslySetInnerHTML' prop to render the HTML string.
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default HTMLRenderer;
```