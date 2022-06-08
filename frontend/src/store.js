import { configureStore } from "@reduxjs/toolkit"
import { userReducer, likeReducer, postReducer, allUsersReducer } from "./Reducers/User";
const store = configureStore({
    reducer:
    {
        user: userReducer,
        postOfFollowing: postReducer,
        allUsers: allUsersReducer,
        like: likeReducer
    },
});
export default store;