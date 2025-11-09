
import './App.css'
import LandingPage from './pages/Home'
import AuthPage from './pages/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
    {/* <LandingPage/>
    <AuthPage/> */}
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
      
   
    </>
  )
}

export default App
