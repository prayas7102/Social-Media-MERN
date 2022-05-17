import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./Components/Login/Login";
import { LoadUser } from './Actions/User';
import Home from "./Components/Home/Home"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadUser());
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      { <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;
