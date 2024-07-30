import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { Rating } from '@mui/material'
import { currency, getDispatchObject } from '../constants'
import { ClipLoader } from 'react-spinners'
import useFetch from '../Hooks/useFetch'

const ProductDetailPage = ({ cartProducts }) => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`products/${id}`);
    const [addedInCart, setAddedInCart] = React.useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product && cartProducts.some(prod => prod._id === product._id)) {
            setAddedInCart(true);
        }
    }, [product, cartProducts]);

    const dispatch = useDispatch();
    const addCart = () => {
        const dispatchObject = getDispatchObject(product, quantity);
        dispatch(addToCart(dispatchObject));
        setAddedInCart(true);
    }

    if (loading) {
        return <>
        <main className='pageCenter'>
        <div><ClipLoader/></div>
        </main>
        </>
    }

    if (error) {
        return <>
        <main className='pageCenter'>
        <div className='error'>Error loading product: {error}</div>
        </main>
        </>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    return (
        <div className='m-4 flex flex-col gap-3'>
            <h1 className='ml-[50%] font-bold text-2xl'>Product Detail</h1>
            <div className='w-3/6 card-shadow p-4 items-center flex flex-col gap-2 rounded-md'>
                <img className='w-56' src={product.image} alt="" />
                <h2 className='font-bold'>{product.title}</h2>
                <p>{product.description}</p>
                <Rating name="read-only" value={product.rating.rate} readOnly />
                <p className='font-semibold text-lg'>{product.price} {currency}</p>
                {
                    !addedInCart ?
                        <>
                            <strong>Quantity</strong>
                            <div className='flex gap-2 items-center'>
                                <button className='card-shadow px-3 py-1 rounded-md' onClick={() => quantity > 1 ? setQuantity(quantity - 1) : ''}>-</button>
                                <strong>{quantity}</strong>
                                <button className='card-shadow px-3 py-1 rounded-md' onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button onClick={addCart} className='theme-button'>Add to Cart</button>
                        </>
                        : <Link to={'/cart'} className='theme-button'>View Cart</Link>
                }
            </div>
        </div>
    )
}

export default ProductDetailPage;
