import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from './Userslice.js'

import  storage from "redux-persist/lib/storage";
const persistConfig={
   key:'root',
   storage
}
const persistedReducer =persistReducer(persistConfig,userReducer)
export const store=configureStore({
    reducer:{
        user:persistedReducer,
      
    }
});
export const persistor=persistStore(store)