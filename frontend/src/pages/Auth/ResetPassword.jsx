import React, { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { addToken } from '../../features/authTokenSlice';
import { HiEyeOff, HiEye } from "react-icons/hi";

const ResetPassword = () => {

    const password = useRef('');
    const confirmPassword = useRef('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = {
            confirmPassword: confirmPassword.current.value,
            password: password.current.value,
        };
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
            const response = await fetch(`http://localhost:3000/auth/updatePassword`, options)
            console.log(response)
            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setError(json.error)
                return;
            }
            if (response.ok) {
                if (rememberCheck) {
                    localStorage.setItem('token', json.token)
                } else {
                    dispatch(addToken(json.token))
                }
                navigate('/')
            }

        } catch (error) {
            console.log("Error: ", error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <main className='flex items-center justify-center h-dvh'>
            <div className="formCard">
                <form className="space-y-6" onSubmit={submitForm}>
                    <h5 className="formHeading">Reset Password</h5>
                    <div>
                        <label htmlFor="password" className="formLabel">New password</label>
                        <div className='relative'>
                            <input ref={password} type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••" className="formFeild" required />
                            <span onClick={() => setShowPassword(!showPassword)} className='absolute bottom-3 right-3'>{showPassword ? <HiEyeOff /> : <HiEye />}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="formLabel">Confirm password</label>
                        <div className='relative'>
                            <input ref={confirmPassword} type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="••••••••" className="formFeild" required />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute bottom-3 right-3'>{showConfirmPassword ? <HiEyeOff /> : <HiEye />}</span>
                        </div>
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <button type="submit" className="formButton">
                        {loading ? <ClipLoader color="white" size={20} /> : 'Reset Password'}</button>

                </form>
            </div>
        </main>
    )
}

export default ResetPassword