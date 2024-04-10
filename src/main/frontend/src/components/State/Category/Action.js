import { API_URL, api } from "../../config/api"
import {GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS} from "./ActionType";


export const createCategoryAction = ({reqData, jwt}) =>{
    return async (dispatch) => {
        dispatch ({type: CREATE_CATEGORY_REQUEST});

        try{
            const res = await api.post(`${API_URL}/api/admin/category/create`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create category", res.data);
            dispatch({type: CREATE_CATEGORY_SUCCESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: CREATE_CATEGORY_FAILURE, payload: error});

        }
    };
};

export const getCategoryAction = ({ jwt }) =>{
    return async (dispatch) => {
        dispatch ({type: GET_CATEGORY_REQUEST});

        try{
            const res = await api.get(`${API_URL}/category/all`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get category", res.data);
            dispatch({type: GET_CATEGORY_SUCCESS, payload: res.data});
        } catch(error){
            console.log("catch - ", error);
            dispatch({type: GET_CATEGORY_FAILURE, payload: error});

        }
    };
};
