import { useState, useEffect } from 'react';
import { get } from './http.util';

export const useFetchReviews = (googleId: string) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await get(`http://localhost:3001/review/${googleId}`, {
        'Content-Type': 'application/json',
      });

      setReviews(data);
    };

    fetchReviews();
  }, [googleId]);

  return { reviews };
};
