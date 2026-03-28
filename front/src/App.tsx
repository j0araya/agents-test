import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegionPage from './pages/RegionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/region/:slug" element={<RegionPage />} />
    </Routes>
  );
}

export default App;
