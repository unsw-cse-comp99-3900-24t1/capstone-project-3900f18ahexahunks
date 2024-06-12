import Home from './HomePage/Home.js';
import ProtectedRoute from './ProtectedRoute.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './components/useLoading.js';
import { AlertProvider } from './components/AlertError.js';

const App = () => {
  return (
    <div>
      <AlertProvider>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* Example protected route */}
              {/* <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> */}
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
