import React, { createContext, useContext, useEffect, useState } from 'react';

const NewTask = ({ data, onAccept }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-500 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-blue-700 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='mt-6'>
                <button
                    onClick={onAccept}
                    className='w-full bg-green-500 hover:bg-green-600 rounded font-medium py-2 px-2 text-sm transition-colors'
                >
                    Accept Task
                </button>
            </div>
        </div>
    );
};

export default NewTask