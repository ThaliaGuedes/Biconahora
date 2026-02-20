import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/app/context/AppContext';
import { LandingPage } from '@/app/pages/LandingPage';
import { AuthPage } from '@/app/pages/AuthPage';
import { FreelancerPage } from '@/app/pages/FreelancerPage';
import { EmployerPage } from '@/app/pages/EmployerPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/freelancer" element={<FreelancerPage />} />
          <Route path="/employer" element={<EmployerPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}