# Redux boilerplate-reducer
**🚧🚧🚧 Pre 🚨 Alpha 🚧🚧🚧**

Quickly create bundles of action types, action creators, and reducers with a few lines of code.

## Motivation

> I created boilerplate-reducer to reduce reducer boilerplate by creating boilerplate reducers

When using [redux](http://redux.js.org/), I found that I was writing a lot of code to create essentially the same types of objects. Even with great tools like [redux-actions](https://github.com/acdlite/redux-actions) and [reduce-reducers](https://github.com/acdlite/reduce-reducers), and the guidelines for [reducing boilerplate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html) and [combining reducer logic](http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html), I found that I was still writing a lot of similar code with minor differences. So I created `boilerplate-reducer` to reduce reducer boilerplate by creating boilerplate reducers.

### Goals
- Make it easier to write commonly used redux code with a few lines and a little faith
- Never force the user into following the assumptions made by the library
- Allow the user to extend and customize what is created and make functions granular enough to work in other contexts


_Note: This is a helper and should not be a replacement for understanding the core concepts of Redux (e.g. that reducers can respond to any action types, even those that might be associated with other parts of the state tree). If you're new to Redux, come back after you've written some boilerplate code and gotten fed up!_

## Implementation

`boilderplate-reducer` makes use of several tried-and-tested tools for working with Redux. Action creators are generated with [createAction()](https://github.com/acdlite/redux-actions). Reducers are created with [handleAction()](https://github.com/acdlite/redux-actions#handleactiontype-reducer--reducermap--identity-defaultstate) and [reduceReducers()](https://github.com/acdlite/reduce-reducers).

Results are returned as an object bundle that follows the [Ducks modular format](https://github.com/erikras/ducks-modular-redux).

## Usage

<!-- ### Create a numeric value called `score` with a `DOUBLE_SCORE` action. -->
```
// Coming Soon...
```
