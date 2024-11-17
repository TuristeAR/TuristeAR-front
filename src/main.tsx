import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import Destinations from './pages/Destinations';
import FormQuestions from './pages/FormQuestions';
import ExpectedPlace from './pages/ExpectedPlace';
import Publications from './pages/Publications';
import Forum from './pages/Forum';
import ExpectedDestination from './pages/ExpectedDestination';
import { Login } from './pages/Login';
import Profile from './pages/Profile';
import { ItineraryCalendar } from './pages/ItineraryCalendar';
import { ItineraryDetail } from './pages/ItineraryDetail';
import EditProfile from './pages/EditProfile';
import ForumDetail from './pages/ForumDetail';
import Places from './pages/Places';
import ItineraryChat from './pages/ItineraryChat';
import { ItineraryMap } from './pages/ItineraryMap';
import PublicationDetail from './pages/PublicationDetail';
import { SharedGallery } from './pages/SharedGallery';
import SharedExpenses from './pages/SharedExpenses';
import Notifications from './pages/Notifications';

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/destinos" element={<Destinations />} />
      <Route path="/crear-itinerario" element={<FormQuestions />} />
      <Route path="/lugar-esperado/:googleId" element={<ExpectedPlace />} />
      <Route path="/destino-esperado/:nombreDeLaProvincia" element={<ExpectedDestination />} />
      <Route path="/iniciar-sesion" element={<Login />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/editar-perfil" element={<EditProfile />} />
      <Route path="/comunidad" element={<Publications />} />
      <Route path="/notificaciones" element={<Notifications />} />
      <Route path="/publicaciones" element={<Publications />} />
      <Route path="/publicacion/:publicationId" element={<PublicationDetail />} />
      <Route path="/foro" element={<Forum />} />
      <Route path="/foro/:id" element={<ForumDetail />} />
      <Route path="/itinerario/calendario/:itineraryId" element={<ItineraryCalendar />} />
      <Route path="/itinerario/detalle/:itineraryId" element={<ItineraryDetail />} />
      <Route path="/itinerario/mapa/:itineraryId" element={<ItineraryMap />} />
      <Route path="/itinerario/chat/:itineraryId" element={<ItineraryChat />} />
      <Route path="/itinerario/galeria/:itineraryId" element={<SharedGallery />} />
      <Route path="/itinerario/gastos/:itineraryId" element={<SharedExpenses />} />
      <Route path="/lugares/:provinceName" element={<Places />} />
      <Route path="/lugares/:provinceName/:lat/:lon" element={<Places />} />
    </Routes>
  </BrowserRouter>,
);
