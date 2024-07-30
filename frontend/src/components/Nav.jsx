import React from 'react'
import { Link } from 'react-router-dom'
import { websiteName } from '../constants'

const Nav = ({cartLength}) => {
  return (
    <div className='theme-color flex justify-around p-2 '>
        <Link to={'/'}>{websiteName}</Link>
        <ul className='flex gap-10 '>
            <li><Link to={'/'}>Home</Link></li>
            <li>About</li>
            <li>Contact Us</li>
            <li><Link to={'/auth/login'}>Login</Link></li>
            <li><Link to={'/extra'}>Extra</Link></li>
        </ul>
        <Link to={`/cart`} className='bg-white relative p-2 rounded'>My Cart <span className='text-slate-700 font-bold absolute top-[-8px] border border-slate-600 px-2 rounded-full'>{cartLength}</span>
        </Link>
    </div>
  )
}

export default Nav