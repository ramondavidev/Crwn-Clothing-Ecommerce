import logger from "redux-logger";
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //only persist the cart status (user and categories not persisted)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        process.env.NODE_ENV === 'development' && logger, 
        thunk
    ].filter(Boolean),
});

export const persistor = persistStore(store);