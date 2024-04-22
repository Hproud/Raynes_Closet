import { csrfFetch } from "./csrf";
import { findOneProduct } from "./products";

//? Variables------------------------------------------------------------------
const GET_FULL_INV = 'inventory/getAllInv'
const GET_INV_OF_ONE='inventory/getInvOfOne'



//& Actions----------------------------------------------------------------------

const fullInventory = (products) => ({
    type: GET_FULL_INV,
    products
})

const singleItem = (item) =>({
    type: GET_INV_OF_ONE,
    item
})

//! Thunks------------------------------------------------------------------------

export const allInv = ()=> async (dispatch) =>{
    const inv = await csrfFetch('/api/inventory')

    if(inv.ok){
        const products = await inv.json()
        dispatch(fullInventory(products))
    }
}

export const getOneInv = (id) => async (dispatch)=>{
    const inv = await csrfFetch(`/api/inventory/${id}`)

    if(inv.ok){
        const product = await inv.json()
        dispatch(singleItem(product))
        dispatch(findOneProduct(id))
    }


}

export const updateQ = (id,quant) => async (dispatch) =>{
const res = await csrfFetch(`/api/inventory/${id}`,{
    method: 'PUT',
    body: JSON.stringify(quant)
});
if(res.ok){
    const edited = await res.json();
    dispatch(singleItem(edited))
    dispatch(allInv())
    return edited
}else{
    const data = res.json()
    return data
}
}
//^Reducer--------------------------------------------------------------------------

const inventoryReducer = (state={},action) =>{
    switch(action.type){
        case GET_FULL_INV:
            return {...state, products: action.products}

        case GET_INV_OF_ONE:
            return {...state, product: action.item}

        default:
            return state
    }
}

export default inventoryReducer;
