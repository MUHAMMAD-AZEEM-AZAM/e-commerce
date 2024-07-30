import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
import { currency } from '../constants'

const ProductCard = ({product}) => {
  return (
    <Link to={`/products/${product._id}`}>
    <div className='card-shadow rounded-md p-2 h-52 w-[250px] flex flex-col items-center'>
                    <img className='w-30 h-20' src={product.image} alt='product image' style={{alignItems:'center'}}/>
                    <h1 className='font-bold'>{product.title.substring(0,20)+"..."}</h1>
                    {/* <p className='text-slate-700'>{product.description.substring(0,90)+"..."}</p> */}
                    <p className='text-green-700 capital'>{product.category}</p>
                    <p>{product.price} {currency}</p>
                    <div className='flex gap-2'>
                    <Rating name="read-only" size='small' value={product.rating.rate} readOnly />
                    <p className='text-slate-600 text-xs'> ({product.rating.count})</p>
                    </div>
                </div>
    </Link>
  )
}

export default ProductCard