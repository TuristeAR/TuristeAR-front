import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import Destinations from './pages/Destinations';
import FormQuestions from './pages/FormQuestions';
import ExpectedPlace from './pages/ExpectedPlace';
import Publications from './pages/Publications';
import Forum from './pages/Forum';
import { Jobs } from './pages/Jobs';
import ExpectedDestination from './pages/ExpectedDestination';
import { Login } from './pages/Login';
import Profile from './pages/Profile';
import { ItineraryCalendar } from './pages/ItineraryCalendar';
import { ItineraryDetail } from './pages/ItineraryDetail';
import EditProfile from './pages/EditProfile';

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/formQuestions" element={<FormQuestions />} />
      <Route path="/lugar-esperado/:googleId" element={<ExpectedPlace />} />
      <Route path="/destino-esperado/:nombreDeLaProvincia" element={<ExpectedDestination />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/community" element={<Publications />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/itineraryCalendar/:itineraryId" element={<ItineraryCalendar />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/itineraryDetail/:itineraryId" element={<ItineraryDetail />} />
    </Routes>
  </BrowserRouter>,
);
