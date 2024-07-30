import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../features/cartSlice'
import { useDispatch } from 'react-redux'
import { HiTrash } from "react-icons/hi";
import { currency, getDispatchObject } from '../constants';
import { Link } from 'react-router-dom';


const CartProducts = ({ cartProducts }) => {
  const dispatch = useDispatch()
  const handleUpdateQuantity=(product,changingFactor)=>{
    const newProduct={...product,quantity:product.quantity+changingFactor}
    dispatch(addToCart(newProduct))
  }
  useEffect(()=>{

  },[cartProducts])
  return (
    <div className='w-4/6 flex flex-col gap-4'>
      {cartProducts.map((cartProduct) => {
        return (
          <div key={cartProduct._id}  className='shadow-lg border flex items-center justify-between p-2 gap-3'>
              <img className='w-20 h-20 rounded-md' src={cartProduct.image} alt="" />
              <div className='flex flex-col w-56 gap-1'>
                <Link to={`/products/${cartProduct._id}`}><strong>{cartProduct.title.substring(0, 30)}</strong></Link>
                <p>Price: {cartProduct.price} {currency}</p>
                {/* <p className='text-sm'>Quantity: {cartProduct.quantity}</p> */}
                <div className='flex gap-2 items-center'>
                    <button className='card-shadow px-3 rounded-md' onClick={()=>cartProduct.quantity>1?handleUpdateQuantity(cartProduct,-1):''}>-</button>
                    <strong>{cartProduct.quantity}</strong>
                    <button className='card-shadow px-3 rounded-md' onClick={()=>handleUpdateQuantity(cartProduct,1)}>+</button>
                </div>
                <p className='text-xs text-slate-500'>{cartProduct.date}</p>
              </div>
              <HiTrash className='text-red-700 h-5 w-5' onClick={() => {
                const response = window.confirm("Are you sure!\nYou want to remove this item from Cart")
                if (response)
                  dispatch(removeFromCart(cartProduct._id))
              }} />
          </div>
        )
      })}
    </div>
  )
}

export default CartProducts