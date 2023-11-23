import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import LeaveManagementPage from './pages/LeaveManagementPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Hierarchy from './pages/HierarchyPage'
import LoginForm from './pages/LoginPage'
import RegisterForm from './pages/RegisterForm'
import VerifyUser from './pages/VerifyUser'
import axios from 'axios'
import UserProtectedRoute from './components/ProtectedRoutes/UserProtectedRoute'
import NewsPage from './pages/NewsPage';





function App() {
  const [user,setUser] = useState({})

  async function getuser(){
    const user =  await axios.get(`http://localhost:3333/show-user`,{
        withCredentials:true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    })
    setUser(()=> user.data.user )
}

  useEffect(()=>{
    axios.get(`http://localhost:3333/show-user`,{
      withCredentials:true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    }).then((res)=>{
      setUser(res.data.user)
    })  
  },[])

  return (
    <div className="App">
      
      <Router>
        <Routes>
        <Route element={<UserProtectedRoute />}>
          <Route exact path='/'  element = {<HomePage user = {user} getuser ={getuser}  />}/>
          <Route exact path='/leave-management'  element = {<LeaveManagementPage user = {user} getuser ={getuser} />}/>
          <Route exact path='/hierarchy'  element = {<Hierarchy  user = {user} getuser ={getuser} />}/>
          <Route exact path='/news'  element = {<NewsPage user={user} />}/>
        </Route>
      
        <Route exact path='/login'  element = {<LoginForm  />}/>
        <Route exact path='/register'  element = {<RegisterForm  />}/>
        
        
        <Route exact path="/users/:id/verify/:token" element={<VerifyUser />} />

        </Routes>
      </Router>
     
    </div>
  )
}

export default App
