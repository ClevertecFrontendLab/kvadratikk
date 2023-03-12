import { Fragment } from 'react';

export const CardTile = ({
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
    <Fragment>
      {rating}
      {tile}
      {info}
      {order}
    </Fragment>
  );
};
