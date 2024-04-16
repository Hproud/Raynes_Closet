import { csrfFetch } from "./csrf";
import {  clearCart} from "./cart";
//?---------------------VARIABLES-----------------------------------------------
const CREATE_ORDER = 'orders/createOrder'
const ALL_ORDERS = 'orders/allOrders'



//&---------------------------------------ACTIONS------------------------------

const newOrder = (order) =>({
    type: CREATE_ORDER,
    order
})

// const allOrders = (orders) => ({
//     type: ALL_ORDERS,
//     orders
// })


//!------------------------------------THUNKS-----------------------------------

export const placeOrder = (info) => async (dispatch) =>{
    console.log(info,'info in thunk')
    const place = await csrfFetch(`/api/orders`,{
        method: 'POST',
        body: JSON.stringify(info)
    });

    if(place.ok){
        const order = await place.json()
        dispatch(newOrder(order))
        dispatch(clearCart())
        // dispatch(getCurrCart())
        return order
    }else{
        const data = place.json()
        return data
    }
}


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
