import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Stars = ({ grade }) => {
  const fullStar = grade && [...Array(Math.floor(grade))].map((e, i) => <StarIcon key={i} />);
  const halfStar = grade && [...Array(Math.ceil(grade) - Math.floor(grade))].map((e, i) => (<StarHalfIcon key={i} />));
  const voidStar = grade && [...Array(5 - Math.ceil(grade))].map((e, i) => <StarOutlineIcon key={i} />);

  return (
    grade &&
    (
      <div>
        {fullStar}{halfStar}{voidStar}
      </div>
    )
  )
};

export default Stars;
