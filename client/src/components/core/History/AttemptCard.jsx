import { useNavigate } from 'react-router-dom';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import Button from '../../Button';

const AttemptCard = ({ item }) => {

    const navigate = useNavigate();

    return (
        <div className='border border-slate-600 p-5 rounded-lg flex flex-col gap-3'>
            <span className=''>
                <h3 className='text-lg md:text-xl font-semibold line-clamp-2'>{item?.quizId?.title}</h3>
                <p className='text-xs md:text-base line-clamp-2 font-thin text-slate-200'>{item?.quizId?.description}</p>
                <span className='text-xs md-text-base text-end font-thin text-slate-300'>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
            </span>
            <span>
                <h3 className='flex items-center justify-center gap-3 text-base md:text-xl my-3'>Score <span className='text-xl md:text-3xl font-semibold'><span className={`${item?.score / item.answers.length >= 0.4 ? "text-green-500" : "text-red-700"} `}>{item?.score}</span> / {item?.answers?.length}</span></h3>
            </span>
            <Button onClick={() => navigate(`../../quiz/${item?.quizId?._id}`)}>Attempt Again</Button>
        </div>
    )
}

export default AttemptCard