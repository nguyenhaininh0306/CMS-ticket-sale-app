import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ticketReducer from './reducers/ticketReducers'
import ticketComboReducer from './reducers/ticketComboReducers'

const rootReducer = combineReducers({
  ticket: ticketReducer,
  ticketCombo: ticketComboReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
