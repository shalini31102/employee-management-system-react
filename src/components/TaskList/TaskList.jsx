import React, { createContext, useContext, useEffect, useState } from 'react';
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, onUpdateTask }) => {
    const handleAccept = (taskIndex) => {
        onUpdateTask(taskIndex, { newTask: false, active: true }, 'newTask', 'active');
    };

    const handleComplete = (taskIndex) => {
        onUpdateTask(taskIndex, { active: false, completed: true }, 'active', 'completed');
    };

    const handleFail = (taskIndex) => {
        if (window.confirm('Are you sure you want to mark this task as failed?')) {
            onUpdateTask(taskIndex, { active: false, failed: true }, 'active', 'failed');
        }
    };

    return (
        <div className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                if (elem.newTask) {
                    return <NewTask key={idx} data={elem} onAccept={() => handleAccept(idx)} />;
                }
                if (elem.active) {
                    return <AcceptTask key={idx} data={elem} onComplete={() => handleComplete(idx)} onFail={() => handleFail(idx)} />;
                }
                if (elem.completed) {
                    return <CompleteTask key={idx} data={elem} />;
                }
                if (elem.failed) {
                    return <FailedTask key={idx} data={elem} />;
                }
                return null;
            })}
        </div>
    );
};


export default TaskList