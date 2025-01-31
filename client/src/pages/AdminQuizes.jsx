import React, { useEffect, useState } from 'react'
import { apiConnector } from "../services/apiConnector"
import { quizEndpoints } from '../services/APIs';
import { useSelector } from "react-redux"
import QuizCard from '../components/core/AdminQuizes/QuizCard';
import { deleteQuiz } from '../services/operations/QuizAPIs';

const AdminQuizes = () => {

    const [quizes, setQuizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector(state => state.auth);

    const handleDeleteQuiz = async (id) => {
        try {
            setLoading(true);

            const response = await deleteQuiz(id, token)
            if (response) {
                setQuizes(quizes.filter(quiz => quiz._id !== id));
            }

        } catch (e) {
            console.log("ERROR DELETING QUIZ : ", e);
        } finally {
            setLoading(false);
        }
    }

    const fetchAdminQuizes = async () => {
        try {
            const response = await apiConnector("GET", quizEndpoints.GET_ADMIN_QUIZES, null, {
                Authorization: `Bearer ${token}`
            })

            setQuizes(response?.data?.data);
        } catch (error) {
            console.error('Error fetching admin quizes:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAdminQuizes();
    }, [])

    return (
        <section>
            <div className='flex flex-col gap-3'>
                {
                    loading ? (
                        <div className='flex justify-center items-center min-h-[90vh]'>Loading...</div>
                    ) :
                        !loading && quizes.length > 0 ? (
                            quizes.map((quiz, index) => (
                                <QuizCard handleDeleteQuiz={handleDeleteQuiz} key={quiz._id} quiz={quiz} index={index} />
                            ))
                        ) : (
                            <div className='flex justify-center items-center min-h-[90vh]'>No quizes found</div>
                        )
                    }
                    
            </div>
        </section>
    )
}

export default AdminQuizes