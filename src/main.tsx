import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home';
import Destinations from './pages/Destinations';
import FormQuestions from './pages/FormQuestions';
import ExpectedPlace from './pages/ExpectedPlace';
import ExpectedDestination from './pages/ExpectedDestination';

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
    </Routes>
  </BrowserRouter>,
);
