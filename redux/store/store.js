
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import languageReducer from "../reducer/LanguageReducer";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import loginReducer from "../reducer/loginReducer";
import otpVerifyReducer from "../reducer/otpVerifyReducer";
import getAllProductReducer from "../reducer/getAllProductReducer";


const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['languageReducer'], // only navigation will be persisted
    // blacklist: ['navigation'] // navigation will not be persisted

};
const rootReducer = combineReducers({
    languageReducer: languageReducer,
    loginReducer: loginReducer,
    otpVerifyReducer: otpVerifyReducer,
    getAllProductReducer: getAllProductReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});
// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         })
// });

const persistor = persistStore(store);

export { store, persistor };




