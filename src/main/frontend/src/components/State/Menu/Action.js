import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_FAILURE, GET_MENU_ITEM_REQUEST, GET_MENU_ITEM_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS } from "./ActionType";
import { API_URL, api } from "../../config/api"

import axios from "axios";

export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        
        try {

            const { data } = await api.post(`${API_URL}/api/admin/create`, menu, {
                headers: {
                    Authorization: `Bearer ${jwt}` // Assuming jwt is the JWT token
                }
            });   
            
           console.log("create menu", data)
           dispatch({type: CREATE_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("catck error", error);
            dispatch({type: CREATE_MENU_ITEM_FAILURE, payload: error })

        }
    };
};

export const getMenuItems = (reqData) =>{
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEM_REQUEST });
        
        try {


            const { data } = await api.get(`${API_URL}/product/allByCategory?category=${reqData.category}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}` // Assuming jwt is the JWT token
                }
            });   
            
           console.log("menu items", data)
           dispatch({type: GET_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({type: GET_MENU_ITEM_FAILURE, payload: error })

        }
    } ;
};

export const getAllMenuItems = (reqData) =>{
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEM_REQUEST });
        
        try {


            const { data } = await api.get(`${API_URL}/product/all`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}` // Assuming jwt is the JWT token
                }
            });   
            
           console.log("menu items", data)
           dispatch({type: GET_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({type: GET_MENU_ITEM_FAILURE, payload: error })

        }
    } ;
};

export const searchMenuItems = ({keyword, jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        
        try {

            const { data } = await api.get(`${API_URL}/product/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}` // Assuming jwt is the JWT token
                }
            });   
            
           console.log("data ----", data)
           dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("catch error", error);
            dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload: error })

        }
    } ;
};

export const deleteMenuItems = ({ productId, jwt }) =>{
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        
        try {

            const { data } = await api.delete(`${API_URL}/api/admin/${productId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}` // Assuming jwt is the JWT token
                }
            });   
            
           console.log("delete food", data)
           dispatch({type: DELETE_MENU_ITEM_SUCCESS, payload: productId });
        } catch (error) {
            console.log("catch error", error);
            dispatch({type: DELETE_MENU_ITEM_FAILURE, payload: error });

        }
    } ;
};

