import { configureStore } from "@reduxjs/toolkit"
import { likeReducer } from "./Reducers/Post";
import { userReducer, postReducer, allUsersReducer } from "./Reducers/User";
const initialState = {}
const store = configureStore({
    initialState,
    reducer:
    {
        user: userReducer,
        postOfFollowing: postReducer,
        allUsers: allUsersReducer,
        like:likeReducer
    },
});
export default store;