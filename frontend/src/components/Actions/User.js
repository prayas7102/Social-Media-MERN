import axios from "axios";

export const LoginUser= (email,password) => async(dispatch)=>{
    try{
        dispatch({
            type:"LoginRequest"
        });
        const {data}=await axios.post(
            "api/v1/login",
            {email,password},
            {
                headers:
                {
                    "Content-Type":"application/json",
                },
            },
            );
        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });
    }
    catch(error){
        dispatch({
            type: "LoginFailure",
            payload: "error",
        });
    }
}