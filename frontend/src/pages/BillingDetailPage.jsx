import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CartProducts from '../components/CartProducts';
import { formData } from '../constants/index';
import { Checkbox } from '@mui/material';

const BillingDetailPage = ({ cartProducts }) => {
    const [paymentMethod, setPaymentMethod] = React.useState('creditCard');

    return (
        <div className='m-4 flex flex-col gap-4'>
            <form action="" method='POST' className='flex flex-col gap-8 w-fit'>
                {Object.keys(formData).map((sectionName, index) => {
                    return (
                        <div key={index}>
                            <h1 className='font-bold bg-slate-200 p-4'>{formData[sectionName].label}</h1>
                            <br />
                            <div className='flex flex-wrap gap-4'>
                                {formData[sectionName].fields.map((field, id) => {
                                    return (
                                        <div className='flex gap-4 w-[400px] justify-between' key={id}>
                                            <label className='font-semibold'>{field.label}</label>
                                            {field.type === 'text' || field.type === 'email' || field.type === 'tel' ? (
                                                <TextField style={{ width: '200px' }} id="outlined-basic" type={field.type} label={field.label} required={field.required} inputProps={{ maxLength: field.maxLength || 255 }} variant="outlined" size='small' />
                                            ) : field.type === 'select' ? (
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={paymentMethod}
                                                    label={field.label}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                >
                                                    {field.options.map((option, index) =>
                                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                                    )}
                                                </Select>
                                            ) : (
                                                <Checkbox />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                <br />
                <button type='submit' className='theme-button m-auto px-10'>Place Order</button>
            </form>
            <div className='w-5/6'>
                <h2 className='font-bold text-xl mb-2'>Products</h2>
                <CartProducts cartProducts={cartProducts} />
            </div>
        </div>
    );
}

export default BillingDetailPage;
