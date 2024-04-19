import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findOneProduct, getProductReview,deleteProduct } from "../../store/products";
import { useSelector } from "react-redux";
// import EditProduct from "../Inventory/EditProduct";
import "./ProductDetailPage.css"
import { useNavigate } from "react-router-dom";
import { addItem} from "../../store/cart";

export default function ProductDetailPage() {
    const  {itemId } = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
const product = useSelector((state) => state.products?.product)
const navigate = useNavigate()
    useEffect(()=>{
        dispatch(findOneProduct(itemId)).then(()=>{ dispatch(getProductReview(itemId))}).then(()=> setIsLoading(false))
    },[dispatch,itemId])

const url = product?.images
const reviews = useSelector((state) => state.products?.reviews)
const master = useSelector((state)=> state.session?.user?.isMaster)
const admin = useSelector((state)=> state.session?.user?.isAdmin)
const cartId = useSelector((state) => state.cart?.cart?.cart_id)
// const cart = useSelector((state)=> state.cart?.cart)
const edit = () =>{
    return navigate(`/products/${product.id}/edit`)
}


// useEffect(()=>{
//     if(!cart){
//         dispatch(createCart()).then(()=> dispatch(getCurrCart()))
//     }
// },[dispatch])



const deleteProd = (e) =>{
    e.preventDefault();

dispatch(deleteProduct(product.id))

return navigate('/')
}

const addtoCart = () =>{
   
    const item ={
        item_id: product.id,
        size: product.size,
        price: product.price,
        quantity: 1
    }
    dispatch(addItem(cartId,item)).catch(async (res)=>{
        const error = await res.json()
        console.log(error,'hit in product detail ')
    })
}
// console.log(cartId,'this is cartid')
if(!isLoading){

    return (
        <div>

            {url && url.map((pic) => (
                <img src={pic.url} style={{height: '500px',maxWidth: '500px',minWidth:'200px'}} key={pic.url}/>
            ))}
                 <h1>{product.name}</h1>
                <div>
                    <p>{product.description}</p>
                    <p>$ {product.price.toFixed(2)}</p>
                    <p>{product.size}</p>

                </div>
                {!admin && !master && (
                    <button onClick={addtoCart}>Add to Cart</button>
                )}
                {(admin || master) && (
                    <div>
                        <button onClick={edit}>Edit Product</button>{" "}<button onClick={deleteProd}>Delete Product</button>
                        </div>
                )}
                <hr />
                <h2>Reviews</h2>
            {reviews && reviews.map((review)=>(
                <div key={review.id}>
                <p>{review.review}</p>
                <p>{review.stars}</p>
                <p>{review.User.firstName} {review.User.lastName}</p>
                <img src={review.imageUrl} style={{height: '50px',width:'50px',borderRadius:'20px'}} />
                <hr />
                </div>
            ))}
            {!reviews && (
                <h3>No Reviews For this Product!</h3>
            )}
        </div>
        )
    }else{
        return <div>Loading......</div>
    }
}
