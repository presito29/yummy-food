import { Category } from "@mui/icons-material";
import * as actionTypes from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    categories: [],
}

const categoryReducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
            case actionTypes.CREATE_CATEGORY_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    categories: [...state.categories, action.payload],
                };
            case actionTypes.GET_CATEGORY_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    categories: action.payload
                };
                case actionTypes.CREATE_CATEGORY_FAILURE:
                case actionTypes.GET_CATEGORY_FAILURE:
                        return {
                            ...state,
                            loading: false,
                            error: action.payload,
                        };  
                default:
                    return state;          

    }
};

export default categoryReducer;