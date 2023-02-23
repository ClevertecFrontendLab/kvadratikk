import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as SortAsc } from '../../../assets/icons/sort-asc.svg';
import { ReactComponent as SortDesc } from '../../../assets/icons/sort-desc.svg';
import { setSort } from '../../../store/slices/display-slice';
import { RootState } from '../../../store/store';

import './filter.scss';

export const Filter = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state: RootState) => state.display);

  const changeSort = () => {
    const newSort = sort === 'desc' ? 'asc' : 'desc';

    dispatch(setSort(newSort));
  };

  return (
    <button className='filter field' type='button' onClick={changeSort} data-test-id='sort-rating-button'>
      {sort === 'desc' ? <SortDesc /> : <SortAsc />}
      <span>По рейтингу</span>
    </button>
  );
};
