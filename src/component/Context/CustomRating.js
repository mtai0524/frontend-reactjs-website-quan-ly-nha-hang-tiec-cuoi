import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const CustomRating = ({ rating, onRatingChange }) => {
    const renderStars = (maxRating) => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            if (i <= rating) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        style={{ color: 'gold', cursor: 'pointer' }}
                        onClick={() => onRatingChange(i)}
                    />
                );
            } else if (i - 0.5 === rating) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={faStarHalfAlt}
                        style={{ color: 'gold', cursor: 'pointer' }}
                        onClick={() => onRatingChange(i - 0.5)}
                    />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        style={{ color: 'gray', cursor: 'pointer' }}
                        onClick={() => onRatingChange(i - 0.5)}
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div className="custom-rating">
            {renderStars(5)}
        </div>
    );
};



export default CustomRating;
