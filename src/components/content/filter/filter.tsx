import { useDispatch, useSelector } from 'react-redux';

import { setSort } from '../../../store/slices/display-slice';
import { RootState } from '../../../store/store';
import { SortAsc } from '../../icons/sort-asc';
import { SortDesc } from '../../icons/sort-desc';

import './filter.scss';

export const Filter = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state: RootState) => state.display);

  const changeSort = () => {
    const newSort = sort === 'desc' ? 'asc' : 'desc';

    dispatch(setSort(newSort));
  };

  return (
    <button className='filter field' type='button' onClick={changeSort}>
      {sort === 'desc' ? <SortDesc /> : <SortAsc />}
      <span>По рейтингу</span>
    </button>
  );
};
