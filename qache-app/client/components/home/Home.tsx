import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Introduction from './Introduction';

const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Introduction />} />
      </Routes>
    </>
  )
};

export default Home;