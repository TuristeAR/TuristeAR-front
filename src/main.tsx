import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import Destinations from './pages/Destinations';
import FormQuestions from './pages/FormQuestions';
import ExpectedPlace from './pages/ExpectedPlace';
import Publications from './pages/Publications';
import Forum from './pages/Forum';
import Jobs from './pages/Jobs';
import ExpectedDestination from './pages/ExpectedDestination';
import { Login } from './pages/Login';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
<<<<<<< HEAD

=======
>>>>>>> c3eb6af43c9bde5b9ff97eee4f26933136ce443e

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/formQuestions" element={<FormQuestions />} />
      <Route path="/expectedPlace" element={<ExpectedPlace />} />
      <Route path="/expectedDestination" element={<ExpectedDestination />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
      <Route path="/community" element={<Profile />}/>
      <Route path="/publications" element={<Publications />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/forum" element={<Forum />}/>
      <Route path="/jobs" element={<Jobs />}/>
=======
      <Route path="/calendar" element={<Calendar />} />

>>>>>>> c3eb6af43c9bde5b9ff97eee4f26933136ce443e
    </Routes>
  </BrowserRouter>,
);
