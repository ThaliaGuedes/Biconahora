import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/app/context/AppContext';
import { HomePage } from '@/app/pages/HomePage';
import { FreelancerPage } from '@/app/pages/FreelancerPage';
import { EmployerPage } from '@/app/pages/EmployerPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/freelancer" element={<FreelancerPage />} />
          <Route path="/employer" element={<EmployerPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
