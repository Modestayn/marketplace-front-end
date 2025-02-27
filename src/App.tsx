import Navbar from './components/Navbar.tsx';
import { Outlet } from '@tanstack/react-router';

export const App = () => {
  return <>
      <Navbar />
      <Outlet />
    </>
}