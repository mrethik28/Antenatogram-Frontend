import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/forgotPassword';
import Register from './pages/register';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import RequireAuth from './pages/requireAuth';
import PatientHistory from './pages/patientHistory';
import AllScansAndReports from './pages/allFiles';
import AllPatients from './pages/allPatients';
import UploadReport from './pages/uploadPage';
import AllAppointments from './pages/allAppointments';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />

        <Route path='' element={<RequireAuth allowedRoles={["patient", "doctor"]} />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='/history' element={<PatientHistory />} />
          <Route path='/files' element={<AllScansAndReports />} />
          <Route path='/appointments' element={<AllAppointments />} />
        </Route>

        <Route path='patients' element={<RequireAuth allowedRoles={["doctor"]} />}>
          <Route path='' element={<AllPatients />} />
        </Route>

        <Route path='/upload' element={<RequireAuth allowedRoles={["patient"]} />}>
          <Route path='' element={<UploadReport />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
