import { compose, combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// - Reducers
import userReducer from "./reducers/userReducer";

const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({
  user: userReducer,
});

// - Dev Tools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);

export default store;
