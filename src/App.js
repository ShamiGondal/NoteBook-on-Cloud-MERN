import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from '../src/context/notes/noteState';
import Alert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
<NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
        <Route exact path='/About' element={<About/>}></Route>
        <Route excat path='/Contact' element={<Contact/>}></Route>
        <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
        <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
        
      </Routes>
      </div>
    </BrowserRouter>
</NoteState>
  );
}

export default App;
