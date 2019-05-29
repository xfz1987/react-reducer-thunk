# react-reducer-thunk
> - Base on react(16.8.*) with react-hooks

## Why use this?
At present.useReducer can not process asynchronous request.We can only do synchronous things.
So we can use useContext and some skills to process the question. Below

## Installation
`npm install --save react-reducer-thunk`

## Usage
**Example with defaults**
Creating an example reducer
```bash
import { getProvider, Context } from 'react-reducer-thunk'

const initialState = {
  isOnline: false,
  timeDuration: '00:00:00',
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'getLoginStatus':
      return { ...state, isOnline: payload === 1 }
    case 'changeTime':
      return { ...state, timeDuration: payload.time }
    default:
      return state
  }
}

const Provider = getProvider(reducer, initialState)

export { 
  Context,
  Provider
}
```

Creating an example component
```bash
// business component
import React, { useState, useEffect, useContext } from 'react'
import { Provider, Context } from './reducer.js'

const getStatus = async () => {
  const data = await asyncFunc()
  return data
}

function asyncFunc() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}


const User = props => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    dispatch({
      type: 'getLoginStatus',
      payload: getStatus()
    })
  }, [])

  const changeTime = () => {
    dispatch({
      type: 'changeTime',
      payload: { time: '11:11:11' }
    })
  }

  return (
    <div className="im-bar cursor-pointer inline-block">
      <div>{state.isOnline ? '已登录': '未登录'}</div>
      <span className="time" onClick={changeTime}>{state.timeDuration}</span>
    </div>
  )
}ß

export default props => {
  return (
    <Provider>
      <User {...props} />
    </Provider>
  )
}
```

## Instructions
> - params: your own reducer and initialState
> - export Context and Provider
> - use Provider to wrapped your component
> - `useContext(Context)` for get state and dispatch
> - dispatch({ type, payload }) - payload: async func or data

## License
ISC
