
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from './componets/Login';
import Home from './componets/Home';
import Register from './componets/Register';
import Favourateitems from './componets/Favourateitems';


function App() {
  
  return (
    <Router>
    <div >
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/favraoute" element={<Favourateitems/>}/>
       
      </Routes>
    </div>
    </Router>
  );
}

export default App;
