import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {  authSlice } from './auth'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import rootReducer from './reducers'; 

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    // Add more slices here if needed
});

const persistConfig = {
    key: 'root', // Key for local storage
    storage, // Use localStorage
};



const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

// export const store = configureStore({
//   reducer: {
//     auth : authSlice
//   },
// })