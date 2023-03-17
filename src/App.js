import './App.css';
import Homes from './pages/Homes';
import Login from './pages/Loginc';
import Register from './pages/Register';
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Homes />
              </ProtectedRoute>} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
