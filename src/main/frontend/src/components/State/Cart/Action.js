import { API_URL, api } from "../../config/api"
import { DELETE_MENU_ITEM_REQUEST } from "../Menu/ActionType";
import { ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCEESS, ADD_ITEM_TO_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCEESS, FIND_CART_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCEESS, GET_ALL_CART_ITEMS_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCEESS, UPDATE_CARTITEM_FAILURE, REMOVE_CARTITEM_SUCEESS, REMOVE_CARTITEM_FAILURE, CLEARE_CART_REQUEST, CLEARE_CART_SUCEESS, CLEARE_CART_FAILURE } from "./ActionType"


export const findCart = (token) =>{
    return async (dispatch) =>{
        dispatch({type: FIND_CART_REQUEST});
        try{
            const res = await api.get(`${API_URL}/api/cart`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("find cart", res.data);
            dispatch({type: FIND_CART_SUCEESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: FIND_CART_FAILURE, payload: error});

        }
    };
};

export const getAllCartItems = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type: GET_ALL_CART_ITEMS_REQUEST});
        try{
            const res = await api.get(`${API_URL}/api/carts/${reqData.cartId}/items`,{
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            console.log("get items cart", res.data);
            dispatch({type: GET_ALL_CART_ITEMS_SUCEESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: GET_ALL_CART_ITEMS_FAILURE, payload: error});

        }
    };
};

export const add = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type: ADD_ITEM_TO_CART_REQUEST});
        try{
            const res = await api.put(`${API_URL}/api/cart/add`, reqData.cartItem,{
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("add item to cart", res.data);
            dispatch({type: ADD_ITEM_TO_CART_SUCEESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: ADD_ITEM_TO_CART_FAILURE, payload: error.message});

        }
    };
};
 
export const updateCartItem = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type: UPDATE_CARTITEM_REQUEST});
        try{
            const res = await api.put(`${API_URL}/api/cart-item/update`, reqData.data,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("update item to cart", res.data);
            dispatch({type: UPDATE_CARTITEM_SUCEESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: UPDATE_CARTITEM_FAILURE, payload: error.message});

        }
    };
};

export const removeCartItem = ({cartItemId, jwt}) =>{
    return async (dispatch) =>{
        dispatch({type: DELETE_MENU_ITEM_REQUEST});
        try{
            const res = await api.delete(`${API_URL}/api/cart-item/${cartItemId}/remove`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("remove item to cart", res.data);
            dispatch({type: REMOVE_CARTITEM_SUCEESS, payload: cartItemId});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: REMOVE_CARTITEM_FAILURE, payload: error.message});

        }
    };
};

export const clearCartAction = () =>{
    return async (dispatch) =>{
        dispatch({type: CLEARE_CART_REQUEST});
        try{
            const res = await api.delete(`${API_URL}/api/cart/clear`,{}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("clear cart", res.data);
            dispatch({type: CLEARE_CART_SUCEESS, payload: cartItemId});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: CLEARE_CART_FAILURE, payload: error.message});

        }
    };
};