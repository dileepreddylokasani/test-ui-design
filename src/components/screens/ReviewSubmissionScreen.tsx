import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Send, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface ReviewSubmissionScreenProps {
  stationId: string;
  onBack: () => void;
  onSubmit: () => void;
}

export function ReviewSubmissionScreen({ stationId, onBack, onSubmit }: ReviewSubmissionScreenProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1500);
  };

  const stationName = 'Tesla Supercharger'; // Mock data

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 pt-12 border-b border-border bg-surface-card"
      >
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="font-semibold">Rate Your Experience</h1>
          <p className="text-foreground-muted text-sm">{stationName}</p>
        </div>
        <div className="w-16"></div>
      </motion.div>

      <div className="p-6">
        {/* Rating Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6 text-center"
        >
          <h3 className="font-semibold mb-4">How was your charging experience?</h3>
          
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                className="p-2"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? 'text-accent-orange fill-current'
                      : 'text-foreground-subtle'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-foreground-muted text-sm"
            >
              {rating === 1 && "We're sorry to hear about your experience"}
              {rating === 2 && "We appreciate your feedback"}
              {rating === 3 && "Thank you for your feedback"}
              {rating === 4 && "Great! We're glad you had a good experience"}
              {rating === 5 && "Excellent! We're thrilled you loved it"}
            </motion.p>
          )}
        </motion.div>

        {/* Review Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <label className="block font-semibold mb-3">
            Tell us more (optional)
          </label>
          
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with other EV drivers..."
            className="w-full h-32 p-4 bg-surface-card border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary transition-colors resize-none"
            maxLength={500}
          />
          
          <div className="flex justify-between mt-2 text-sm text-foreground-muted">
            <span>Help others with your experience</span>
            <span>{review.length}/500</span>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-accent-red/20 border border-accent-red/30 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-accent-red" />
              <span className="text-accent-red text-sm">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
              />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </motion.div>

        {/* Skip Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <Button
            variant="ghost"
            onClick={onSubmit}
            className="text-foreground-muted hover:text-foreground"
          >
            Skip for now
          </Button>
        </motion.div>

        {/* Review Guidelines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-surface-elevated border border-border rounded-xl p-4"
        >
          <h4 className="font-semibold mb-3">Review Guidelines</h4>
          <div className="space-y-2 text-sm text-foreground-muted">
            <p>• Be honest and constructive in your feedback</p>
            <p>• Focus on the charging experience and facilities</p>
            <p>• Avoid personal information or inappropriate content</p>
            <p>• Help other EV drivers make informed decisions</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}