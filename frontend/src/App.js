import Home from './HomePage/Home.js';
// import ProtectedRoute from './ProtectedRoutes.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './components/useLoading.js';
import { AlertProvider } from './components/AlertError.js';
import Login from './auth/Login/Login.js';
import Register from './auth/Register/Register.js';
import Dashboard from './Dashboard/Dashboard.js';
import ProtectedRoute from './ProtectedRoute.js';

const App = () => {
  return (
    <div>
      <AlertProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard/:process"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
