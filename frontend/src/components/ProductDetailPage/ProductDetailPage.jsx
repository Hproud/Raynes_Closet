import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findOneProduct, getProductReview } from "../../store/products";
import { useSelector } from "react-redux";

import "./ProductDetailPage.css"


export default function ProductDetailPage() {
    const  {itemId } = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
const product = useSelector((state) => state.products?.product)

    useEffect(()=>{
        dispatch(findOneProduct(itemId)).then(()=>{ dispatch(getProductReview(itemId))}).then(()=> setIsLoading(false))
    },[dispatch,itemId])

const url = product?.images
const reviews = useSelector((state) => state.products.reviews)
// const master = useSelector((state)=> state.session?.user)
// const admin = useSelector((state)=> state.session?.user.isAdmin)





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
                <button>Add to Cart</button>
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
