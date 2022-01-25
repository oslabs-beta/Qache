import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Metric } from '../interfaces';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import ProductDisplay from './components/ProductDisplay';

const App = () => {
  const [metrics, setMetrics] = useState<Metric>({
    Bedroom: {
      labels: [],
      data: []
    },
    Mattresses: {
      labels: [],
      data: []
    },
    Furniture: {
      labels: [],
      data: []
    },
    Storage: {
      labels: [],
      data: []
    },
    "Living Room": {
      labels: [],
      data: []
    },
    Kitchen: {
      labels: [],
      data: []
    },
    Bathroom: {
      labels: [],
      data: []
    },
    Appliances: {
      labels: [],
      data: []
    },
    Couches: {
      labels: [],
      data: []
    }
  });

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/products/couches'
          element={
            <ProductDisplay
              props={{
                category: "Couches",
                setMetrics,
                metrics,
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
              }}
            />
          }
        />
        <Route
          path='/rooms/bedroom'
          element={
            <ProductDisplay
              props={{
                category: "Bedroom",
                setMetrics,
                metrics,
              }}
            />
          }
        />
        <Route
          path='/products/furnitures'
          element={
            <ProductDisplay
              props={{
                category: "Furniture",
                setMetrics,
                metrics,
              }}
            />
          }
        />
        <Route
          path='/products/storage'
          element={
            <ProductDisplay
              props={{
                category: "Storage",
                setMetrics,
                metrics,
              }}
            />
          }
        />
        <Route
          path='/products/appliances'
          element={
            <ProductDisplay
              props={{
                category: "Appliances",
                setMetrics,
                metrics,
              }}
            />
          }
        />
        <Route
          path='/rooms/bathroom'
          element={
            <ProductDisplay
              props={{
                category: "Bathroom",
                setMetrics,
                metrics,
              }}
            />
          }
        />
        <Route
          path='/rooms/living-room'
          element={
            <ProductDisplay
              props={{
                category: "Living Room",
                setMetrics,
                metrics,
              }}
            />
          }
        />
        <Route
          path='/rooms/kitchen'
          element={
            <ProductDisplay
              props={{
                category: "Kitchen",
                setMetrics,
                metrics,
              }}
            />
          }
        />
      </Routes>
    </>
  );
};
// bedroom category : [ mem foam bed, spring bed, pillow, blanket, desk, nightstand]
// mattresses category : [ mem foam bed, spring bed]
// mem foam bed product: category: [ bedroomid, mattressesid ]
export default App;
