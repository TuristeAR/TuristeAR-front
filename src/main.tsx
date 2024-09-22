import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import Destinations from './pages/Destinations';
import FormQuestions from './pages/FormQuestions';
import ExpectedPlace from './pages/ExpectedPlace';
import Publications from './pages/Publications';
import Profile from './pages/Profile';
import Forum from './pages/Forum';
import Jobs from './pages/Jobs';

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/formQuestions" element={<FormQuestions />} />
      <Route path="/expectedPlace" element={<ExpectedPlace />} />
      <Route path="/community" element={<Profile />}/>
      <Route path="/publications" element={<Publications />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/forum" element={<Forum />}/>
      <Route path="/jobs" element={<Jobs />}/>
    </Routes>
  </BrowserRouter>,
);
