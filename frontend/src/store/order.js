import { csrfFetch } from "./csrf";
import {  clearCart} from "./cart";
//?---------------------VARIABLES-----------------------------------------------
const CREATE_ORDER = 'orders/createOrder'
const ALL_ORDERS = 'orders/allOrders'
const CLEAR_ORDERS='orders/clear'
const ORDER_DETAILS = 'orders/details'


//&---------------------------------------ACTIONS------------------------------

const newOrder = (order) =>({
    type: CREATE_ORDER,
    order
})

const allOrders = (orders) => ({
    type: ALL_ORDERS,
    orders
})

export const clearAllOrders = () =>({
    type: CLEAR_ORDERS
})

const getTheDetails=(order)=>({
    type: ORDER_DETAILS,
    order
})
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


export const getAllOrders = async (dispatch) => {
    const orders = await csrfFetch('/api/orders');

    if (orders.ok){
        const allCustOrders = await orders.json()
        dispatch(allOrders(allCustOrders))
    }
}

export const myOrders = async (dispatch) => {
const orders = await csrfFetch('/api/orders/current')
if(orders.ok){
    const theOrders = await orders.json()
    dispatch(allOrders(theOrders))
}
}


export const getMyOrder = (id) => async (dispatch) =>{
    const order = await csrfFetch(`/api/orders/${id}`)
console.log(id,'this is the id in the thunk')
    if(order.ok){
        const details = await order.json()
        dispatch(getTheDetails(details))
    }else{
        const data = order.json()
        console.log(data,'error in the thunk')
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

        case ORDER_DETAILS:
            return {...state, order: action.order}

        case CLEAR_ORDERS:
            return {}
        default: return state
    }
}

export default orderReducer;
