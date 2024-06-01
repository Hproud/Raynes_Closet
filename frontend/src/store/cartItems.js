import { csrfFetch } from "./csrf";

//^               Variables
const GET_ALL = 'cartItems/GET_ALL'
const UPDATE_ITEM = 'cartItems/UPDATE_ITEM'
const DELETE_ITEM = 'cartItems/DELETE_ITEM'



//?               Actions

const allCartItems = (items) =>({
    type: GET_ALL,
    payload: items
})

const updateCartItem = (item) => ({
    type: UPDATE_ITEM,
    payload: item
})

const deleteCartItem = (id) => ({
    type: DELETE_ITEM,
    payload: id
})





//&               Thunks

export const getAllCartItems = () => async (dispatch) =>{
    const res = await csrfFetch(`/api/cart`)
    if(res.ok){
        const cart = await res.json()
        const itms = cart.items
        // console.log(itms,'in the thunk chking crt items')
        dispatch(allCartItems(cart.items))
        return cart.items
    }
}



export const updateTheCartItem = (cartId,itemId,quant) => async (dispatch) =>{
    const res = await csrfFetch(`/api/cart/${cartId}/items/${itemId}`,{
        method: 'PUT',
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(quant)
    })

    if(res.ok){
        const itm = await res.json()
        console.log(itm,'itm')
        dispatch(updateCartItem(itm))
        return itm
    }
}


export const removeCartItem = (cartId,itemId) => async (dispatch) =>{
    const remove = await csrfFetch(`/api/cart/${cartId}/items/${itemId}`,{
        method: 'DELETE'
    })

    if (remove.ok){
        dispatch(deleteCartItem(cartId))
        dispatch(getAllCartItems())
    }
}

//!               Reducer
const initialState = {
    data: {},
    isLoading: true
}


const cartItemsReducer = (state=initialState,action) =>{
switch(action.type){
    case GET_ALL:{
        const newState = {}
        action.payload.forEach(item => {
            newState[item.id] = item
        });

        return {
            ...state,
            data: newState,
            isLoading: false
        }
    }

    case UPDATE_ITEM:{

        return {
            data: {
                ...state.data,
            [action.payload.id]: payload
            },
            isLoading: false
        }
    }


    case DELETE_ITEM:{
        const newState = {...state}
        delete newState.data[action.payload]
        return {
            ...newState,
            isLoading: false
        }
    }


    default:
        return state
    }
}


export default cartItemsReducer
