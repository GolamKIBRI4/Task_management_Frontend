export interface Todo {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

// src/store/hooks.ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
// Update the import path below if your store file is located elsewhere
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

