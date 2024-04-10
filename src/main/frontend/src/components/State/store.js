import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer"
import { thunk } from "redux-thunk";
import categoryReducer from "./Category/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import adminOrdersReducer from "./Order_Admin/Reducer";

const rooteReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    orderAdmin: adminOrdersReducer
})

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));

