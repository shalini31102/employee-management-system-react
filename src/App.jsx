import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/Authprovider.jsx';
import Toast from './components/others/Toast'



function App() {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData] = useContext(AuthContext)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }
  }, [])

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return true
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && password === e.password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
        return true
      }
    }
    return false
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard changeUser={setUser} showToast={showToast} />
      ) : (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} showToast={showToast} />
      )}
    </div>
  )
}

export default App

// When the user submits the login form:
// submitHandler calls handleLogin(email, password).
// That runs the function defined in App.jsx.
//This is called "lifting state up":
//The login data flows from child → parent via the function.
//Then the parent (App) decides whether the user is admin, employee, or invalid.