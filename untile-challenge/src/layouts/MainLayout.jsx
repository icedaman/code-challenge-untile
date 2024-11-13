import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <div className='w-full h-screen bg-[#F4F4F1]'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout;