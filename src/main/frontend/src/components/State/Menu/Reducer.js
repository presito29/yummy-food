import * as actionTypes from "./ActionType";

const initialState = {
    menuItems: [],
    loading: false,
    error: null,
    search: [],
    message: null
};

const menuItemReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEM_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message: "Product created successfully"
            };
        case actionTypes.GET_MENU_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                menuItems: action.payload
            };
        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload.id
                ),
            };    
        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                search: action.payload
            };
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEM_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE: 
             return{
                ...state,
                loading: false,
                error: action.payload,
                message: null
             };
        default:
            return state;        
                                      
    }
};

export default menuItemReducer;