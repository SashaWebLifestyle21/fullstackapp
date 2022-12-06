import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userSlice";
import carReducer from "./reducers/Car/carSlice";
import orderReducer from "./reducers/Order/orderSlice";
import commentReducer from "./reducers/Comment/commentSlice";
import managerReducer from "./reducers/Manager/managerSlice";
import { cardAPI } from "./service/CardService";

const rootReducer = combineReducers({
    userReducer,
    [cardAPI.reducerPath]: cardAPI.reducer,
    carReducer,
    orderReducer,
    commentReducer,
    managerReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(cardAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']