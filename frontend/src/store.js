import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { userReducer, postReducer, allUsersReducer } from "./Reducers/User";
const store = configureStore({
    reducer:
    {
        user: userReducer,
        postOfFollowing: postReducer,
        allUsers: allUsersReducer,
        // like: likeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
export default store;