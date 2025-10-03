import React, { createContext, useContext, useEffect, useState } from 'react';

const AcceptTask = ({ data, onComplete, onFail }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-yellow-500 rounded-xl shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-yellow-700 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='flex justify-between mt-6 gap-2'>
                <button
                    onClick={onComplete}
                    className='flex-1 bg-green-500 hover:bg-green-600 rounded font-medium py-1 px-2 text-xs transition-colors'
                >
                    Complete
                </button>
                <button
                    onClick={onFail}
                    className='flex-1 bg-red-500 hover:bg-red-600 rounded font-medium py-1 px-2 text-xs transition-colors'
                >
                    Failed
                </button>
            </div>
        </div>
    );
};

export default AcceptTask