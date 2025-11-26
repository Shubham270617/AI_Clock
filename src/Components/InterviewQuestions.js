// src/components/InterviewQuestions.js
// 100 JavaScript / React / Web interview Q&A

const QUESTIONS = [
  {
    question: "What is the difference between let, const and var in JavaScript?",
    answer:
      "var is function-scoped and can be re-declared, let and const are block-scoped. let can be reassigned, const cannot. var is also hoisted differently and can lead to weird bugs."
  },
  {
    question: "Explain hoisting in JavaScript.",
    answer:
      "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Function declarations are fully hoisted, while var declarations are hoisted but not their assignments. let/const are hoisted but kept in the temporal dead zone until execution reaches them."
  },
  {
    question: "What are closures and why are they useful?",
    answer:
      "A closure is a function that remembers its outer lexical environment even after the outer function has returned. They are useful for data privacy, function factories, and maintaining state across calls without using global variables."
  },
  {
    question: "What is the event loop in JavaScript?",
    answer:
      "The event loop is the mechanism that lets JavaScript appear concurrent. It continuously takes tasks from the callback/microtask queues and pushes them onto the call stack when it is empty, allowing async code like setTimeout, Promises and I/O to run."
  },
  {
    question: "Explain the difference between synchronous and asynchronous code.",
    answer:
      "Synchronous code runs sequentially and blocks further execution until a statement completes. Asynchronous code schedules work to happen later (e.g. timers, network calls) and does not block the main thread; callbacks/promises handle the result when it’s ready."
  },
  {
    question: "What are Promises and how do they work?",
    answer:
      "A Promise represents a value that may be available now, later, or never. It has three states: pending, fulfilled and rejected. You attach handlers with .then, .catch and .finally to react to the eventual result instead of nesting callbacks."
  },
  {
    question: "What is async/await and how does it relate to Promises?",
    answer:
      "async/await is syntax sugar over Promises. An async function always returns a Promise and inside it you can use await to pause until a Promise settles. It makes asynchronous code look more like synchronous code and is easier to read and handle errors with try/catch."
  },
  {
    question: "What is the difference between call, apply and bind?",
    answer:
      "All three set the value of this for a function. call(thisArg, ...args) invokes immediately with comma-separated args. apply(thisArg, [args]) invokes immediately with an array of args. bind(thisArg, ...args) returns a new function with this and optionally some arguments pre-set."
  },
  {
    question: "Explain prototypal inheritance in JavaScript.",
    answer:
      "Every object has an internal [[Prototype]] link to another object. When you access a property that doesn’t exist on the object, JavaScript looks up the prototype chain until it finds it or reaches null. This is prototypal inheritance."
  },
  {
    question: "What is the difference between == and ===?",
    answer:
      "== is the loose equality operator and performs type coercion before comparison. === is the strict equality operator and compares both value and type without coercion. In practice, === is preferred to avoid surprising conversions."
  },
  {
    question: "Describe how 'this' works in JavaScript.",
    answer:
      "this is determined by how a function is called. In a method it points to the object before the dot, in a constructor it points to the new instance, with call/apply/bind you can set it manually. In strict mode standalone functions have this as undefined; in non-strict it is the global object. Arrow functions don’t have their own this; they close over the surrounding lexical this."
  },
  {
    question: "What is functional programming and how is it applied in JS?",
    answer:
      "Functional programming emphasizes pure functions, immutability and avoiding shared state. In JS we apply it using functions like map, filter, reduce, composing small functions, and avoiding side effects in business logic."
  },
  {
    question: "What is a pure function?",
    answer:
      "A pure function always returns the same output for the same input and has no side effects: it doesn’t modify external state, doesn’t rely on global mutable data and doesn’t perform I/O."
  },
  {
    question: "Explain immutability and why it matters.",
    answer:
      "Immutability means data structures are not modified after creation; instead you create new copies with the desired changes. It makes code easier to reason about, prevents accidental side effects and plays well with React state updates and time-travel debugging."
  },
  {
    question: "How do you implement inheritance in ES6 classes?",
    answer:
      "Use the extends keyword and call super() in the child constructor. Example: class Animal {...}; class Dog extends Animal { constructor(){ super(); } } — Dog inherits methods and properties from Animal via the prototype chain."
  },
  {
    question: "What is the difference between Object.freeze and const?",
    answer:
      "const prevents reassigning the variable binding, but the object it references can still be mutated. Object.freeze makes an object’s properties immutable (cannot be added/removed/changed), though nested objects are still mutable unless frozen recursively."
  },
  {
    question: "Explain the difference between map, filter and reduce.",
    answer:
      "map transforms each element and returns a new array of the same length. filter keeps only elements that pass a condition. reduce combines all elements into a single value (number, object, array, etc.) using an accumulator function."
  },
  {
    question: "What is the rest operator and spread syntax?",
    answer:
      "... in function parameters is the rest operator and collects remaining arguments into an array. ... in expressions is spread and expands an iterable or object into individual elements/properties, e.g. [...arr], { ...obj }."
  },
  {
    question: "What are arrow functions and how do they handle 'this'?",
    answer:
      "Arrow functions are shorter function syntax that do not have their own this, arguments, super or new.target. this inside an arrow function is lexically bound to the surrounding scope, which avoids the need for .bind(this) in many cases."
  },
  {
    question: "What is event delegation?",
    answer:
      "Event delegation is attaching a single listener to a parent element instead of multiple children. The listener uses event.target and event bubbling to handle events from child elements, improving performance and simplifying dynamic UIs."
  },
  {
    question: "Explain debouncing and throttling.",
    answer:
      "Debouncing delays a function until a pause in events (e.g. wait 300ms after the last keypress before firing). Throttling ensures a function is called at most once in a given interval (e.g. at most once every 100ms during scroll). Both are used to control high-frequency events."
  },
  {
    question: "How does JSON.stringify handle circular references?",
    answer:
      "By default JSON.stringify throws a TypeError when it encounters a circular reference. To handle them you must provide a custom replacer or use libraries that support circular structures."
  },
  {
    question: "What is the difference between null and undefined?",
    answer:
      "undefined means a variable has been declared but not assigned a value or a property does not exist. null is an explicit assignment representing 'no value'. typeof null is 'object' due to a historic bug."
  },
  {
    question: "How does garbage collection work in JavaScript?",
    answer:
      "JavaScript uses automatic garbage collection, primarily via mark-and-sweep. Objects that are no longer reachable from roots (like global scope and call stack) are marked and later freed, reclaiming memory."
  },
  {
    question: "What is a Symbol and when would you use it?",
    answer:
      "Symbol is a primitive type that creates unique identifiers. They’re often used for object property keys to avoid name collisions or to define hidden or meta-properties."
  },
  {
    question: "Explain generators and yield.",
    answer:
      "Generators are functions declared with function* that can pause and resume. Calling a generator returns an iterator. Inside, yield produces values one at a time and pauses execution until next() is called again."
  },
  {
    question: "What is the difference between shallow and deep copy?",
    answer:
      "A shallow copy copies only the top-level properties; nested objects are still shared references. A deep copy recursively clones all nested objects so that changes do not affect the original."
  },
  {
    question: "How does Object.assign work?",
    answer:
      "Object.assign(target, ...sources) copies enumerable own properties from source objects onto the target object and returns the target. It performs a shallow copy, not a deep copy."
  },
  {
    question: "Explain the module pattern in JavaScript.",
    answer:
      "The module pattern uses an IIFE or ES modules to create private scope and expose only a public API. It hides implementation details and keeps variables out of the global namespace."
  },
  {
    question: "What are IIFEs and why are they used?",
    answer:
      "An IIFE (Immediately Invoked Function Expression) is a function that executes immediately after it is defined. It was historically used to create a private scope and avoid polluting the global scope before modules existed."
  },
  {
    question: "What is the Temporal Dead Zone (TDZ)?",
    answer:
      "The TDZ is the region between entering a block and the actual declaration of a let or const variable. Accessing the variable in this zone throws a ReferenceError, even though it is hoisted."
  },
  {
    question: "Explain how the spread operator works with arrays and objects.",
    answer:
      "For arrays, spread expands elements: const arr2 = [...arr, 4]. For objects, spread copies own enumerable properties: const obj2 = { ...obj, extra: 1 }. In both cases it’s a shallow copy."
  },
  {
    question: "What is a Promise.all and Promise.race?",
    answer:
      "Promise.all waits for all given promises to fulfill or rejects if any fail, returning an array of results. Promise.race resolves or rejects as soon as the first promise settles, with that single result."
  },
  {
    question: "How do you handle errors with async/await?",
    answer:
      "Wrap await calls in try/catch blocks or use Promise.allSettled. Example: try { const data = await fetch(); } catch (err) { handleError(err); }"
  },
  {
    question: "What is memoization?",
    answer:
      "Memoization is an optimization technique where you cache the results of expensive function calls so that future calls with the same inputs can return the cached value instead of recomputing."
  },
  {
    question: "Explain Currying in JavaScript.",
    answer:
      "Currying transforms a function with multiple arguments into a sequence of functions each taking a single argument. Example: f(a,b,c) -> f(a)(b)(c). It improves reusability and partial application."
  },
  {
    question: "What is the purpose of the 'new' keyword?",
    answer:
      "new creates a new object, sets its prototype to the constructor’s prototype, binds this inside the constructor to the new object, and returns the new object (unless the constructor returns a different object)."
  },
  {
    question: "Explain how private fields work in JS classes (#field).",
    answer:
      "Private class fields are declared with a # prefix and are only accessible inside the class body. They cannot be accessed or modified outside, even via this['#field']; this enforces true privacy at language level."
  },
  {
    question: "What is the difference between prototype and __proto__?",
    answer:
      "prototype is a property on constructor functions that defines the prototype for instances created with new. __proto__ is an accessor property on objects that points to their internal [[Prototype]]. Modern code should use Object.getPrototypeOf / Object.setPrototypeOf instead of __proto__."
  },
  {
    question: "What is the difference between instance method and static method?",
    answer:
      "Instance methods are defined on the prototype and called on instances. Static methods are defined on the class/constructor itself and called on the class, not on instances; they’re often utility functions."
  },
  {
    question: "Explain the difference between for...in and for...of loops.",
    answer:
      "for...in iterates over enumerable property keys of an object (including inherited ones). for...of iterates over values of any iterable (arrays, strings, maps, etc.). For arrays, for...of is usually preferred."
  },
  {
    question: "What is the browser's rendering pipeline?",
    answer:
      "The basic steps are: JavaScript execution → style calculation → layout (reflow) → paint → compositing. DOM and CSSOM are built, combined into the render tree, then laid out and painted to the screen."
  },
  {
    question: "How do CSSOM and DOM interact with JS reflows?",
    answer:
      "Changes to DOM or CSSOM can cause layout (reflow) and repaint operations, which are costly. Frequent DOM writes interleaved with reads (like offsetHeight) can force synchronous reflows; batching changes or using requestAnimationFrame reduces this."
  },
  {
    question: "Explain Cross-Origin Resource Sharing (CORS).",
    answer:
      "CORS is a browser security mechanism that controls cross-origin HTTP requests. Servers send Access-Control-Allow-* headers to tell the browser which origins, methods and headers are allowed. Without proper CORS headers, browsers block JS from reading cross-origin responses."
  },
  {
    question: "What are service workers and how do they work?",
    answer:
      "Service workers are background scripts that sit between your web app and the network. They can intercept requests, cache assets, provide offline support, handle push notifications and run only over HTTPS. They follow a lifecycle: install, activate, fetch."
  },
  {
    question: "Explain how the fetch API works.",
    answer:
      "fetch returns a Promise that resolves to a Response object. You call fetch(url, options), then await res.json(), res.text(), etc. Errors only reject on network failure; HTTP errors must be handled manually by checking res.ok or res.status."
  },
  {
    question: "What are web sockets and when to use them?",
    answer:
      "WebSockets provide a full-duplex, persistent connection between client and server. They’re used for real-time features like chat, live dashboards, games and notifications where both sides need to push data at any time."
  },
  {
    question: "Explain localStorage and sessionStorage differences.",
    answer:
      "Both store key/value string data in the browser. localStorage persists until cleared and is shared across tabs for the same origin. sessionStorage is per-tab and is cleared when the tab closes."
  },
  {
    question: "How do you optimize web performance in JS?",
    answer:
      "Common techniques: minimize DOM operations, debounce/throttle events, lazy-load resources, code splitting, use web workers for heavy tasks, memoize results, avoid unnecessary re-renders in frameworks like React, and ship less JS overall."
  },
  {
    question: "What is tree-shaking and why is it important?",
    answer:
      "Tree-shaking is the process of removing unused code during bundling by analyzing imports/exports. It reduces bundle size so users download and parse less JavaScript."
  },
  {
    question: "Explain event bubbling and capturing.",
    answer:
      "In capturing, events travel from the window down to the target element. In bubbling, they travel from the target back up to the window. addEventListener has a third parameter to choose phase; by default listeners fire in the bubbling phase."
  },
  {
    question: "What are custom events and how do you dispatch them?",
    answer:
      "Custom events let you create your own event types. You use new CustomEvent('name', { detail }) and dispatch them with element.dispatchEvent(event). Listeners can read event.detail."
  },
  {
    question: "What is the difference between map and WeakMap?",
    answer:
      "Map allows keys of any type and keeps strong references to them. WeakMap only accepts objects as keys and holds weak references; if there are no other references, keys can be garbage-collected, making WeakMap useful for caches."
  },
  {
    question: "Explain WeakSet and Set differences.",
    answer:
      "Set stores unique values of any type and is iterable. WeakSet only stores objects, is not iterable, and holds weak references so objects can be garbage-collected when no longer referenced elsewhere."
  },
  {
    question: "How do you create a debounce function? (describe or code)",
    answer:
      "A debounce function returns a wrapper that clears an existing timer and sets a new one every time it’s called. The wrapped function only executes after no calls have happened for the specified delay."
  },
  {
    question: "What are Typed Arrays?",
    answer:
      "Typed Arrays are array-like views over raw binary data buffers (ArrayBuffer, Uint8Array, Float32Array, etc.). They’re used for performance-critical tasks like graphics, audio processing and WebAssembly interop."
  },
  {
    question: "Explain the purpose of requestAnimationFrame.",
    answer:
      "requestAnimationFrame schedules a callback to run before the next browser repaint. It syncs animations with the refresh rate and is more efficient and smoother than using setTimeout or setInterval for animations."
  },
  {
    question: "How do you detect a memory leak in JS?",
    answer:
      "Use browser devtools: record heap snapshots, watch memory graphs, and look for objects that keep growing and are still referenced. Common leaks come from forgotten timers, global variables, or DOM references that never get removed."
  },
  {
    question: "Explain the concept of microtasks vs macrotasks.",
    answer:
      "Macrotasks are scheduled tasks like setTimeout, setInterval, I/O. Microtasks are smaller jobs like Promise callbacks and MutationObserver. After each macrotask, the event loop clears the microtask queue before rendering."
  },
  {
    question: "What is tail call optimization?",
    answer:
      "Tail call optimization is a compiler/runtime optimization where a function call in tail position reuses the current stack frame instead of creating a new one, preventing stack overflows in deep recursion. ES2015 specifies it but not all JS engines implement it."
  },
  {
    question: "Explain the difference between host objects and native objects.",
    answer:
      "Native objects are built-in ECMAScript objects like Array, Date, Math. Host objects are provided by the environment, such as window, document, DOM nodes and Node.js APIs."
  },
  {
    question: "How do you create an iterator in JavaScript?",
    answer:
      "An object is iterable if it has a [Symbol.iterator]() method that returns an iterator. An iterator is an object with a next() method that returns { value, done }. Generators make creating iterators easier."
  },
  {
    question: "What is the purpose of Reflect API?",
    answer:
      "Reflect provides methods for interceptable JavaScript operations, mirroring many Object and Proxy traps (e.g. Reflect.get, Reflect.set, Reflect.construct). It offers a central, functional way to perform meta-operations on objects."
  },
  {
    question: "Explain Proxy and a use-case.",
    answer:
      "Proxy wraps a target object and allows you to intercept operations like get, set, has, deleteProperty via handler traps. Common use-cases: validation, logging, access control and reactive frameworks observing changes."
  },
  {
    question: "What is the module resolution in Node.js?",
    answer:
      "Node resolves modules by checking built-in modules, exact file paths, then node_modules folders up the directory tree. It uses different algorithms for CommonJS (require) and ES modules (import) and looks at package.json fields like main and exports."
  },
  {
    question: "Explain event loop in Node.js vs browser.",
    answer:
      "Both are based on the same concept but Node’s event loop is implemented in libuv and has different phases (timers, I/O callbacks, idle, poll, check, close). Browsers integrate the event loop with rendering, DOM events and Web APIs."
  },
  {
    question: "What are streams in Node.js?",
    answer:
      "Streams are objects that handle data in chunks instead of loading everything into memory. Types include readable, writable, duplex and transform. They’re used for files, network sockets, HTTP bodies, etc."
  },
  {
    question: "Describe how to handle file uploads in Node.js.",
    answer:
      "Typically you use middleware like multer, busboy or formidable to parse multipart/form-data. They stream file chunks to disk or cloud storage while exposing metadata and fields to your Express route handler."
  },
  {
    question: "What does the 'use strict' directive do?",
    answer:
      "'use strict' enables strict mode which makes JS more predictable: it disallows some silent errors, forbids using undeclared variables, makes this undefined in functions instead of the global object, and changes some semantics."
  },
  {
    question: "Explain the difference between synchronous and asynchronous file I/O in Node.",
    answer:
      "Synchronous file I/O (fs.readFileSync, etc.) blocks the event loop until the operation completes. Asynchronous I/O (fs.readFile, fs.promises.readFile) offloads work and invokes callbacks/promises when done, allowing Node to handle other requests meanwhile."
  },
  {
    question: "How do you implement authentication in a Node.js app?",
    answer:
      "Common approaches: sessions + cookies, JWT tokens, OAuth providers. In Express you might use passport.js, bcrypt for password hashing, store users in a DB and protect routes with middleware that checks authentication/authorization."
  },
  {
    question: "What is CORS and how to configure it in Node/Express?",
    answer:
      "CORS controls which origins can access your API. In Express you can manually set Access-Control-Allow-Origin, -Methods, -Headers headers or use the cors middleware and configure allowed origins, credentials, methods, etc."
  },
  {
    question: "Explain how to prevent XSS in web apps.",
    answer:
      "Escape user input before inserting into HTML, use proper Content Security Policy (CSP), avoid dangerouslySetInnerHTML in React, validate and sanitize input on the server, and use libraries/templates that auto-escape output."
  },
  {
    question: "What is Cross-Site Request Forgery (CSRF)?",
    answer:
      "CSRF is an attack where a victim’s browser is tricked into making unwanted requests to a site where they’re authenticated. Defenses include anti-CSRF tokens, SameSite cookies, double submit cookies and requiring re-auth for sensitive actions."
  },
  {
    question: "What are security best practices for JS applications?",
    answer:
      "Examples: sanitize and validate input, protect against XSS/CSRF, use HTTPS everywhere, store secrets securely, keep dependencies updated, use security headers, least-privilege access, and avoid eval / dynamic code execution."
  },
  {
    question: "What is the difference between HTTP/1.1 and HTTP/2 from JS perspective?",
    answer:
      "HTTP/2 supports multiplexing multiple streams over one TCP connection, header compression and server push. From JS side it means fewer domain sharding hacks, better performance for many small requests and quicker page loads."
  },
  {
    question: "Explain WebAssembly and use-cases in web apps.",
    answer:
      "WebAssembly is a low-level binary instruction format that runs in the browser at near-native speed. It’s used for CPU-heavy tasks like games, image/video editing, CAD, scientific computation and running compiled languages like C++ or Rust in the browser."
  },
  {
    question: "Describe how to test JS code (unit/integration/e2e).",
    answer:
      "Unit tests cover small pieces in isolation (e.g. Jest, Mocha). Integration tests check how modules work together, often with real DB or services. E2E tests simulate real user flows in a browser using tools like Cypress or Playwright."
  },
  {
    question: "What is the purpose of a bundler (webpack/rollup/vite)?",
    answer:
      "Bundlers take your modules and assets and produce optimized bundles for the browser: they resolve imports, transpile code, tree-shake unused exports, split code, handle CSS/images and often provide dev servers with HMR."
  },
  {
    question: "Explain code splitting.",
    answer:
      "Code splitting is splitting your JavaScript into multiple bundles so the browser only loads what's needed initially and lazy-loads the rest. In React it’s often done with dynamic import() and React.lazy/Suspense."
  },
  {
    question: "What are source maps?",
    answer:
      "Source maps map minified/transpiled code back to the original source files. Devtools use them so you can debug and see original TypeScript/JSX code even though the browser runs bundled/minified JS."
  },
  {
    question: "How does tree shaking work in bundlers?",
    answer:
      "Tree shaking analyzes ES module import/export usage and removes code that is never imported or referenced. Pure functions and side-effect-free modules are easier to shake out."
  },
  {
    question: "What is Hot Module Replacement (HMR)?",
    answer:
      "HMR lets you update modules in a running application without a full page reload. It swaps changed modules and preserves state where possible, giving a faster dev feedback loop."
  },
  {
    question: "What are the common patterns for state management in React?",
    answer:
      "Local component state, lifting state up, Context API, reducers with useReducer, external libraries like Redux, Zustand, MobX, Recoil, and server-state tools like React Query."
  },
  {
    question: "Explain virtual DOM and reconciliation.",
    answer:
      "React keeps a virtual representation of the UI in memory. When state changes, it computes a new virtual tree, diffs it with the previous one (reconciliation) and applies the minimal set of DOM operations, improving performance and predictability."
  },
  {
    question: "What are hooks in React and why are they useful?",
    answer:
      "Hooks (useState, useEffect, etc.) let you use state and other React features in function components. They avoid class boilerplate, encourage reuse via custom hooks, and make logic easier to share and test."
  },
  {
    question: "Explain useMemo and useCallback and when to use them.",
    answer:
      "useMemo memoizes a computed value so it only recalculates when dependencies change. useCallback memoizes a function reference. They’re used to avoid unnecessary work or re-renders, especially when passing props to child components that are memoized."
  },
  {
    question: "What is context in React and when to use it?",
    answer:
      "Context lets you share values like theme, user or locale deeply in the tree without prop drilling. It’s best for data that is truly global to a subtree, not as a general replacement for all state management."
  },
  {
    question: "Explain how to optimize performance in React apps.",
    answer:
      "Use React.memo, useMemo, useCallback, avoid unnecessary state in high-level components, split code, lazy-load heavy routes, keep components small, and use the Profiler to find bottlenecks. Also avoid expensive computations in render paths."
  },
  {
    question: "Describe SSR vs CSR vs SSG.",
    answer:
      "CSR (client-side rendering) renders everything in the browser. SSR (server-side rendering) renders HTML on the server per request. SSG (static site generation) pre-renders HTML at build time. Each has trade-offs for performance, SEO and complexity."
  },
  {
    question: "What is hydration?",
    answer:
      "Hydration is the process where a client-side framework attaches event listeners and state to server-rendered HTML so it becomes a fully interactive app without re-rendering everything from scratch."
  },
  {
    question: "How do you handle forms in React?",
    answer:
      "Typically with controlled components where input value is tied to state and onChange updates it. For complex forms you might use libraries like Formik or React Hook Form, handle validation, and manage submission side-effects."
  },
  {
    question: "What is reconciliation algorithm (React fiber)?",
    answer:
      "Fiber is React’s reimplementation of the reconciliation algorithm. It breaks work into units and makes rendering interruptible so React can pause, prioritize and resume work, enabling features like concurrent rendering."
  },
  {
    question: "Explain portals in React.",
    answer:
      "Portals let you render children into a different part of the DOM tree while keeping them in the same React component tree. e.g. ReactDOM.createPortal(child, domNode) is useful for modals, tooltips, and overlays."
  },
  {
    question: "What are the Context API's pitfalls?",
    answer:
      "Large or frequently changing values can cause many re-renders in consumers. Overusing context for everything can lead to tangled global state. Splitting contexts and memoizing values helps reduce these issues."
  },
  {
    question: "How to use refs safely in React?",
    answer:
      "Use refs for imperative DOM access or to store mutable values that don’t trigger re-renders. Avoid reading/writing DOM directly when declarative patterns are possible, and don’t abuse refs as a general state store."
  },
  {
    question: "Explain controlled vs uncontrolled components.",
    answer:
      "Controlled components have their value driven by React state; the source of truth is state. Uncontrolled components store their own internal state in the DOM (accessed via refs). Controlled gives more control, validation and predictability."
  },
  {
    question: "What is PropTypes and why might you use it?",
    answer:
      "PropTypes is a runtime type-checking library for React props. It helps catch bugs by validating that components receive props of the correct type and shape in development."
  },
  {
    question: "Explain error boundaries in React.",
    answer:
      "Error boundaries are components that catch JavaScript errors in their child tree during render, lifecycle methods and constructors. They render a fallback UI instead of crashing the entire app and can log the error."
  },
  {
    question: "What are Higher-Order Components (HOCs)?",
    answer:
      "An HOC is a function that takes a component and returns a new component with additional props or behavior. It’s a pattern for reusing component logic, though hooks are now preferred in many cases."
  },
  {
    question: "Describe Render Props.",
    answer:
      "Render props is a pattern where a component takes a function as a prop and calls it to render UI, passing shared data or behavior. It lets you reuse logic while giving consumers control over rendering."
  },
  {
    question: "What is the purpose of React.StrictMode?",
    answer:
      "StrictMode activates additional checks and warnings in development: it highlights unsafe lifecycles, double-invokes certain functions to find side effects, and warns about deprecated APIs. It has no effect in production."
  }
];

export default QUESTIONS;
