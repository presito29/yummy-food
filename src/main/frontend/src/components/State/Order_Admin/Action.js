import { API_URL, api } from "../../config/api"
import { GET_RESTAURANT_ORDER_FAILURE, GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";


export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
    return async (dispatch) =>{
        dispatch({type: UPDATE_ORDER_STATUS_REQUEST});
        try{
            const res = await api.put(`${API_URL}/api/admin/orders/${orderId}/${orderStatus}`,{},{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("update order status", res.data);
            dispatch({type: UPDATE_ORDER_STATUS_SUCCESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: UPDATE_ORDER_STATUS_FAILURE, payload: error});

        }
    };
};

export const fetchOrders = ({orderStatus, jwt}) => {
    return async (dispatch) =>{
        dispatch({type: GET_RESTAURANT_ORDER_REQUEST});
        try{
            const res = await api.get(`${API_URL}/api/admin/ordersByStatus`,{
                params: {orderStatus: orderStatus},
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("fetch orders", res.data);
            dispatch({type: GET_RESTAURANT_ORDER_SUCCESS , payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: GET_RESTAURANT_ORDER_FAILURE, payload: error});

        }
    };
};
