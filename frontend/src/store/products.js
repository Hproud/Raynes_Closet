import { csrfFetch } from "./csrf";

//?------------------------------Variables--------------------------------------
const ALL_PRODUCTS = 'products/allProducts'



//& ------------------------------ACTIONS---------------------------------------
const allProducts = (products) => ({
    type: ALL_PRODUCTS,
    products
})


//! -------------------------------THUNKS----------------------------------------

export const getAllProducts = () => async (dispatch)=>{
    const all = await csrfFetch('/api/products/')

    if (all.ok){
        const products = await all.json()
        dispatch(allProducts(products.products))
        return products
    }
}




//TODO-------------------------------REDUCER--------------------------------------


const productReducer = (state={}, action) =>{

    switch(action.type){

        case ALL_PRODUCTS:
                return {...state, products : action.products}
    default: return state
    }

}


export default productReducer;
