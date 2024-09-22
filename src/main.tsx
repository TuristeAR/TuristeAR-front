import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import Destinations from './pages/Destinations';
import FormQuestions from './pages/FormQuestions';
<<<<<<< HEAD
import ExpectedPlace from './pages/ExpectedPlace';
=======
import Profile from './pages/Profile';
>>>>>>> 1c7cead (Add Profile page and update LandingHero button layout)

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/formQuestions" element={<FormQuestions />} />
<<<<<<< HEAD
      <Route path="/expectedPlace" element={<ExpectedPlace />} />
=======
      <Route path="/profile" element={<Profile />} />
>>>>>>> 1c7cead (Add Profile page and update LandingHero button layout)
    </Routes>
  </BrowserRouter>,
);
