import { LoaderCircle } from '../icons/loader-circle';

import './loader.scss';

export const Loader = () => {
  return (
    <div className='loader' data-test-id='loader'>
      <LoaderCircle />
    </div>
  );
};
