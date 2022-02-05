import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import DemoApp from './components/demo-app/DemoApp';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/demo-app/*' element={<DemoApp />} />
      </Routes>
    </>
  );
};

export default App;
