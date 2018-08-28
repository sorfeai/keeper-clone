import reducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'


export default createStore(
  reducer,
  applyMiddleware(createLogger())
)
