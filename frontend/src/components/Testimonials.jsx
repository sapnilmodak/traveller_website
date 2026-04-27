import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    { name: "John Doe", text: "Amazing experience! Ladakh is beautiful and Miracle Ladakh Adventure made it even better with their perfect planning.", rating: 5 },
    { name: "Sarah Smith", text: "The trekking tour was well-organized. Our guide was very knowledgeable and helpful throughout the journey.", rating: 5 },
    { name: "Mike Johnson", text: "Best travel agency for Ladakh. Highly recommended for their professional service and friendly staff.", rating: 5 }
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
                  <h4 className="reviewer-name">- {review.name}</h4>
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
