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
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(LoadUser());
  }, [dispatch]);
  console.log(isAuthenticated)
  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home/> :<Login />} />
      </Routes>
    </Router>

  );
}

export default App;
