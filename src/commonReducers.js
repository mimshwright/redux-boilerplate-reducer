export const setReducer = (_, {payload}) => payload

export const toggleReducer = state => !state

export const incrementReducer = (state, {payload} = {payload: 1}) => state + payload

export const decrementReducer = (state, {payload} = {payload: 1}) => state - payload
