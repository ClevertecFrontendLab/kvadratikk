import { ReactComponent as LoaderCircle } from '../../assets/icons/loader-circle.svg';

import './loader.scss';

export const Loader = () => {
  return (
    <div className='loader' data-test-id='loader'>
      <LoaderCircle />
    </div>
  );
};
