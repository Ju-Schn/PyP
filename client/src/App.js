import Upload from './pages/Upload';
import Gallery from './pages/Gallery';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
