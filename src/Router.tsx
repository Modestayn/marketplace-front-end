import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default Router;
