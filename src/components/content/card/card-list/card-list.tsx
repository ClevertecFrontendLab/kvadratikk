import React from 'react';

export const CardList = ({
  cardElements,
}: {
  cardElements: {
    tile: JSX.Element;
    info: JSX.Element;
    rating: JSX.Element;
    order: JSX.Element;
  };
}) => {
  const { tile, info, rating, order } = cardElements;

  return (
    <React.Fragment>
      {tile}
      {info}
      <div className='card__flex'>
        {rating}
        {order}
      </div>
    </React.Fragment>
  );
};
