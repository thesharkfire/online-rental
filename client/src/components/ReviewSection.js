import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ReviewSection({ product }) {
  const [reviewText, setReviewText] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviews, setReviews] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    // Fetch the reviews for the product from the server
    fetch(`http://localhost:5000/api/products/${product._id}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, [product._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the review to the server
    await fetch(`http://localhost:5000/api/products/${product._id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: reviewTitle, review: reviewText, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        console.log(data.reviews); // Log the reviews array
        setReviewText('');
        setReviewTitle('');
        setReviews([...reviews, data.review]);
      });
  };

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <h4>{review.title}</h4>
            {review.text} - by user {review.user._id}
          </li>
        ))}
      </ul>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={reviewTitle}
          onChange={(event) => setReviewTitle(event.target.value)}
        />
        <br />
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewSection;
