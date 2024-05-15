import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { API_URL, api } from "../../config/api"

export const registerUser = (reqData) => async(dispatch) =>{
    dispatch({type: REGISTER_REQUEST})
    try{

        const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        alert("Моля, влезте във вашия имейл и потвърдете самоличността си! Докато не потвърдите няма да бъдете допуснати до сайта!")
        reqData.navigate("/account/login")
        dispatch({type: REGISTER_SUCCESS, payload: data.jwt })
        console.log("refister", data)
    }catch(error){
        dispatch({type: REGISTER_FAILURE, payload: error})
        console.log("error", error)
    }
}


export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/login`, reqData.userData);

         if (data.enabled) {
          alert("Влезте във вашия имейл и потвърдете самоличността си!");
            
        } else {
                 if (data.jwt) localStorage.setItem("jwt", data.jwt);
            if (data.role === "USER") {
                reqData.navigate("/");
            } else {
                reqData.navigate("/admin/");
            }
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("login", data);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.log("error", error);
    }
};


export const getUser = (jwt) => async(dispatch) =>{
    dispatch({type: GET_USER_REQUEST})
    try{

        const {data} = await api.get(`${API_URL}/api/users/profile`, {
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        })

       
        dispatch({type: GET_USER_SUCCESS, payload: data})
        console.log("user profile", data)

    }catch(error){
        dispatch({type: GET_USER_FAILURE, payload: error})
        console.log("error", error)
    }
}

export const logout = () => async(dispatch) =>{
   
    try{
        localStorage.clear();
        dispatch({type: LOGOUT})
        console.log("logout")

    }catch(error){
        console.log("error", error)
    }
}