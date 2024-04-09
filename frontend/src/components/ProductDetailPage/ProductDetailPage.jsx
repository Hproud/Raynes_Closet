import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findOneProduct } from "../../store/products";
import { useSelector } from "react-redux";







export default function ProductDetailPage() {
    const  {itemId } = useParams()

    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
const product = useSelector((state) => state.products?.product)
    useEffect(()=>{
        dispatch(findOneProduct(itemId)).then(()=> setIsLoading(false))
    },[dispatch,itemId])
const url = product.Images[0].url
const reviews = product.Reviews
console.log(reviews,'reviewwwww')

    if(!isLoading){

        return (
            <>
                <h1>{product.name}</h1>
                <img src={url} style={{height: '500px',maxWidth: '500px',minWidth:'200px'}}></img>
                <div>
                    <p>{product.description}</p>
                    <p>$ {product.price.toFixed(2)}</p>
                    <p>{product.size}</p>
                </div>
                <hr />
                <div>
                    <h2>Reviews</h2>
                    <ul>
                    {reviews && reviews.map((review) => (
                            <li key={review.id}>
                                <p>{review.review}</p>
                                <p>{review.User}</p>
                            </li>
                    ))}
                    </ul>
                </div>
            </>
        )
    }else{
        return <div>Loading......</div>
    }
}
