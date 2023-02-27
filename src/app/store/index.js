import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../entities/redux/user";
import { messagesApi } from "../../entities/services/messagesService";
import { userApi } from "../../entities/services/userServices";
import { themeReducer } from "../../shared/theme/redux/themeSlice";

// import { someReducer } from "./roadtoreducer";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  //preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
