import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserRegister from './Pages/UserRegister';
import UserLogin from './Pages/UserLogin';

import UserHome from './Pages/UserHome';
import ProtectedUser from './Services/ProtectedUser';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/' element={<ProtectedUser><UserHome /></ProtectedUser>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
