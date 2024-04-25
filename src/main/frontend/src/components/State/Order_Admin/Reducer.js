import { GET_RESTAURANT_ORDER_BY_STATUS_FAILURE, GET_RESTAURANT_ORDER_BY_STATUS_REQUEST, GET_RESTAURANT_ORDER_BY_STATUS_SUCCESS, GET_RESTAURANT_ORDER_FAILURE, GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType"

const initialState = {
    loading: false,
    error: null,
    orders: []
}

const adminOrdersReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_RESTAURANT_ORDER_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
        case GET_RESTAURANT_ORDER_BY_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_RESTAURANT_ORDER_SUCCESS:
        case GET_RESTAURANT_ORDER_BY_STATUS_SUCCESS:
            return {
                ...state, 
                loading: false,
                orders: payload
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            const updatedOrders = state.orders.map(order =>
                order.id === payload.id ? payload : order
            );
            return {
                ...state,
                loading: false,
                orders: updatedOrders
            };
        case GET_RESTAURANT_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
        case GET_RESTAURANT_ORDER_BY_STATUS_FAILURE:
            return {
                ...state, 
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}

export default adminOrdersReducer;
