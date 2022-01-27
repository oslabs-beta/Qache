import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Metric } from '../interfaces';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import ProductDisplay from './components/ProductDisplay';
import '../client/styles/Navigation.scss';
import moon from './images/p0.png';
import mountains from './images/p2.png';
import trees from './images/p3.png';

const App = () => {
  const [sidebar, setSidebar] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const hideSidebar = () => setSidebar(false);
  const [metrics, setMetrics] = useState<Metric>({
    Bedroom: {
      labels: [],
      data: [],
    },
    Mattresses: {
      labels: [],
      data: [],
    },
    Furniture: {
      labels: [],
      data: [],
    },
    Storage: {
      labels: [],
      data: [],
    },
    'Living Room': {
      labels: [],
      data: [],
    },
    Kitchen: {
      labels: [],
      data: [],
    },
    Bathroom: {
      labels: [],
      data: [],
    },
    Appliances: {
      labels: [],
      data: [],
    },
    Couches: {
      labels: [],
      data: [],
    },
  });

  return (
    <>
      <img className="layer1" src={moon} alt='Moon' />
      <img className="layer2" src={mountains} alt='Mountains' />
      <img className="layer3" src={trees} alt='Tree' /> 
      <div
        onClick={
          sidebar
            ? () => {
                console.log('clicked');
                hideSidebar();
              }
            : undefined
        }
        className={sidebar ? 'sidebar-overlay' : ''}
      />
      <Navigation
        props={{ refresh, setRefresh, sidebar, setSidebar, hideSidebar }}
      />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/products/couches'
          element={
            <ProductDisplay
              props={{
                category: 'Couches',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/products/mattresses'
          element={
            <ProductDisplay
              props={{
                category: 'Mattresses',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/rooms/bedroom'
          element={
            <ProductDisplay
              props={{
                category: 'Bedroom',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/products/furnitures'
          element={
            <ProductDisplay
              props={{
                category: 'Furniture',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/products/storage'
          element={
            <ProductDisplay
              props={{
                category: 'Storage',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/products/appliances'
          element={
            <ProductDisplay
              props={{
                category: 'Appliances',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/rooms/bathroom'
          element={
            <ProductDisplay
              props={{
                category: 'Bathroom',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/rooms/living-room'
          element={
            <ProductDisplay
              props={{
                category: 'Living Room',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route
          path='/rooms/kitchen'
          element={
            <ProductDisplay
              props={{
                category: 'Kitchen',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
