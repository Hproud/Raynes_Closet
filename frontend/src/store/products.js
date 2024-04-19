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

export const addNewItem = (proposed) => async(dispatch) =>{
    const {name,description,size,price,type,quantity,preview,pictures} = proposed
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
    });


    if(pictures){
        pictures.map(async (pic)=>{
            await csrfFetch(`/api/${product.id}/images`,{
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
}else{
    const data = res.json();
    return data
}

}



export const editTheProuct = (id,info) => async (dispatch)=>{

    const edited = await csrfFetch(`/api/products/${id}`,{
        method: 'PUT',
        body: JSON.stringify(info)
    })

    if(edited.ok){
        const product = await edited.json();
        dispatch(onlyOne(product));
        return product
    }else{
        const error = edited.json();
        return error
    }

}


export const deleteProduct = (id) => async (dispatch) => {
const remove = await csrfFetch(`/api/products/${id}`,{
    method: 'DELETE'
})
if(remove.ok){

    dispatch(getAllProducts())

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
