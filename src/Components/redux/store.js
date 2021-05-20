import {applyMiddleware, combineReducers, createStore} from "redux";
import ContactReducer from "./ContactReducer";
import thunk from "redux-thunk";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts'],
};
const rootReducer = combineReducers({
    contacts: ContactReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer,
    applyMiddleware(thunk));

export const persistedStore = persistStore(store);
