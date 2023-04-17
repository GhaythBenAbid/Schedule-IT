import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import useUserStore from './store/User';
import { useNavigate } from 'react-router-dom';


function App() {
  const user = useUserStore(state => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>

    
    </BrowserRouter>
  )
}

export default App
