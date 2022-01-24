import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import ProductDisplay from './components/ProductDisplay';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/mattresses' element={<ProductDisplay/>} />
      </Routes>
    </>
  );
};

export default App;
