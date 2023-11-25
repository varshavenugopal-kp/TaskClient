import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserRegister from './Pages/UserRegister';
import UserLogin from './Pages/UserLogin';
import Dashboard from './Pages/Dashboard';
import UserHome from './Pages/UserHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/' element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
