/**
 * useReducer for asynchronous processing
 * created by xfz
 */

import React, { createContext, useReducer } from 'react'

const isPromise = obj => !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function"

const wrapperDispatch = dispatch => {
  return function({ type, payload }) {
    if (payload && isPromise(payload)) {
      payload.then(v => {
        dispatch({ type: type, payload: v });
      });
    } else {
      dispatch({ type, payload })
    }
  }
}

export const Context = createContext()

export const getProvider = (reducer, initialState) => {
  return function (props) {
    const { 0: state, 1: dispatch } = useReducer(reducer, initialState)
    return (
      <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
        {props.children}
      </Context.Provider>
    )
  }
}
