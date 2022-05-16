import axios from "axios";

export const LoginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        });
        const { data } = await axios.post(
            "api/v1/login",
            { email, password },
            {
                headers:
                {
                    "Content-Type": "application/json",
                },
            });
        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });
    }
    catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error,
        });
    }
}

export const LoadUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        });
        const { data } = await axios.get("api/v1/me")
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    }
    catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error,
        });
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch({ type: "postRequest" });
        const { data } = await axios.get("/api/v1/posts");
        dispatch({ type: "postSuccess", payload: data.posts, })
    }
    catch (error) {
        dispatch({ type: "postFailure", payload: error })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "allUsersRequest" });
        const { data } = await axios.get("/api/v1/users");
        dispatch({ type: "allUsersSuccess", payload: data.users, })
    }
    catch (error) {
        dispatch({ type: "allUsersFailure", payload: error })
    }
}