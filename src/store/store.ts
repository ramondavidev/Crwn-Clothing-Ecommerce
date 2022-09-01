import logger from "redux-logger";
import { Middleware } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //only persist the cart status (user and categories not persisted)
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        process.env.NODE_ENV === 'development' && logger, 
        sagaMiddleware
    ].filter((middleware): middleware is Middleware => Boolean(middleware)),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


// const middleWares = [
//     process.env.NODE_ENV !== 'production' && logger,
   
//     (process.env.NODE_ENV !== 'production' &&
//       window &&
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//       sagaMiddleware) ||
//       false,
//   ].filter(Boolean);