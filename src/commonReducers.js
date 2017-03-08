// import merge from 'lodash/merge'
// import isObject from 'lodash/isObject'

export const setReducer = (_, {payload}) => payload

export const toggleReducer = state => !state

export const getConstantReducer = constant => () => constant

export const incrementReducer = (state, {payload} = {payload: 1}) => state + payload

export const decrementReducer = (state, {payload} = {payload: 1}) => state - payload

export const nowReducer = () => new Date()
