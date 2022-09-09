import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from './components/About';
import Alert from './components/Alert';
import DisplayNotes from './components/DisplayNotes';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';

function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    }
    else {
      setMode('light');
    }
  }

  const showAlert = (message, bgColor, textColor, msgType) => {
    setAlert({
      msg: message,
      bgColor: bgColor,
      textColor: textColor,
      msgType: msgType

    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <div className={`${mode === 'dark' ? 'bg-[#15202B] border-b border-gray-600' : 'bg-[#F9F9F9]'} min-h-screen pt-12 md:pt-16 pb-6`}>
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<DisplayNotes showAlert={showAlert} mode={mode}/>} />
              <Route exact path="/Notehub/" element={<DisplayNotes showAlert={showAlert} mode={mode}/>} />
              {/* <Route exact path="/about" element={<About />} /> */}
              <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup mode={mode} showAlert={showAlert} />} />
            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
