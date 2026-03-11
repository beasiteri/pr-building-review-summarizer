import type { Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReview(productId);
   },

   async summarizeReviews(productId: number): Promise<string> {
      const reviews = await reviewRepository.getReview(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      const summary = 'This is a placeholder summary';

      return summary;
   },
};
