# University of Helsinki - Full Stack Open - 2021

### About the course
The course introduce to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with _Node.js_. This course covers: _React_, _Redux_, _Node.js_, _MongoDB_, _GraphQL_ and _TypeScript_.

### About this repository
This repository contains my own exercise solutions to the 2021 edition of the [Full Stack Open](https://fullstackopen.com/en) course from the [University of Helsinki](https://www.helsinki.fi/en).

### Part 0 - [Fundamentals of Web apps](https://fullstackopen.com/en/part0)
An overall introduction to the course. It introduces to some concepts like HTTP requests, how traditional web apps work, DOM, CSS and Single Page Applications.
- [new note](/part0) - The diagram shows how communicate the browser and the server when user added a note to a page containing JavaScript.
- [single page app](/part0) - The diagram shows the communication between the browser and the server when user opened single page app on the browser.
- [new note (single page app)](/part0) - The diagram shows how communicate the browser and the server when user added a note to a single page app.

[View solutions folder](/part0)

### Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)
This part introduces to _React_ concepts. It covers the basics: components, props, JSX and more advanced concepts: Javascript functionalities that are used a lot in _React_ (`.map()`, `.filter()`, `.reduce()`), destructuring, event handlers in _React_ and passing state to child components, spread operator, hooks and their rules and conditional rendering.
- [courseinfo](/part1/courseinfo) - Simple course information page which counts total number of exercises of the course.
- [unicafe](/part1/unicafe) - This app gathers feedbacks and makes statistic.
- [anecdotes](/part1/anecdotes) - This app provides to vote for a random anecdote, also shows the most voted anecdote.

[View solutions folder](/part1)

### Part 2 - [Communicating with server](https://fullstackopen.com/en/part2)
This part covers how to display list items in _React_ and how to handle forms. Introduces _JSON server_ and fetching data from it, _axios_ for sending `GET`, `PUT`, `POST` and `DELETE` requests and how to style your React app (CSS).
- [courseinfo](/part2/courseinfo) - Extended Course info app from part 1.
- [phonebook](/part2/phonebook) - Phonebook, add/delete contacts with numbers, edit numbers.
- [dataforcountries](/part2/dataforcountries) - A react app that fetches and displays information form the [REST Countries](https://restcountries.eu) and [Weatcher Stack](https://weatherstack.com/) API's.

### Part 3 - [Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3)
This part is focused on the backend. How to: implement a simple REST API in _Node.js_ using _Express_, connect to a database (_MongoDB_) to store and retrieve data, deploy your app.
- [phonebook](/part3/) - The app source backend code.
- [phonebook](https://phonebook6.herokuapp.com/) - The app deployed on Heroku. Frontend from part 2 and Backend from part 3 works together.

### Part 4 - [Testing Express servers, user administration](https://fullstackopen.com/en/part4)
This part is focused on testing _Node.js_ applications, async/await, user administration, references across collections, token based authentication.
- [bloglist](/part4/bloglist) - Allows users to save information (blog author, title, url, and amount of upvotes from users) about interesting blogs they have stumbled across on the internet.

### Part 5 - [Testing React apps](https://fullstackopen.com/en/part5)
This part is focused on token based authentication and testing the _React_ components using _Jest_, _React Testing Library_ and _Cypress_.
- [bloglist-frontend](/part5/bloglist-frontend) - The app frontend code.

### Part 6 - [State management with Redux](https://fullstackopen.com/en/part6)
This part is focused on Redux, which can be used for more complex state management of your _React_ app (covers concepts like immutability, global store, actions and reducers). Also this chapter covers how to use Redux with hooks, and how to use the old `connect` higher order component when you work on older code bases, and `redux thunk` for asynchronous code.
- [unicafe-redux](/part6/unicafe-redux) - The app source code.
- [redux-anecdotes](/part6/redux-anecdotes) - The app source code.