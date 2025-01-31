import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from '../services/APIs'
import toast from 'react-hot-toast'
import AttemptCard from '../components/core/History/AttemptCard'

const History = () => {

  const [loading, setLoading] = useState(true)
  const [attempt, setAttempts] = useState([])
  const { token } = useSelector(state => state.auth)

  const fetchUserAttempts = async () => {
    setLoading(true)
    try {
      const response = await apiConnector("GET", quizEndpoints.GET_USER_ATTEMPS, null, {
        Authorization: `Bearer ${token}`
      })

      console.log("response : ", response)
      if (!response.data.success) {
        throw new Error(response.data.error)
      }

      setAttempts(response?.data?.data)

    } catch (e) {
      console.log("Failed to get User Attempts")
      toast.success("Failed to get User Attempts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserAttempts();
  }, [])

  return (
    <section className='py-5 px-3 md:p-10 min-h-[calc(100vh-10rem)] bg-slate-900 border-slate-600 border rounded-lg flex flex-col gap-y-5 items-start justify-start'>
      {
        loading ? (
          <div className='text-xl md:text-2xl min-h-[70vh] w-full flex items-center justify-center'>Loading...</div>
        ) : (
          <div className='w-full h-full flex flex-col gap-5'>
            <h1 className='text-2xl md:text-4xl text-white font-semibold'>Your Attempts</h1>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
              {
                attempt.map((item, index) => (
                  <AttemptCard key={item._id} item={item} index={index} />
                ))
              }
            </div>
          </div>
        )
      }
    </section>
  )
}

export default History