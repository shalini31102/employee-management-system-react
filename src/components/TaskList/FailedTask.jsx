import React, { createContext, useContext, useEffect, useState } from 'react';

const FailedTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-500 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='mt-6'>
                <button className='w-full bg-red-700 rounded font-medium py-2 px-2 text-sm cursor-not-allowed'>
                    ✗ Failed
                </button>
            </div>
        </div>
    );
};

export default FailedTask