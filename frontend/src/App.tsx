import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

const App = () => (
  <Routes>
    <Route
      path="/"
      element={<Home />}
    />
    <Route
      path="/:title"
      element={<Home />}
    />
  </Routes>
);

export default App;
