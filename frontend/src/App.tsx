
import './App.css'
import { Dashboard } from './pages/dashboard'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { BrowserRouter,Routes,Route } from "react-router-dom"

function App() {
  return <BrowserRouter>
    <Routes>
        <Route path="/signup" element= {<Signup/>} />
        <Route path="/signin" element= {<Signin/>} />
        <Route path="/dashboard" element= {<Dashboard/>} />
    </Routes>
  </BrowserRouter>
}

export default App
