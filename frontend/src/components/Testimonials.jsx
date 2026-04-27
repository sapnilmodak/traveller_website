import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    { 
      name: "Jav Blake", 
      text: "We were a small group of motorcycle rookies from Australia that felt so well supported and looked after during our 8 day traverse of the beautiful Ladakh regions of Nubra, Pangong and Zanskar. We absolutely loved exploring the amazing landscapes with our trusty 411cc Himalayan Royal Enfields which were strong and reliable to ride. Many thanks to Miracle Ladakh Adventure company for hosting us. Would recommend for anyone looking to hire a bike in Ladakh!", 
      rating: 5,
      meta: "Local Guide · 36 reviews"
    },
    { 
      name: "avadhut mahadik", 
      text: "Incredible experience with this bike rental company. We rented 6 day 2Nos. Himalayan 450s and it was perfect. Their team was extremely responsive and professional, answering all our questions quickly and thoroughly. The bikes themselves were in perfect condition – well-maintained, clean, and clearly prepared with care.", 
      rating: 5,
      meta: "Local Guide · 18 reviews"
    },
    { 
      name: "Féliot Benjamin", 
      text: "We had an incredible experience with this bike rental company. We rented 3 Royal Enfield Himalayan 450s and it was perfect. Their team was extremely responsive and professional, answering all our questions quickly and thoroughly. The bikes themselves were in perfect condition. Reassuring knowing we had such a reliable team behind us, especially during longer or more remote routes.", 
      rating: 5,
      meta: "8 reviews"
    },
    { 
      name: "Mohit Patil", 
      text: "I rented a bike from Miracle Ladakh Adventure for 6 days and had a wonderful experience. The bike was in excellent condition, very reliable throughout the trip, and the team was supportive and professional. Their service made my Ladakh journey smooth and enjoyable. Highly recommended!", 
      rating: 5,
      meta: "7 reviews"
    },
    { 
      name: "vijay chauhan", 
      text: "Amazing place to rent bike, budget friendly, you will get bike gloves, riding jacket, pants, permits and more.", 
      rating: 5,
      meta: "6 reviews"
    }
  ];

  return (
    <section className="testimonials-premium section-padding bg-white">
      <div className="container">
        <div className="text-center mb-6">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="testimonial-swiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card-premium">
                <FaQuoteLeft className="quote-icon" />
                <p className="review-text">"{review.text}"</p>
                <div className="review-footer">
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <h4 className="reviewer-name">{review.name}</h4>
                  {review.meta && <p className="reviewer-meta">{review.meta}</p>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
