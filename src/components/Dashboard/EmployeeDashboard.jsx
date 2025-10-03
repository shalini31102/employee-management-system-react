import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from '../others/Header'
import TaskListNumbers from '../others/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/Authprovider'

const EmployeeDashboard = ({ changeUser, data, showToast }) => {
    const [userData, setUserData] = useContext(AuthContext);
    const [employeeData, setEmployeeData] = useState(data);

    const handleUpdateTask = (taskIndex, updates, fromStatus, toStatus) => {
        const updatedTasks = employeeData.tasks.map((task, idx) => 
            idx === taskIndex ? { ...task, ...updates } : task
        );

        const updatedEmployee = {
            ...employeeData,
            tasks: updatedTasks,
            taskCounts: {
                ...employeeData.taskCounts,
                [fromStatus]: employeeData.taskCounts[fromStatus] - 1,
                [toStatus]: employeeData.taskCounts[toStatus] + 1
            }
        };

        setEmployeeData(updatedEmployee);

        const updatedUserData = userData.map(emp =>
            emp.id === employeeData.id ? updatedEmployee : emp
        );
        setUserData(updatedUserData);

        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        localStorage.setItem('loggedInUser', JSON.stringify({
            ...loggedInUser,
            data: updatedEmployee
        }));

        showToast('Task status updated successfully!', 'success');
    };

    return (
        <div className='p-10 bg-[#1c1c1c] min-h-screen'>
            <Header changeUser={changeUser} data={employeeData} />
            <TaskListNumbers data={employeeData} />
            <TaskList data={employeeData} onUpdateTask={handleUpdateTask} />
        </div>
    );
};

export default EmployeeDashboard