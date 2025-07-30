import { Outlet } from 'react-router-dom';
import UppperHome from '../components/UppperHome';

export default function HomeLayout() {
  

  return (
    <>
      <UppperHome/>

      <Outlet/>
      
    </>
  );
}
