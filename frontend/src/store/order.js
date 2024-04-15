// import { csrfFetch } from "./csrf";

//?---------------------VARIABLES-----------------------------------------------
const CREATE_ORDER = 'orders/createOrder'
const ALL_ORDERS = 'orders/allOrders'



//&---------------------------------------ACTIONS------------------------------

const newOrder = (order) =>({
    type: CREATE_ORDER,
    order
})

const allOrders = (orders) => ({
    type: ALL_ORDERS,
    orders
})


//!------------------------------------THUNKS-----------------------------------




//^----------------------------------REDUCER------------------------------------
const orderReducer = (state={},action) => {
    switch(action.type){
        case CREATE_ORDER:
            return {...state, order: action.order}

        case ALL_ORDERS:
            return {...state, orders: action.orders}

        default: return state
    }
}

export default orderReducer;
