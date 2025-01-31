import React, { useEffect, useState } from 'react'
import { quizEndpoints } from '../../../services/APIs'
import { apiConnector } from '../../../services/apiConnector'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'

const Score = ({ quiz }) => {

    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await apiConnector("GET", `${quizEndpoints.GET_SCORES}/${quiz._id}`, null, {
                    Authorization: `Bearer ${token}`
                })
                // console.log("res : ", response)
                setScores(response?.data?.data)
            } catch (error) {
                console.log("error : ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchScores()
    }, [])

    return (
        <div className='bg-slate-900 z-[2] w-full rounded-lg py-5 flex flex-col gap-1 text-xl'>
            {
                loading ? (
                    <div className='text-center'>Loading...</div>
                ) : !loading && scores.length > 0 ? (
                    <div className=' border rounded-lg border-slate-600 overflow-hidden'>
                        <h3 className='px-3 text-2xl bg-slate-600 py-2 text-center'>Results</h3>
                        <div className='flex justify-between px-5 py-3'>
                            <p className='text-green-600'>Username</p>
                            <p className='text-green-600'>Score</p>
                        </div>
                        {
                            [...scores].reverse().map((score, index) => (
                                <div className='flex justify-between items-center py-3 border-t border-slate-600 px-5' key={index}>
                                    <span className='flex flex-col md:flex-row gap-1 items-center'>
                                        <p className='text-sm md:text-lg'>{score?.userId?.username}</p>
                                        <p className='text-xs md:text-sm text-slate-300'>
                                            - {formatDistanceToNow(new Date(score.createdAt), { addSuffix: true })}
                                        </p>
                                    </span>
                                    <p>
                                        <span className={`${score?.score / score.answers.length >= 0.4 ? "text-green-500" : "text-red-700"}`}>
                                            {score?.score}
                                        </span> / {score.answers.length}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <p className='text-center'>No scores found</p>
                )
            }
        </div>
    )
}

export default Score