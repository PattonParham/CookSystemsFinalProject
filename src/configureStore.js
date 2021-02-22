import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import createRootReducer from './ducks'

export default function configureStore () {
  const composeEnhancers = composeWithDevTools({})
  return createStore(
    createRootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
}
