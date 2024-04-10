import { faU } from "@fortawesome/free-solid-svg-icons";
import { GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";
import { faL } from "@fortawesome/free-solid-svg-icons/faL";

const initialState = {
    loading: false,
    orders: [],
    error: null, 
};

export const orderReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_USERS_ORDERS_REQUEST:
            return {
                ...state, 
                error: null,
                loading: true,
            };  
        case GET_USERS_ORDERS_SUCCESS:
            return {
                ...state, 
                error: null,
                loading: false,
                orders: payload
            };  
        case GET_USERS_ORDERS_FAILURE:
            return {
                ...state, 
                error: payload,
                loading: false
            };
        default:
            return state;         
    }
};