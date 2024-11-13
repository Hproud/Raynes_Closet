import { csrfFetch } from "./csrf";

//?------------------------------Variables--------------------------------------
const ALL_PRODUCTS = 'products/allProducts'
const GET_ONE = 'products/getOne'
const GET_PRODREVIEWS = 'products/prodReviews'
const DELETE_PRODUCT = 'products/delete'
const GET_SIZES = 'products/getSizes'

//& ------------------------------ACTIONS---------------------------------------


const allProducts = (products) => ({
    type: ALL_PRODUCTS,
    payload: products
})

const onlyOne = (product) => ({
    type: GET_ONE,
    product
})


const productReviews = (reviews) => ({
    type: GET_PRODREVIEWS,
    reviews

})

const deleteTheProduct = (id) =>({
    type: DELETE_PRODUCT,
    payload: id
})

const allSizesHere = (products) =>({
type: GET_SIZES,
payload: products
})

//! -------------------------------THUNKS----------------------------------------

export const getAllProducts = () => async (dispatch) => {
    const all = await csrfFetch('/api/products')

    if (all.ok) {
        const products = await all.json()

        dispatch(allProducts(products))
// dispatch(test1(products))
    }
}

export const findAllSizes = (prodname) => async (dispatch) =>{
    const {name} = prodname
const res = await csrfFetch('/api/products/item',{
    method: 'GET',
    body: JSON.stringify({
        name: name
    })
})

}

export const findOneProduct = (itemId) => async (dispatch) => {
    const first = await csrfFetch(`/api/products/${itemId}`);

    if (first.ok) {
        const product = await first.json();


        dispatch(onlyOne(product))
    }
}


export const getProductReview = (itemId) => async (dispatch) => {
    const actual = await csrfFetch(`/api/products/${itemId}/reviews`);

    if (actual.ok) {
        const reviews = await actual.json();

if(reviews.length){

    dispatch(productReviews(reviews))
}else{
    return 'None Found'
}

    } else {
        const data = await actual.json();
        return data
    }
}

export const addNewItem = (proposed) => async (dispatch) => {
    const { name, description, size, price, type, quantity, preview, pictures } = proposed
    const res = await csrfFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            description: description,
            size: size,
            price: price,
            type: type,
            quantity: quantity
        })
    })

    if (res.ok) {
        const product = await res.json()

        await csrfFetch(`/api/products/${product.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: preview,
                preview: true
            })
        });


        if (pictures) {
            pictures.map(async (pic) => {
                await csrfFetch(`/api/${product.id}/images`, {
                    method: 'POST',
                    body: JSON.stringify({
                        url: pic,
                        preview: false
                    })
                })

            })
        }

        dispatch(findOneProduct(product.id))

        return product.id
    } else {
        const data = res.json();
        return data
    }

}



export const editTheProuct = (id, info) => async (dispatch) => {

    const edited = await csrfFetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(info)
    })

    if (edited.ok) {
        const product = await edited.json();
        dispatch(onlyOne(product));
        return product
    } else {
        const error = edited.json();
        return error
    }

}


export const deleteProduct = (id) => async (dispatch) => {
    const remove = await csrfFetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    if (remove.ok) {

        dispatch(deleteTheProduct(id))

    }
}




//TODO-------------------------------REDUCER--------------------------------------

const initialState = {
    data: {},
    isLoading:true
}

const productReducer = (state = initialState, action) => {

    switch (action.type) {

        case ALL_PRODUCTS:{

            const normalized = {}
            action.payload.forEach((product)=>
            normalized[product.id]=product
        )

        return{
            ...state, data: normalized
        }
        }

        case GET_ONE:
            return { ...state, product: action.product }

        case GET_PRODREVIEWS:
            return {
                ...state, reviews: action.reviews
            }

        case DELETE_PRODUCT:{
            const normState = {...state}
            delete normState.data[action.payload]
            return{
                ...normState, isLoading: false
            }
        }
        default: return state
    }

}


export default productReducer;
