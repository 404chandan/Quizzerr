import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { questionEndpoints } from '../services/APIs';
import Button from '../components/Button';
import CreateQuestionModal from '../components/core/createQuiz/CreateQuestionModal';
import QuestionCard from "../components/core/createQuiz/QuestionCard"
import { deleteQuestion } from '../services/operations/questionAPIs';
import { setQuiz, setEdit } from '../slices/QuizSlice';

const CreateQuestions = () => {

    const { quiz, edit } = useSelector(state => state.quiz);
    const { token } = useSelector(state => state.auth);

    const [questions, setQuestions] = useState([]);
    const [createQuestionModalData, setCreateQuestionModalData] = useState(null);
    const [laoding, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const finishHandler = () => {
        navigate("/dashboard/create-quiz")
        dispatch(setQuiz(null))
        dispatch(setEdit(false))
    }

    const deleteQuestionHandler = async (question) => {

        try {
            const response = await deleteQuestion(question._id, token)
            if (response) {
                setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== question._id))
            }
        } catch (e) {
            console.log("ERRO DELETING QUESTION : ", e);
        }
    }

    const fetchQuestions = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${id}`, null, {
                Authorization: `Bearer ${token}`
            })
            // console.log("response : ", response)
            if (response) {
                setQuestions(response?.data?.data);
            }
        } catch (error) {
            console.log("ERROR FETCHING QUIZ QUESTIONS : ", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (quiz === null) {
            navigate("/dashboard/create-quiz")
        }
    }, [])

    useEffect(() => {
        if (edit) {
            fetchQuestions();
        }
    }, [quiz, edit, id]);

    return (
        <>
            <div className=' relative flex justify-start flex-col items-center gap-5 py-10'>
                <div>
                    <h3 className='text-3xl underline text-center '>Add Questions</h3>
                </div>

                <section className='flex gap-y-3 w-full flex-col md:flex-row justify-between items-center'>
                    <div className='flex flex-col items-center md:items-start'>
                        <span className='flex gap-1 flex-col items-center md:items-start'>
                            <h2 className='text-2xl'>
                                {quiz?.title}
                            </h2>
                            <p>{quiz?.description}</p>
                        </span>
                    </div>
                    <Button
                        onClick={() => setCreateQuestionModalData({ ...quiz })}
                        className='w-max h-max'
                        active
                    >Create Question</Button>
                </section>
                <div className='w-full flex flex-col gap-5 rounded-lg min-h-[50vh]'>
                    {
                        !laoding && questions.length === 0 && (
                            <div className='w-full flex flex-col justify-center items-center text-lg gap-5 rounded-lg min-h-[50vh]'>No questions found</div>
                        )
                    }
                    {
                        !laoding && questions.length > 0 && (
                            questions.map((ques) => (
                                <QuestionCard
                                    deleteQuestionHandler={deleteQuestionHandler}
                                    key={ques?._id}
                                    question={ques}
                                    quiz={quiz}
                                    setCreateQuestionModalData={setCreateQuestionModalData}
                                    setQuestions={setQuestions}
                                />
                            ))
                        )
                    }
                </div>
                <div className='self-end w-full md:w-max' onClick={finishHandler}>
                    <Button active>Finish</Button>
                </div>
            </div>
            {
                createQuestionModalData && (
                    <CreateQuestionModal
                        quiz={createQuestionModalData}
                        setCreateQuestionModalData={setCreateQuestionModalData}
                        setQuestions={setQuestions}
                    />
                )
            }
        </>
    )
}

export default CreateQuestions