import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type * as store from '../store/store';
import type { JSX } from 'react';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useSelector((s: store.RootState) => s.auth.token);
  const loc   = useLocation();

  return token ? children : <Navigate to="/" state={{ from: loc }} replace />;
}
