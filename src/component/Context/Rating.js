import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  const starArray = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starArray.push(<i key={i} className="fas fa-star"></i>);
  }

  // Add half stars
  if (halfStars === 1) {
    starArray.push(<i key="half" className="fas fa-star-half-alt"></i>);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starArray.push(<i key={`empty${i}`} className="far fa-star"></i>);
  }

  return (
    <div className="star-rating">
      {starArray}
    </div>
  );
};

export default StarRating;
