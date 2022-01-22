import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
