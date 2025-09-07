// importing all required things
import { useDispatch } from 'react-redux' //for authentication
import { useNavigate } from 'react-router-dom' // to navigate between routes
import React, { useState, useEffect } from 'react' //react hooks for life cycles and states
import { useForm } from 'react-hook-form' // simplifies form handling and validation
import Button from '../components/Button' // custom button
import RequiredError from '../components/RequiredError' //custom component
import { login } from '../services/operations/AuthAPIs' // API for login authentication logic
import HighLightText from '../components/HighLightText'// custom component
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb"; // to check visibility or hiding
import toast from 'react-hot-toast'

// writing login logic
const LogIn = () => {

  const [hidePassword, setHidePassword] = useState(true);//password visibility
  const [loading, setLoading] = useState(false);//spinner or loading component
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  //register = connect input fields with react react hook form
  //handleSubmit - wraps the form submit Handler (aage hain iska logic) 
  //errors - stores errors after validation or invalidation
  //setValue - setting form values
  const navigate = useNavigate(); // used to navigate to dashboard page after login
  const dispatch = useDispatch(); // sends action to redux, stores login info in global state
  //submit handler logic (actions taking place after clicking submit button)
  const submitHandler = async (data) => {
    //shows a loading toast when user clicks submit
    setLoading(true);
    const toastId = toast.loading("Loading...")
    try {
      //calls login function from upwards
      const response = await login(data, dispatch)
      if (response) {
      // if login valid redirect to dashboard
        navigate("/dashboard")
      }
    } catch (e) {
      //try to catch errors
      console.log("ERROR WHILE SINGING UP : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }
// frontend of login button
  return (
    <div className='min-h-screen flex items-center justify-center '>
      {/* centered login form */}
      <section>
        {/*heading */}
        <h1 className='text-center pb-5 text-4xl font-mono underline'>Quizzy </h1> 
        {/* form container */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-3 max-w-[480px] shadow-lg shadow-blue-300  border p-10 rounded-lg'
        >
          <div>
            <h3 className='text-4xl pb-5 text-center leading-[1.125]'>
              Log in to Your Account
            </h3>
          </div>
          {/* loading message */}
          {
            loading &&
            <span className='text-center text-red-500 text-sm'>
              When loaded for the first time, the server might take a minute or two to respond. Please be patient!
            </span>
          }
          {/* Email Field with validation */}
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
          {/* Password field with toggle visibility */}
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
            {/* Submit Button */}
          <span className='mt-5'>
            <Button disabled={loading} varient={"primary"} type={"submit"}>Submit</Button>
          </span>
            {/* Sign Up link */}
          <p className='text-center mt-3'>Don't have an account? <span onClick={() => navigate("/signup")} className=' cursor-pointer text-green-500'>Sign Up</span></p>

        </form>
      </section >
    </div >
  )
}

export default LogIn

// User Experience Flow

// Open login page → sees email & password fields.

// Types in details.

// Toggles password visibility (optional).

// Clicks Submit → button disabled + "Loading..." toast shown.

// If server is slow, message warns them it may take a while.

// If login works → auto redirect to dashboard.

// If login fails → stays on login page, error logged (could be shown with toast).