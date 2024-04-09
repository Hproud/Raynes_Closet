import { csrfFetch } from "./csrf";

//?------------------------------Variables--------------------------------------
const ALL_PRODUCTS = 'products/allProducts'
const GET_ONE = 'products/getOne'


//& ------------------------------ACTIONS---------------------------------------
const allProducts = (products) => ({
    type: ALL_PRODUCTS,
    products
});

const onlyOne = (product) => ({
    type: GET_ONE,
    product
})


//! -------------------------------THUNKS----------------------------------------

export const getAllProducts = () => async (dispatch)=>{
    const all = await csrfFetch('/api/products')

    if (all.ok){
        const products = await all.json()
        console.log(products)
        dispatch(allProducts(products))
        return products
    }
}

export const findOneProduct = (itemId) => async (dispatch)=> {
    const first = await csrfFetch(`/api/products/${itemId}`);

    if(first.ok){
        const product = await first.json();


        dispatch(onlyOne(product.product))


    }
}


//TODO-------------------------------REDUCER--------------------------------------


const productReducer = (state={}, action) =>{

    switch(action.type){

        case ALL_PRODUCTS:
            return {...state, products : action.products}

        case GET_ONE:
            return {...state, product: action.product}




    default: return state
    }

}


export default productReducer;
