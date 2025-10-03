import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Authprovider'

const AllTask = () => {
    const [userData] = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = userData.filter(emp =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold text-emerald-500'>All Employees</h2>
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='bg-gray-800 border border-gray-600 rounded px-4 py-2 text-sm outline-none focus:border-emerald-500'
                />
            </div>
            <div className='bg-emerald-600 mb-2 py-2 px-4 flex justify-between rounded'>
                <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
                <h3 className='text-lg font-medium w-1/5'>New Task</h3>
                <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
                <h5 className='text-lg font-medium w-1/5'>Completed</h5>
                <h5 className='text-lg font-medium w-1/5'>Failed</h5>
            </div>
            <div className='max-h-[400px] overflow-y-auto'>
                {filteredEmployees.map((elem, idx) => (
                    <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded hover:bg-gray-800 transition-colors'>
                        <h2 className='text-lg font-medium w-1/5'>{elem.firstName}</h2>
                        <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
                        <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
                        <h5 className='text-lg font-medium w-1/5 text-green-400'>{elem.taskCounts.completed}</h5>
                        <h5 className='text-lg font-medium w-1/5 text-red-400'>{elem.taskCounts.failed}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTask