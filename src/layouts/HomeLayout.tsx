import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch } from '../types/interfaces';

export default function HomeLayout() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();

  return (
    <>
      <div>HomeLayout</div>
      <button
        onClick={() => {
          dispatch(logout());
          navigate('/');          // ⬅ back to login screen
        }}
      >
        Logout
      </button>
    </>
  );
}
