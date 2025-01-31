import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { signUp } from '../services/operations/AuthAPIs'
import HighLightText from '../components/HighLightText'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";


const SignUp = () => {

  const [hidePassword, setHidePassword] = useState({
    password: true,
    confirmPassword: true,
  })
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Loading...")
    try {
      const response = await signUp(data)
      if (response) {
        navigate("/login")
      }
    } catch (e) {
      console.log("ERROR WHILE SINGING UP : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  useEffect(() => {
    setValue("role", "user")
  }, [setValue])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <section>
        <h1 className='text-center pb-5 text-4xl font-mono underline'>Quizzy </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-3 max-w-[480px] shadow-lg shadow-blue-300 border p-10 rounded-lg'
        >
          <div>
            <h3 className='text-4xl pb-5 text-center leading-[1.125]'>
              Create Your <HighLightText>Free </HighLightText>Account Now!!!
            </h3>
          </div>

          {
            loading &&
            <span className='text-center text-red-500 text-sm'>
              When loaded for the first time, the server might take a minute or two to respond. Please be patient!
            </span>
          }

          <span className='flex flex-col gap-1'>
            <label htmlFor="username">Create a Username</label>
            <input
              id='username'
              placeholder='Username'
              className='py-1 text-base placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            {
              errors?.username && <RequiredError>{errors.username.message}</RequiredError>
            }
          </span>

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
                type={hidePassword.password ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className='p-3 cursor-pointer'
                onClick={() => setHidePassword((prev) => ({ ...prev, password: !hidePassword.password }))}
              >
                {
                  hidePassword.password ? <TbEyeClosed /> : <TbEyeCheck />
                }</span>
            </span>
            {
              errors?.password && <RequiredError>{errors.password.message}</RequiredError>
            }
          </span>

          <span className='flex flex-col gap-1'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span className='flex items-center w-full'>
              <input
                name='confirmPassword'
                id='confirmPassword'
                placeholder='Confirm Password'
                className='py-1 text-base  placeholder:text-black text-slate-950 w-full rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
                type={hidePassword.confirmPassword ? "password" : "text"}
                {...register("confirmPassword", { required: "Re-enter your password" })}
              />
              <span
                className='p-3 cursor-pointer'
                onClick={() => setHidePassword((prev) => ({ ...prev, confirmPassword: !hidePassword.confirmPassword }))}
              >
                {
                  hidePassword.confirmPassword ? <TbEyeClosed /> : <TbEyeCheck />
                }
              </span>
            </span>
            {
              errors?.confirmPassword && <RequiredError>{errors.confirmPassword.message}</RequiredError>
            }
          </span>

          <span className='flex border border-slate-600 p-1 cursor-pointer w-max gap-3 rounded-full'>
            <button
              type="button"
              className={`${role === "user" ? "bg-green-700" : "bg-transparent"} px-3 rounded-full`}
              onClick={(e) => {
                e.preventDefault();
                setValue("role", "user");
                setRole("user")
              }}>
              User
            </button>
            <button
              type="button"
              className={`${role === "admin" ? "bg-green-700" : "bg-transparent"} px-3 rounded-full`}
              onClick={(e) => {
                e.preventDefault();
                setValue("role", "admin");
                setRole("admin")
              }}>
              Admin
            </button>
          </span>

          <span className=''>
            <Button disabled={loading} varient={"primary"} type={"submit"}>Submit</Button>
          </span>

          <p className='text-center mt-3'>Already have an account? <span onClick={() => navigate("/login")} className='text-green-500 cursor-pointer'>Log in</span></p>

        </form>
      </section >
    </div >
  )
}

export default SignUp