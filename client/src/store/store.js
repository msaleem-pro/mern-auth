import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/user-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReucer = combineReducers({
  user: userSlice,
});
const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 1,
  },
  rootReucer
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
