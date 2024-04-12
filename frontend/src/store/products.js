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

// export const addPreviewPic=(itemId,url)=> async (dispatch) =>{
//     const res = await csrfFetch(`/api/${itemId}/images`,{
//         method: 'POST',
//         body: JSON.stringify({
//             imageable_id: itemId,
//             imageable_type: 'Product',
//             url: url,
//             preview: true
//         })
//     })
//     if(res.ok){
//         // const image = res.json();
//         dispatch(findOneProduct(itemId))
//     }
// }


export const addMoreProductPics =(itemId,pic) => async (dispatch)=>{
    const res = await csrfFetch(`/api/${itemId}/images`,{
        method: 'POST',
        body: JSON.stringify({
            imageable_id: itemId,
            imageable_type: 'Product',
            url: pic,
            preview: false
        })
    })
    if(res.ok){
        // const image = res.json();
        dispatch(findOneProduct(itemId))
    }
}

export const addNewItem = (proposed) => async(dispatch) =>{
    const {name,description,size,price,type,quantity,preview} = proposed
    const res = await csrfFetch('/api/products',{
        method: 'POST',
        body: JSON.stringify({
            name:name,
            description: description,
            size:size,
            price:price,
            type: type,
            quantity: quantity
        })
    })

if(res.ok){
    const product = await res.json()
    console.log(product,'you got the product')
    await csrfFetch(`/api/products/${product.id}/images`,{
        method: 'POST',
        body: JSON.stringify({
            url: preview,
            preview: true
        })
    })
    dispatch(findOneProduct(product.id))

    return product.id
}else{
    const data = res.json();
    return data
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
