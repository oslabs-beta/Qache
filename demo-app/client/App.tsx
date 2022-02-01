import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Metric } from '../interfaces';
import Navigation from './components/demo-app/Navigation';
import LandingPage from './components/demo-app/LandingPage';
import ProductDisplay from './components/demo-app/ProductDisplay';
import '../client/styles/demo-styles/Navigation.scss';
import Navbar from './components/home/Navbar';
import Introduction from './components/home/Introduction';
import Cart from './components/demo-app/Cart'

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
    Deals: {
      labels: [],
      data: [],
    },
  });

  return (
    <>
    {/* <Navbar />
    <Routes>
      <Route path='/' element={<Introduction />} />
    </Routes>
    </>) */}
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
        <Route
          path='/deals'
          element={
            <ProductDisplay
              props={{
                category: 'Deals',
                setMetrics,
                metrics,
                refresh,
              }}
            />
          }
        />
        <Route path='/cart' element={<Cart props={{}}/>}/>
      </Routes>
    </>
  );
};

export default App;
