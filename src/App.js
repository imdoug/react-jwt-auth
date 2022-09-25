import { 
  Dashboard, 
  Login, 
  SignUp
 } from './screens'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      <div>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
