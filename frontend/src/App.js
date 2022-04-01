import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./components/login/login";
import { LoadUser } from './components/Actions/User';
import Home from "./components/Home/Home"

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(LoadUser());
  }, []);
  const {isAuthenticated}=useSelector((state)=>state.user);
  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;
