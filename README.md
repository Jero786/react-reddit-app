# react-reddit-app 

Demo Live: https://limitless-reaches-38545.herokuapp.com

## Pre-requisites    
- node: 10.16.x    
- npm: 6.9.x    
- ts-node: v8.6.2
    
## Setup and start:
```
yarn && yarn start
``` 
That will start client on: `http://localhost:3000`    

 
## Run test:
```
yarn test
```  

## Environment variables 
You will need to define your own `.env` file. As a reference, you could check the existing `.env.example` on each app.

## Some design, principles and best practices followed

- In order to scale and build a more robust file structure I choose organize the code by features instead of by types. 
- Also it's follow a similar pattern called duck and re-duck conventions, for more info I wrote an article [here](https://medium.com/@jero786/duck-re-duck-183da6e5a35a).
- The way that get information from store, only by Selectors. Implementing selectors improve complex operations and also to lifting our state in a more granular way (help us to keep following SRP principle). Also we open a windows of improvements to implement reselect or other mechanism of memoization.
- Following top down best practice readability declaration (most important and public collaborates first, like a news paper).
- Implementing check typing in a dynamic interpreted language like JS, help us and also to Ides, to catch typos and errors while your are coding. That is a really important when you app will be large.
- Action Types names convention is:
  ACTION: Effect is most commonly a noun that means the result of an action.
  ASYNC ACTION CREATOR: Affect is most commonly.
  For more information, I wrote [this](https://medium.com/@jero786/action-noun-verb-effect-is-most-commonly-a-noun-that-means-the-result-of-an-action-e3e00d662444) short article about it.
- I implement the lib `reduxjs/toolkit`, because it help you to remove a lot of boiler plate code from Redux. 

## Testing tips

- Testing presentation layer (View and Controller): Following Separation of presentation pattern, the idea of testing the view and controller is to test the view as much as dump as possible. The view, as an observer of the model, like happen on MVC pattern, should be in charge of 
  sending the proper messages to the model (actions). And then the model (the store) will notified to their listeners (connected view) if exist some change on it.
- When you are testing the View, we need to take care to don't test implementation detail UI. It will help us to avoid false positives or false negatives. For more information, I wrote [this](https://medium.com/@jero786/write-test-not-too-many-mostly-integration-bad298f69e1a) article about it.
- Test should follow the SRP principle too (single responsibility principle). Do one thing, test one thing.
- Test files, should be ended with *.test.tx and should be placed in the same folder from their SUT (Subject under test).
- Keep in mind the implicit structure of test must be AAA (Arrange, Act, Assert).
- Each test must be isolated, means that one test not be dependent to another in order to get given result, therefore it should not matter the order of execution of them.
- Avoid global variables. Instead, declare them in setup method.
- Follow the DRY principle (Don’t Repeat Yourself). If we identify that we have repeated code throughout our tests use beforeEach function to put the code in one place.
- Putting comments in the header of the test is an anti-pattern, avoid them.
