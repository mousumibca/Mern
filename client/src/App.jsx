import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import './App.css';
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/contact/Contact";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Logout } from "./pages/Logout";
import {Navbar} from "./components/Navbar";


const App=()=> {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
      </Routes>
    </Router>
  );
};

export default App
