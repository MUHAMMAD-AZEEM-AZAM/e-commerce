import React, { useRef, useState } from 'react';
import { websiteName } from '../../constants';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToken } from '../../features/authTokenSlice';
import { HiEyeOff,HiEye } from "react-icons/hi";
import { toast } from 'react-toastify';
import { usePostFetch } from '../../Hooks/usePostFetch';

const Login = () => {
    const email = useRef('');
    const password = useRef('');
    const [rememberCheck, setRememberCheck] = useState(false);
    const navigate = useNavigate()
    const [showPassword,setShowPassword]=useState(false)
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = {
            email: email.current.value,
            password: password.current.value,
            remember:rememberCheck
        };
        console.log(formData)

        const options = {
            method: 'POST',
            body: JSON.stringify(formData),
        };

        const {loading,error,data}=usePostFetch('auth/login',options)
        if(!error){
                        if(rememberCheck){
                            localStorage.setItem('token',json.token)
                        }else{
                            dispatch(addToken(json.token))
                        }
                        toast.success("Login Successfully")
                        navigate('/') 
        }

        // setLoading(true)
        // try {
        //     const response = await fetch(`http://localhost:3000/auth/login`, options)
        //     console.log(response)
        //     const json = await response.json()
        //     console.log(json)
        //     if (!response.ok) {
        //         setError(json.error)
        //         return;
        //     }
        //     if (response.ok) {
        //         if(rememberCheck){
        //             localStorage.setItem('token',json.token)
        //         }else{
        //             dispatch(addToken(json.token))
        //         }
        //         toast.success("Login Successfully")
        //         navigate('/') }

        // } catch (error) {
        //     console.log("Error: ", error)
        // } finally {
        //     setLoading(false)
        // }
    };

    return (
        <main className='flex items-center justify-center h-dvh'>
            <div className="formCard">
                <form className="space-y-6" onSubmit={submitForm}>
                    <h5 className="formHeading">Login to {websiteName}</h5>
                    <div>
                        <label htmlFor="email" className="formLabel">Your email</label>
                        <input ref={email} type="email" name="email" id="email" className="formFeild" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="formLabel">Your password</label>
                        <div  className='relative'>
                        <input ref={password} type={showPassword?'text':'password'} name="password" id="password" placeholder="••••••••" className="formFeild" required />
                        <span onClick={()=>setShowPassword(!showPassword)} className='absolute bottom-3 right-3'>{showPassword?<HiEyeOff/>:<HiEye/>}</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={() => setRememberCheck(!rememberCheck)} id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Remember me</label>
                        </div>
                        <Link to="/auth/forgotPassword" className="ms-auto text-sm text-blue-700 hover:underline">Forgot Password?</Link>
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <button type="submit" className="formButton">
                        {loading ? <ClipLoader color="white"  size={20}/> : 'Login to your account'}</button>
                    <div className="text-sm font-medium text-gray-500">
                        Not registered? <Link to="/auth/signup" className="text-blue-700 hover:underline">Create account</Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
