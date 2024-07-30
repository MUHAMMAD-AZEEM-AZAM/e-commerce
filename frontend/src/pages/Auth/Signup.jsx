import React, { useRef, useState } from 'react'
import { websiteName } from '../../constants'
import { ClipLoader } from 'react-spinners'
import { HiEyeOff,HiEye } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const name = useRef('')
    const email = useRef('')
    const password = useRef('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [showPassword,setShowPassword]=useState(false)
    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
        }
        console.log(formData)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/auth/signup`, options)
            console.log(response)
            const json = await response.json()
            console.log("Json response",json)
            if (!response.ok) {
                setError(json.error)
                return;
            }
            if (response.ok) { 
                console.log("F1: id",json.otpResponse.data.userId)
                localStorage.setItem('userId',json.otpResponse.data.userId);
                navigate('/auth/otpVerification?source=signup') }

        } catch (error) {
            console.log("Error: ", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <main className='flex items-center justify-center h-dvh'>
            <div className="formCard">
                <form className="space-y-6" onSubmit={submitForm}>
                    <h5 className="formHeading">Register to {websiteName}</h5>
                    <div>
                        <label htmlFor="text" className="formLabel">Name</label>
                        <input ref={name} type="text" name="text" id="name" className="formFeild" placeholder="Enter Your name" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="formLabel">Email</label>
                        <input ref={email} type="email" name="email" id="email" className="formFeild" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="formLabel">Your password</label>
                        <div  className='relative'>
                        <input ref={password} type={showPassword?'text':'password'} name="password" id="password" placeholder="••••••••" className="formFeild" required />
                        <span onClick={()=>setShowPassword(!showPassword)} className='absolute bottom-3 right-3'>{showPassword?<HiEyeOff/>:<HiEye/>}</span>
                        </div>
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <button type="submit" className="formButton">
                        {loading ? <ClipLoader color="white" /> : 'Register'}
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <Link to="/auth/login" className="text-blue-700 hover:underline">Login Now</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Signup