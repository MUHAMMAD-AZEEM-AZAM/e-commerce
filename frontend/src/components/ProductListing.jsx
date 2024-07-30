import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { categories, prices } from '../constants';
import { json, Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners'
import useFetch from '../Hooks/useFetch';


const Products = () => {
    const [page, setPage] = useState(1)
    const pageSize = 10
    const [priceRange, setPriceRange] = useState('All')
    const [order, setOrder] = useState('des')
    const [sortWith, setSortWith] = useState('rating')
    const [selectedCategories, setSelectedCategories] = useState([])

    const handleCategoryChange = (category) => {
        let arrayWithNewCategory = [...selectedCategories]
        arrayWithNewCategory.includes(category) ?
            arrayWithNewCategory = arrayWithNewCategory.filter(cat => cat !== category) :
            arrayWithNewCategory.push(category)
        setSelectedCategories(arrayWithNewCategory)
    }

    const encodedCategoriesString = encodeURIComponent(JSON.stringify(selectedCategories));

    const queryString = `page=${page}&pageSize=${pageSize}&categories=${encodedCategoriesString}
    &priceRange=${priceRange}&order=${order}&sortWith=${sortWith}`

    const { data, loading, error: productError} = useFetch(`products?${queryString}`);

    return (

        <>
            <h1 className='text-xl font-bold ml-[50%] mb-4'>Products</h1>
            <div className='flex gap-2'>
                <section className='w-2/6 max-w-[280px] flex flex-col gap-8'>
                    <p className='text-lg bg-slate-400 text-center px-3 py-1 rounded-sm'>Filters</p>
                    <div>
                        <p className='font-bold mb-2'>Sort By</p>
                        <div className='card-shadow p-4 rounded'>
                            <div className='flex'>
                                <p onClick={() => setSortWith('rating')} className={`m-1 p-2 px-8 rounded-md border cursor-pointer ${sortWith === 'rating' ? 'bg-blue-200' : 'bg-white'}`}>Rating</p>
                                <p onClick={() => setSortWith('price')} className={`m-1 p-2 px-8 rounded-md border cursor-pointer ${sortWith === 'price' ? 'bg-blue-200' : 'bg-white'}`}>Price</p>
                            </div>
                            <p onClick={() => setOrder(order == 'ase' ? 'des' : 'ase')} className='m-1 p-2 px-4 rounded-md border cursor-pointer text-center bg-blue-200'>{order == 'ase' ? 'Low-High' : 'High-Low'}</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold mb-2'>Category</p>
                        <div className='card-shadow p-4 rounded'>
                            {categories.map((cat, index) =>
                                <p onClick={() => handleCategoryChange(cat)} key={index}
                                    className={`capital text-left m-1 p-2 rounded-md border cursor-pointer ${selectedCategories.includes(cat) ? 'bg-blue-200' : 'bg-white'}`}>
                                    {cat}</p>)}
                        </div>
                    </div>
                    <div>
                        <p className='font-bold mb-2'>Price</p>
                        <div className='card-shadow p-4 rounded'>
                            {prices.map((price, index) =>
                                <p onClick={() => setPriceRange(price)} key={index} className={`m-1 p-2 rounded-md border cursor-pointer ${priceRange === price ? 'bg-blue-200' : 'bg-white'}`}>{price}</p>)}
                        </div>
                    </div>
                </section>

                {
                    productError ? (
                        <h1>{productError}</h1>
                    ) : (
                        <section className='w-4/6 flex flex-col items-center justify-center'>
                            {loading ?
                                <SyncLoader color='orange' /> :
                                <>
                                    <div className='flex gap-4 flex-wrap justify-center'>

                                        {
                                            data?.map((product) => {
                                                return <ProductCard key={product._id} product={product} />
                                            })}
                                    </div>
                                    <div className='flex gap-4 items-center justify-center mt-8'>
                                        <button className='card-shadow p-3 rounded-lg'><HiArrowLeft onClick={() => { page > 1 ? setPage(page - 1) : setPage(page) }} /></button>{page}
                                        <button className='card-shadow p-3 rounded-lg'><HiArrowRight onClick={() => { data.length ? setPage(page + 1) : setPage(page) }} /></button>
                                    </div>
                                </>
                            }
                        </section>
                    )
                }

            </div>
        </>
    )
}

export default Products