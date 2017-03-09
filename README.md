# Redux boilerplate-reducer
**🚧🚧🚧 Alpha 🚧🚧🚧**

Quickly create bundles of action types, action creators, and reducers with a few lines of code.

## Motivation

> I created boilerplate-reducer to reduce reducer boilerplate

When using [redux](http://redux.js.org/), I found that I was writing a lot of code to create essentially the same types of objects. Even with great tools like [redux-actions](https://github.com/acdlite/redux-actions) and [reduce-reducers](https://github.com/acdlite/reduce-reducers), and the guidelines for [reducing boilerplate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html) and [combining reducer logic](http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html), I found that I was still writing a lot of similar code with minor differences. So I created `boilerplate-reducer` to reduce reducer boilerplate.

_Note: This is a helper and should not be a replacement for understanding the core concepts of Redux (e.g. that reducers can respond to any action types, even those that might be associated with other parts of the state tree). If you're new to Redux, come back after you've written some boilerplate code and gotten fed up!_

### Goals
- Make it easier to write commonly used redux code with a few lines and a little faith
- Never force the user into following the assumptions made by the library
- Allow the user to extend and customize what is created and make functions granular enough to work in other contexts
- Functions have no side effects (that's the whole reason we like Redux, right?)
- Be compatible with things like thunks, sagas, flowtype, immutable.js, etc. (eventually)

## Implementation

`boilerplate-reducer` makes it easy to mash a lot of functions together into a bundle, but behind the scenes it makes use of several tried-and-tested tools for working with Redux. Action creators are generated with [createAction()](https://github.com/acdlite/redux-actions). Reducers are created with [handleAction()](https://github.com/acdlite/redux-actions#handleactiontype-reducer--reducermap--identity-defaultstate) and [reduceReducers()](https://github.com/acdlite/reduce-reducers). I recommend knowing a bit about what each one does. <strike>If</strike> When you need to extend the functionality of your app or run into issues, these tools will let you tweak things under the hood.

`boilerplate-reducer` is an opinionated library. It makes assumptions about how you want your results formatted and what types of actions and reducers are considered generic.

Results are returned as an object bundle that follows the [Ducks modular format](https://github.com/erikras/ducks-modular-redux) which means related action types, action creators, selectors, and reducers are defined in the same file. In my experience, ducks is a great system. However, if it's not your thing, you can still use some of the lower-level tools in this library (although you might not avoid as much boilerplate code).

### Verbs and Nouns

Actions are created by combining a "noun" and a "verb". In the case of `"ADD_TODO"`, the verb would be `"add"` and the noun would be `"todo"`. Some string manipulation is applied so `"Add 10 to", "totalScore"` would become the action type `"ADD_10_TO_TOTAL_SCORE"` and the action creator would be called `add10ToTotalScore()`.

## Usage

### Create a simple numeric action/reducer bundle

With `boilerplate-reducer`, this one-line module...

```
import {generateNumber} from 'boilerplate-reducer'

export default generateNumber('score', 0)
```

... is roughly equivalent to this...

```
const SET_SCORE = 'SET_SCORE'
const setScore = (newScore) => ({
  type: SET_SCORE,
  payload: newScore
})

const RESET_SCORE = 'RESET_SCORE'
const resetScore = () => ({
  type: RESET_SCORE
})

const INCREMENT_SCORE = 'INCREMENT_SCORE'
const incrementScore = (additionalScore = 1) => ({
  type: INCREMENT_SCORE,
  payload: additionalScore
})

const DECREMENT_SCORE = 'DECREMENT_SCORE'
const decrementScore = (additionalScore = 1) => ({
  type: DECREMENT_SCORE,
  payload: additionalScore
})

// Selector
const selectScore = state => state.score

// Initial State
const initialState = 0

// Reducer
const reducer = (previousScore = initialState, action) => {
  switch (action.type) {
    case RESET_SCORE:
      return initialState
    case SET_SCORE:
      return action.payload
    case INCREMENT_SCORE:
      return previousScore + action.payload
    case DECREMENT_SCORE:
      return previousScore - action.payload
    default:
      return previousScore
  }
}

export default {
  name: 'score',
  SET_SCORE,
  setScore,
  RESET_SCORE,
  resetScore,
  INCREMENT_SCORE,
  incrementScore,
  DECREMENT_SCORE,
  decrementScore,
  selectScore,
  reducer
}
```

#### Extend the score bundle with an additional action

Add an action to double the score.

```
import {generateNumber} from 'boilerplate-reducer'

export default generateNumber('score', 0, {
  'double': score => score * 2
})
```

Providing the object with a verb associated with a function creates an additional action-type, action-creator, and reducer inside score similar to...

```
{
  DOUBLE_SCORE: "DOUBLE_SCORE",
  doubleScore: () => {type: DOUBLE_SCORE},
  reducer: (score, action) => {
    if (action.type === "DOUBLE_SCORE") { return score * 2 }
  }
}
```

#### Respond to an existing action type

Add an action to bump the score by 1,000 when a level is completed.

```
// Manually add the new reducer to the reducers object
score.reducers[level.COMPLETE_LEVEL] = score => score + 1000

// Reducers are automatically merged
score.reduce(9000, {type: level.COMPLETE_LEVEL}) // 10000
```

#### Add a customized selector

By default, the generated selector returns the value with the same name in the state object. However, it's very possible that your state object will be nested or have a different name than your bundle name. To provide a custom selector, just replace the old one.

```
// Manually replace selector.
score.selectScore = (state) => state.player.currentScore
```

For more, check out the [unit tests](./test).

### Types and their preset verbs

- `generateNumber()`
  - set - Sets the value to the payload value
  - reset - Sets the value to the initial state value
  - increment - Adds payload value to the number or adds 1 if there is no payload
  - decrement - Subtracts payload value from the number or subtracts 1 if there is no payload

- `generateBoolean()`
  - set
  - reset
  - toggle - Sets true to false and vice versa

- `generateString()`
  - set
  - reset
- More to come... Please send your suggestions

(note: `generateBundle()` has no preset verbs.)

## Further reading

- [Ducks modular format](https://github.com/erikras/ducks-modular-redux)
- [Redux best practices](https://github.com/kylpo/react-playbook/blob/master/best-practices/redux.md) (Uh... according to _whom!?_)
- [reducing boilerplate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html)
- [combining reducer logic](http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html)
