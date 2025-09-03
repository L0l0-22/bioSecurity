import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TeacherDash from './TeacherDashboard/TeacherDash';
import Dashboard from './TeacherDashboard/Dashboard/Dahboard';
import HorseSection from './TeacherDashboard/horse/HorseSection';
import Notifications from './TeacherDashboard/notification/Notification';
import CheckPoint from './TeacherDashboard/check/CheckPoint';
import Settings from './TeacherDashboard/settings/Settings';
import Profile from './TeacherDashboard/profile/Profile';

function App() {
  return (
    <div className="font-poppins">
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<TeacherDash />}>
          <Route index element={<Dashboard />} />         {/* / */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="horse" element={<HorseSection />} />
          <Route path="checkpoint" element={<CheckPoint />} />
          <Route path="alerts" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
