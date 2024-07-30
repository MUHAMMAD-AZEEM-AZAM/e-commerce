import React, { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const email=useRef('')
  const code=useRef('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
        email: email.current.value,
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
        const response = await fetch(`http://localhost:3000/auth/forgotPassword`, options)
        console.log(response)
        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setError(json.error)
            return;
        }
        if (response.ok) { navigate('/auth/otpVerification?source=forgotPassword') }

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
            <h5 className="formHeading">Forgot Password</h5>
            <div>
                <label htmlFor="email" className="formLabel">Your email</label>
                <input ref={email} type="email" name="email" id="email" className="formFeild" placeholder="name@company.com" required />
            </div>
            {error && <div className='error'>{error}</div>}
            <button type="submit" className="formButton">
                {loading ? <ClipLoader color="white" /> : 'Send Code'}</button>
        </form>
    </div>
</main>
  )
}

export default ForgotPassword