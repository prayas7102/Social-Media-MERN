import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from "./components/header/Header.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
    </Router>

  );
}

export default App;
