export const identityReducer = state => state;

export const setReducer = (_, { payload }) => payload;

export const toggleReducer = state => !state;

export const incrementReducer = (state, { payload } = { payload: 1 }) =>
  state + payload;

export const decrementReducer = (state, { payload } = { payload: 1 }) =>
  state - payload;

export const getResetReducer = initialState => () => initialState;

// Should work with List and array
export const addItemReducer = (state, { payload, meta }) =>
  meta === undefined
    ? state.slice(0).concat(payload)
    : state
        .slice(0, meta)
        .concat([payload])
        .concat(state.slice(meta));
