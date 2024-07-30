import React, { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const EnterCode = () => {
    //logic for getting params
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');

    const navigate = useNavigate()
    const otp = useRef('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const userId = localStorage.getItem('userId')
    console.log(userId)

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = {
            userId,
            otp: otp.current.value,
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
        const api=source=='signup'?`http://localhost:3000/auth/verifyOTP`:`http://localhost:3000/auth/resetPassword`
        try {
            const response = await fetch(api, options)
            console.log(response)
            const json = await response.json()
            if (!response.ok) {
                setError(json.message)
                return;
            }
            console.log(json.message)

            toast.success(json.statusbar)

            if (response.ok) {
                if (source == 'signup') {
                    navigate('/auth/login')
                } else {
                    navigate('/auth/resetPassword')
                }
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
                    <h5 className="formHeading">OTP Verification</h5>
                    <p>Check your email for OTP</p>
                    <div>
                        <label htmlFor="otp" className="formLabel">Enter 4 digit code</label>
                        <input style={{ letterSpacing: '45px', textAlign: 'center' }} ref={otp} minLength={4} maxLength={4} type="text" name="otp" className="formFeild" placeholder="____" required />
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <button type="submit" className="formButton">
                        {loading ? <ClipLoader color="white" /> : 'Verfiy'}</button>
                </form>
            </div>
        </main>
    )
}

export default EnterCode