import { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

type Props = {
   productId: number;
};

type Review = {
   id: string;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponses = {
   summary: string | null;
   reviews: Review[];
};

const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponses>();

   useEffect(() => {
      const fetchReviews = async () => {
         const { data } = await axios.get<GetReviewsResponses>(
            `/api/products/${productId}/reviews`
         );
         setReviewData(data);
      };

      fetchReviews();
   }, [productId]);

   return (
      <div className="flex flex-col gap-5">
         {reviewData?.reviews.map((review) => (
            <div key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div>
                  <StarRating value={review.rating} />
               </div>
               <p className="py-2">{review.content}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
