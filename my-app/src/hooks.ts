import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch: () => AppDispatch = useDispatch;

export const convertTemp = (temp: number) => {
  return Math.round(temp - 273.15);
};