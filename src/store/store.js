import { legacy_createStore as createStore, combineReducers } from 'redux'

import { gigReducer } from './reducers/gig.reducer'
import { userReducer } from './reducers/user.reducer'
import { reviewReducer } from './reducers/review.reducer'
import { systemReducer } from './reducers/system.reducer'
import { orderReducer } from './reducers/order.reducer'
import { cardReducer } from './reducers/card.reducer'

const rootReducer = combineReducers({
    // gigModule: gigReducer,
    // userModule: userReducer,
    systemModule: systemReducer,
    cardModule: cardReducer,
    // orderModule: orderReducer,
    // reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })