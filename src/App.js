import { 
  Dashboard, 
  Login, 
  SignUp
 } from './screens'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoutes from './screens/ProtectedRoutes';
function App() {
  return (
    <Router>
    <div className="App" >
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route element={<ProtectedRoutes/>} >
            <Route path='/' element={<Dashboard/>} />
          </Route>
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
