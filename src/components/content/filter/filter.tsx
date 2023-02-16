import React from 'react';

import './filter.scss';

export const Filter = () => (
  <React.Fragment>
    <select className='filter field'>
      <option value='value1'>По рейтингу</option>
    </select>
    <button type='button' className='filter-btn icon' aria-label='button' />
  </React.Fragment>
);
