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
      data: [],
    },
  });

  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/products/mattresses'
          element={
            <ProductDisplay
              props={{
                category: 'Bedroom',
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
