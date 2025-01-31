import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { login } from '../services/operations/AuthAPIs'
import HighLightText from '../components/HighLightText'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";
import toast from 'react-hot-toast'


const LogIn = () => {

  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Loading...")
    try {
      const response = await login(data, dispatch)
      if (response) {
        navigate("/dashboard")
      }
    } catch (e) {
      console.log("ERROR WHILE SINGING UP : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <section>
        <h1 className='text-center pb-5 text-4xl font-mono underline'>Quizzy </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-3 max-w-[480px] shadow-lg shadow-blue-300  border p-10 rounded-lg'
        >
          <div>
            <h3 className='text-4xl pb-5 text-center leading-[1.125]'>
              Log in to Your Account
            </h3>
          </div>

          {
            loading &&
            <span className='text-center text-red-500 text-sm'>
              When loaded for the first time, the server might take a minute or two to respond. Please be patient!
            </span>
          }

          <span className='flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input
              id='email'
              placeholder='Email'
              className='py-1 text-base  placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {
              errors?.email && <RequiredError>{errors.email.message}</RequiredError>
            }
          </span>

          <span className='flex flex-col gap-1'>
            <label htmlFor="password">Password</label>
            <span className='flex items-center w-full'>
              <input
                id='password'
                placeholder='Password'
                className='py-1 text-base  placeholder:text-black text-slate-950 w-full rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
                type={hidePassword ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className='p-3 cursor-pointer'
                onClick={() => setHidePassword(!hidePassword)}
              >
                {
                  hidePassword ? <TbEyeClosed /> : <TbEyeCheck />
                }</span>
            </span>
            {
              errors?.password && <RequiredError>{errors.password.message}</RequiredError>
            }
          </span>

          <span className='mt-5'>
            <Button disabled={loading} varient={"primary"} type={"submit"}>Submit</Button>
          </span>

          <p className='text-center mt-3'>Don't have an account? <span onClick={() => navigate("/signup")} className=' cursor-pointer text-green-500'>Sign Up</span></p>

        </form>
      </section >
    </div >
  )
}

export default LogIn