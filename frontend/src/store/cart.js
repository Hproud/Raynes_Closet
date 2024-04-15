import { csrfFetch } from "./csrf";

//?------------------------------Variables--------------------------------------
const GET_CART = 'cart/items'
const GET_ALL_ITEMS = 'cart/getAllItems'

//& ------------------------------ACTIONS---------------------------------------
const getCart = (cart) =>({
    type: GET_CART,
    cart
})

const allItems = (items) =>({
    type: GET_ALL_ITEMS,
    items
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
        const item = await newItem.json()
        dispatch(getCurrCart())
        // return item
    }else{
        const data = await newItem.json()
        return data
    }
}




//TODO-------------------------------REDUCER--------------------------------------


const cartReducer = (state={}, action) =>{

    switch(action.type){

        case GET_CART :
                return {...state, cart : action.cart}
        case GET_ALL_ITEMS:
            return {...state, cartItems: action.items}
    default: return state
    }

}


export default cartReducer;
