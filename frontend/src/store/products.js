import { csrfFetch } from "./csrf";

//?------------------------------Variables--------------------------------------
const ALL_PRODUCTS = 'products/allProducts'
const GET_ONE = 'products/getOne'
const GET_PRODREVIEWS = 'products/prodReviews'

//& ------------------------------ACTIONS---------------------------------------
const allProducts = (products) => ({
    type: ALL_PRODUCTS,
    products
});

const onlyOne = (product) => ({
    type: GET_ONE,
    product
})


const productReviews =(reviews) => ({
    type: GET_PRODREVIEWS,
    reviews

})

//! -------------------------------THUNKS----------------------------------------

export const getAllProducts = () => async (dispatch)=>{
    const all = await csrfFetch('/api/products')

    if (all.ok){
        const products = await all.json()

        dispatch(allProducts(products))

    }
}

export const findOneProduct = (itemId) => async (dispatch)=> {
    const first = await csrfFetch(`/api/products/${itemId}`);

    if(first.ok){
        const product = await first.json();
        // console.log(product,"this is product")

        dispatch(onlyOne(product))
    }
}


export const getProductReview = (itemId) => async (dispatch)=> {
    const actual = await csrfFetch(`/api/products/${itemId}/reviews`);

    if (actual.ok){
        const reviews = await actual.json();
        console.log(reviews)

dispatch(productReviews(reviews))

        }

}



//TODO-------------------------------REDUCER--------------------------------------


const productReducer = (state={}, action) =>{

    switch(action.type){

        case ALL_PRODUCTS:
            return {...state, products : action.products}

        case GET_ONE:
            return {...state, product: action.product}

        case GET_PRODREVIEWS:
            return {...state, reviews : action.reviews
          }



    default: return state
    }

}


export default productReducer;
