import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import DemoApp from './components/demo-app/DemoApp';
import Docs from './components/home/Docs'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/docs' element={<Docs />} />
        <Route path='/demo-app/*' element={<DemoApp />} />
      </Routes>
    </>
  );
};

export default App;
