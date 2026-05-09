import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/review/myReview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Handle both array and single object responses
      const data = response.data.data || response.data;
      setReviews(Array.isArray(data) ? data : [data].filter(Boolean));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        <img src="" alt=""/>
      </span>
    ));
  };

  if (loading) return <div className="reviews-loading">Loading your reviews...</div>;
  if (error) return <div className="reviews-error">{error}</div>;

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h1 className="reviews-title">My Reviews</h1>
        <button onClick={fetchReviews} className="refresh-btn"><img src="" alt=""/> Refresh</button>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <h3>You haven't received any reviews yet</h3>
          <p>Complete more jobs to get customer feedback!</p>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {review.customer?.fullName?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <div>
                    <h3>{review.customer?.fullName || "Customer"}</h3>
                    <p className="review-date">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="rating-container">
                  <div className="stars">
                    {renderStars(review.rating)}
                  </div>
                  <span className="rating-number">({review.rating}/5)</span>
                </div>
              </div>

              <div className="review-comment">
                "{review.comment}"
              </div>

              <div className="review-footer">
                <span className="service-tag">
                  {review.booking?.service || "Service"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;