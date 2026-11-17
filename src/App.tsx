import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { DemoProvider } from './store/demoStore';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HolisticPage } from './pages/HolisticPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { PatientComfortPage } from './pages/PatientComfortPage';
import { VirtualConsultationsPage } from './pages/VirtualConsultationsPage';
import { PatientResourcesPage } from './pages/PatientResourcesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminCalendarPage } from './pages/admin/AdminCalendarPage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { AdminRequestDetailPage } from './pages/admin/AdminRequestDetailPage';
import { AdminFollowUpsPage } from './pages/admin/AdminFollowUpsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const PublicShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <Routes>
            {/* Public Clinic Website */}
            <Route path="/" element={<PublicShell><HomePage /></PublicShell>} />
            <Route path="/about" element={<PublicShell><AboutPage /></PublicShell>} />
            <Route path="/holistic-dentistry" element={<PublicShell><HolisticPage /></PublicShell>} />
            <Route path="/services" element={<PublicShell><ServicesPage /></PublicShell>} />
            <Route path="/services/:slug" element={<PublicShell><ServiceDetailPage /></PublicShell>} />
            <Route path="/technology" element={<PublicShell><TechnologyPage /></PublicShell>} />
            <Route path="/patient-comfort" element={<PublicShell><PatientComfortPage /></PublicShell>} />
            <Route path="/virtual-consultations" element={<PublicShell><VirtualConsultationsPage /></PublicShell>} />
            <Route path="/patient-resources" element={<PublicShell><PatientResourcesPage /></PublicShell>} />
            <Route path="/testimonials" element={<PublicShell><TestimonialsPage /></PublicShell>} />
            <Route path="/appointments" element={<PublicShell><AppointmentsPage /></PublicShell>} />
            <Route path="/contact" element={<PublicShell><ContactPage /></PublicShell>} />

            {/* Staff Appointment Management Demo */}
            <Route path="/staff-demo" element={<AdminOverviewPage />} />
            <Route path="/staff-demo/calendar" element={<AdminCalendarPage />} />
            <Route path="/staff-demo/requests" element={<AdminRequestsPage />} />
            <Route path="/staff-demo/requests/:id" element={<AdminRequestDetailPage />} />
            <Route path="/staff-demo/follow-ups" element={<AdminFollowUpsPage />} />
            <Route path="/staff-demo/activity" element={<AdminActivityPage />} />
            <Route path="/staff-demo/settings" element={<AdminSettingsPage />} />

            {/* 404 */}
            <Route path="*" element={<PublicShell><NotFoundPage /></PublicShell>} />
          </Routes>
        </BrowserRouter>
      </DemoProvider>
    </MotionConfig>
  );
}
