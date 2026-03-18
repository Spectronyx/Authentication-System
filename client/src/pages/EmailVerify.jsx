import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useEffect } from 'react';

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const inputRefs = React.useRef([]);
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext);
  const naviagate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const Otp = otpArray.join("");

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { Otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        naviagate("/");
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && naviagate("/")
  }, [isLoggedin, userData, naviagate])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-200'>
      <img onClick={() => Navigate("/")} src={assets.logo} alt="" className='absolute left-5 top-5 w-20 sm:w-32 cursor-pointer' />

      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='mb-5 text-center text-white font-semibold text-2xl'>Email Verify</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the six digit code sent to your email</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength="1" key={index} required className='h-12 w-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full py-3 bg-linear-to-r from-indigo-400 to-indigo-800 rounded-full px-2'>Verify Email</button>
      </form>
    </div>
  )
}

export default EmailVerify