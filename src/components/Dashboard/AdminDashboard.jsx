import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from '../others/Header'
import CreateTask from '../others/CreateTask'
import AllTask from '../others/AllTask'

const AdminDashboard = ({ changeUser, showToast }) => {
    return (
        <div className='h-screen w-full p-7 overflow-y-auto bg-gray-900'>
            <Header changeUser={changeUser} />
            <CreateTask showToast={showToast} />
            <AllTask />
        </div>
    );
};


export default AdminDashboard