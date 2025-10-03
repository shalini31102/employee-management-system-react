import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Authprovider'

const CreateTask = ({ showToast }) => {
    const [userData, setUserData] = useContext(AuthContext);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!taskTitle.trim()) newErrors.taskTitle = 'Title is required';
        if (!taskDescription.trim()) newErrors.taskDescription = 'Description is required';
        if (!taskDate) newErrors.taskDate = 'Date is required';
        if (!assignTo) newErrors.assignTo = 'Please select an employee';
        if (!category.trim()) newErrors.category = 'Category is required';
        return newErrors;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const taskObj = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            active: false,
            newTask: true,
            failed: false,
            completed: false,
        };

        const data = userData.map(elem => {
            if (assignTo === elem.firstName) {
                return {
                    ...elem,
                    tasks: [...elem.tasks, taskObj],
                    taskCounts: {
                        ...elem.taskCounts,
                        newTask: elem.taskCounts.newTask + 1
                    }
                };
            }
            return elem;
        });

        setUserData(data);
        showToast('Task created successfully!', 'success');

        // Clear form
        setTaskTitle('');
        setCategory('');
        setAssignTo('');
        setTaskDate('');
        setTaskDescription('');
        setErrors({});
    };

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <h2 className='text-2xl font-semibold mb-4 text-emerald-500'>Create New Task</h2>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title *</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className={`text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] ${errors.taskTitle ? 'border-red-500' : 'border-gray-400'} mb-1`}
                            type="text"
                            placeholder='Make a UI design'
                        />
                        {errors.taskTitle && <p className='text-red-500 text-xs mb-2'>{errors.taskTitle}</p>}
                    </div>
                    <div className='mt-3'>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date *</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className={`text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] ${errors.taskDate ? 'border-red-500' : 'border-gray-400'} mb-1`}
                            type="date"
                        />
                        {errors.taskDate && <p className='text-red-500 text-xs mb-2'>{errors.taskDate}</p>}
                    </div>
                    <div className='mt-3'>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign to *</h3>
                        <select
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            className={`text-sm py-1 px-2 w-4/5 rounded outline-none bg-gray-800 border-[1px] ${errors.assignTo ? 'border-red-500' : 'border-gray-400'} mb-1`}
                        >
                            <option value="">Select Employee</option>
                            {userData.map((emp) => (
                                <option key={emp.id} value={emp.firstName}>
                                    {emp.firstName}
                                </option>
                            ))}
                        </select>
                        {errors.assignTo && <p className='text-red-500 text-xs mb-2'>{errors.assignTo}</p>}
                    </div>
                    <div className='mt-3'>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category *</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] ${errors.category ? 'border-red-500' : 'border-gray-400'} mb-1`}
                            type="text"
                            placeholder='design, dev, etc'
                        />
                        {errors.category && <p className='text-red-500 text-xs mb-2'>{errors.category}</p>}
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description *</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className={`w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] ${errors.taskDescription ? 'border-red-500' : 'border-gray-400'} mb-1`}
                    />
                    {errors.taskDescription && <p className='text-red-500 text-xs mb-2'>{errors.taskDescription}</p>}
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full transition-colors'>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask