import { csrfFetch } from "./csrf";

//?------------------------------Variables--------------------------------------
const GET_CART = 'cart/items'
const GET_ALL_ITEMS = 'cart/getAllItems'
const CLEAR_CART_STATE ='cart/clearCartState'
//& ------------------------------ACTIONS---------------------------------------
const getCart = (cart) =>({
    type: GET_CART,
    cart
})

const allItems = (items) =>({
    type: GET_ALL_ITEMS,
    items
})


export const clearCart = () => ({
    type: CLEAR_CART_STATE
})

//! -------------------------------THUNKS----------------------------------------
export const getCurrCart = () => async (dispatch) =>{
    const res = await csrfFetch(`/api/cart`)

    if (res.ok){
        const cart = await res.json()
        dispatch(getCart(cart))

        dispatch(allItems(cart.items))
    }else{
        const data = res.json()
        return data
    }
}


export const addItem=(cartId,item)=>async (dispatch)=>{
    const newItem = await csrfFetch(`/api/cart/${cartId}/items`,{
        method: 'POST',
        body: JSON.stringify(item)
    })

    if (newItem.ok){
        // const item = await newItem.json()
        dispatch(getCurrCart())
        // return item
    }else{
        const data = await newItem.json()
        return data
    }
}

export const createCart = () => async (dispatch)=>{
    const cart = await csrfFetch('/api/cart',{
        method: 'POST'
    })

    if(cart.ok){
        const newCart = await cart.json()
        dispatch(getCurrCart())
        return newCart
    }
}

export const updateCartItem = (cartId,itemId,quant) => async (dispatch) =>{
    // console.log(cartId,'cartid in update func')
    // console.log(itemId,'itemid in update func')
    // console.log(quant,'quant in update func')
const res = await csrfFetch(`/api/cart/${cartId}/items/${itemId}`,{
    method: 'PUT',
    body: JSON.stringify(quant)
})

if(res.ok){
    await res.json();
    console.log('hit')
dispatch(getCurrCart())
}else{
    console.log('hit2')
    const data = await res.json()
    return data
}
}


export const removeItem = (cartId,itemId) => async (dispatch) =>{
    const remove = await csrfFetch(`/api/cart/${cartId}/items/${itemId}`,{
        method: 'DELETE'
    })

    if (remove.ok){
        dispatch(getCurrCart())
    }
}

//TODO-------------------------------REDUCER--------------------------------------


const cartReducer = (state={}, action) =>{

    switch(action.type){

        case GET_CART :
                return {...state, cart : action.cart}
        case GET_ALL_ITEMS:
            return {...state, cartItems: action.items}

        case CLEAR_CART_STATE:
            return {}
    default: return state
    }

}


export default cartReducer;
