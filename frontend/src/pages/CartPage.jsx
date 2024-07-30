import React from 'react'
import { Link } from 'react-router-dom'
import { currency } from '../constants'

import CartProducts from '../components/CartProducts'

const CartPage = ({ cartProducts }) => {

    const totalAmount = cartProducts.reduce((total, product) => {
        return (total + Math.round(product.quantity * product.price*100))/100
    }, 0)

    return (
        <div className=' m-4 flex flex-col gap-3'>
            <h1 className='ml-[50%] font-bold text-2xl'>My Cart</h1>
            <p className='text-green-800 font-semibold'>Total Items: {cartProducts.length}</p>
            <CartProducts cartProducts={cartProducts} />
            <div className='flex flex-col gap-3'>
                <strong>Check Out: </strong>
                <p>Total Amount: {totalAmount.toFixed(2)} {currency}</p>
                {totalAmount!==0?(
                <Link to={'/billingDetail'} className='theme-button'>Check-Out</Link>
                ):(<>
                <strong>Nothing To checkout</strong>
                <Link to={'/'} className='theme-button'>Explore Products</Link>
                </>
                )}
            </div>
        </div>
    )
}

export default CartPage