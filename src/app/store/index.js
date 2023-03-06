import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../entities/redux/user";
import { messagesApi } from "../../entities/services/messagesService";
import { userApi } from "../../entities/services/userServices";
import { themeReducer } from "../../shared/theme/redux/themeSlice";
import storage from "redux-persist/es/storage";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// import { someReducer } from "./roadtoreducer";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "userApi"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  //preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);
