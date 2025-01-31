import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const QuizResults = () => {
    const location = useLocation();
    const { score, total } = location.state || { score: 0 };
    const navigate = useNavigate();

    return (
        <div className='min-h-[80vh] flex flex-col gap-5 justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-3xl border-b border-slate-600 pb-5'>Quiz Results</h1>
                <p className='text-2xl mt-4 flex items-center gap-3 font-thin'>Your Score: <span className='font-semibold'><span className={`${score / total >= 0.4 ? "text-green-500" : "text-red-700"} `}>{score}</span> / {total}</span> </p>
            </div>
            <Button className='w-max' onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    );
};

export default QuizResults;
