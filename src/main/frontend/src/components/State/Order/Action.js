import { API_URL, api } from "../../config/api"
import { GET_ALL_CART_ITEMS_FAILURE } from "../Cart/ActionType";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";


export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({type: CREATE_ORDER_REQUEST});
        try{
            const res = await api.post(`${API_URL}/api/order`, reqData.order,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("created order", res.data);
            dispatch({type: CREATE_ORDER_SUCCESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: CREATE_ORDER_FAILURE, payload: error});

        } 
    }
};

export const getUserOrder = (jwt) => {
    return async (dispatch) => {
        dispatch({type: GET_USERS_ORDERS_REQUEST});
        try{
            const res = await api.get(`${API_URL}/api/order/user`,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("user order", res.data);
            dispatch({type: GET_USERS_ORDERS_SUCCESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: GET_USERS_ORDERS_FAILURE, payload: error});

        } 
    }
}