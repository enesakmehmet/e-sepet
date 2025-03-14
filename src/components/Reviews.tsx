import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { auth } from '../config/firebase';
import '../styles/Reviews.css';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ReviewsProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'createdAt'>) => void;
}

export const Reviews = ({ productId, reviews, onAddReview }: ReviewsProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const user = useUserStore(state => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onAddReview({
      rating,
      comment
    });

    setRating(5);
    setComment('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="reviews">
      <h3>Ürün Yorumları</h3>
      
      {user && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-input">
            <label>Puanınız:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`star ${star <= rating ? 'active' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="comment-input">
            <label>Yorumunuz:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
            />
          </div>
          <button type="submit" className="submit-review">
            Yorum Yap
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">Henüz yorum yapılmamış.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-header">
                <span className="reviewer-name">{review.userName}</span>
                <span className="review-date">{formatDate(review.createdAt)}</span>
              </div>
              <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < review.rating ? 'active' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 