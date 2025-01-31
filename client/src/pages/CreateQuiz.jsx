import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button';
import RequiredError from '../components/RequiredError';
import toast from 'react-hot-toast';
import { createQuiz, updateQuiz } from '../services/operations/QuizAPIs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setEdit, setQuiz } from '../slices/QuizSlice';
import { IoMdArrowForward } from "react-icons/io";

const CreateQuiz = () => {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { edit, quiz } = useSelector((state) => state.quiz);
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id: quizId } = useParams()

  const submitHandler = async (data) => {
    setLoading(true);
    try {

      if (edit) {
        const response = await updateQuiz(data, token, quizId);
        if (response) {
          setValue("title", "")
          setValue("description", "")
          setValue("timer", "")
        }

        navigate("/dashboard/create-quiz/" + response._id)
        return
      }

      const response = await createQuiz(data, token);
      if (response) {
        setValue("title", "")
        setValue("description", "")
        setValue("timer", "")

        dispatch(setQuiz(response))
        navigate("/dashboard/create-quiz/" + response._id)
        toast.success("Quiz Created Successfully");
      } else {
        throw new Error("Quiz cannot be created at this moment")
      }
    } catch (e) {
      console.log(e);
      toast.error("Quiz cannot be created at this moment")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (edit && quiz) {
      setValue("title", quiz.title)
      setValue("description", quiz.description)
      setValue("timer", quiz.timer)
    }

    if (location.pathname === "/dashboard/create-quiz" && edit) {
      dispatch(setEdit(false))
      dispatch(setQuiz(null))
      reset();
    }

  }, [edit, quiz, setValue, location.pathname])

  return (
    <div className='min-h-[70vh] flex justify-center flex-col items-center gap-10'>
      <h3 className='text-3xl underline text-center'>Create Quiz</h3>
      <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-[480px] border mx-auto py-10 flex flex-col gap-5 p-10 rounded-lg shadow-lg shadow-blue-400'>
        <span className='flex flex-col gap-2'>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder='Enter Title'
            id='title'
            className='py-1 text-base  placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
            {
            ...register("title", {
              required: "Title is required",
            })
            }
          />
          {
            errors.title && <RequiredError>{errors.title.message}</RequiredError>
          }
        </span>
        <span className='flex flex-col gap-2'>
          <label htmlFor="description">Description</label>
          <textarea
            placeholder='Enter Description'
            type="text"
            rows={4}
            id='description'
            className='py-1 text-base resize-none placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
            {
            ...register("description")
            }
          ></textarea>
          {
            errors.description && <RequiredError>{errors.description.message}</RequiredError>
          }
        </span>
        <span className='flex flex-col gap-2'>
          <label htmlFor="timer">Time (minutes)</label>
          <input
            type="number"
            placeholder='5.00'
            id='timer'
            min={5}
            max={60}
            {
            ...register("timer", { required: "Time is required" })
            }
            className='py-1 text-base  placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl'
          />
        </span>
        {
          errors.timer && <RequiredError>{errors.timer.message}</RequiredError>
        }
        <span>
          <Button disabled={loading} type='submit'>{edit ? "Update" : "Create"}</Button>
        </span>
        {
          edit && (
            <button
              type='button'
              className='flex items-center gap-3 justify-center'
              onClick={() => navigate("/dashboard/create-quiz/" + quiz._id)}
            >
              skip < IoMdArrowForward />
            </button>
          )
        }
      </form>

    </div >
  )
}

export default CreateQuiz