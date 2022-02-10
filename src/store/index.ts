import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ticketReducer from './reducers/ticketFamilyReducers'
import ticketComboReducer from './reducers/ticketComboReducers'
import ticketEventReducer from './reducers/ticketEventReducer'

const rootReducer = combineReducers({
  ticket: ticketReducer,
  ticketCombo: ticketComboReducer,
  ticketEvent: ticketEventReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
