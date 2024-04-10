import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findOneProduct } from "../../store/products";
import { useSelector } from "react-redux";

import "./ProductDetailPage.css"


export default function ProductDetailPage() {
    const  {itemId } = useParams()

    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
const product = useSelector((state) => state.products?.product)
    useEffect(()=>{
        dispatch(findOneProduct(itemId)).then(()=> setIsLoading(false))
    },[dispatch,itemId])

const url = product.Images

const reviews = product?.Reviews

const reviewImages = [];
if(reviews?.length){
    reviews.map((review) => {
        const images = review.ReviewImages;
        reviewImages.push(images)
    })
}

console.log(url[0].url,"****************************")


if(!isLoading){

    return (
        <>
            {url && url.map((pic) => (
                <img src={pic.url} style={{height: '500px',maxWidth: '500px',minWidth:'200px'}} key={pic.url}/>
            ))}
                <h1>{product.name}</h1>
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


                    {url && url.map((img) => {
                        <img src={img.url} key={img.key} />
                    })}

                    </ul>
                </div>
            </>
        )
    }else{
        return <div>Loading......</div>
    }
}
