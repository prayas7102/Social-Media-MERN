import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./Reducers/User";
const initialState = {}
const store = configureStore( {
    initialState,
    reducer: 
        { 
            user: userReducer ,
            postOfFollowing: postReducer
        },
});
export default store;