import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./components/userLogin";
import UserRegister from "./components/UserRegister";
import PrivateRoute from "./components/PrivateRoute";
import ManagerDashboard from "./components/MangerDashboard";
import AssociateDashboard from "./components/AssociateDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute roles={['manager']} />}>
          <Route path="/manager" element={<ManagerDashboard />} />
        </Route>

        <Route element={<PrivateRoute roles={['associate']} />}>
          <Route path="/associate" element={<AssociateDashboard />} />
        </Route>

        {/* Catch-all route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
