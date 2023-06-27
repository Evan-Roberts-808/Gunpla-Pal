import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css";
import './stylesheets/styles.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/pages/Home.jsx'
import Database from './components/pages/Database.jsx'
import DatabaseByGrade from './components/pages/DatabaseByGrade.jsx'
import SignIn from './components/pages/SignIn.jsx'
import SignUp from './components/pages/SignUp.jsx'
import Profile from './components/pages/Profile.jsx'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`App ${darkMode ? 'DarkMode' : 'LightMode'}`}>
    <Router>
    <Header darkMode={darkMode} updateDarkMode={() => setDarkMode((prev) => !prev)}/>
      <Routes>
        <Route path='/' index element={<Home />}/>
        <Route path='/database' element={<Database />}/>
        <Route path='/database/:grade' element={<DatabaseByGrade />}/>
        <Route path ='/profile' element = {<Profile/>} />
        <Route path = '/login' element = {<SignIn />}/>
        <Route path = '/signUp' element = {<SignUp />}/>
      </Routes>
      <Footer />
    </Router>
    </div>
  )
}

export default App
