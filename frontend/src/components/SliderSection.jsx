import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PackageCard from './PackageCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderSection.css';

const SliderSection = ({ title, subtitle, data, type }) => {
  return (
    <section className="slider-section section-padding">
      <div className="container">
        <div className="slider-header">
          <div className="header-text">
            {subtitle && <span className="section-subtitle">{subtitle}</span>}
            <h2 className="section-title">{title}</h2>
          </div>
          <div className="slider-nav">
            <button className={`prev-${title.replace(/\s+/g, '-').toLowerCase()}`}>←</button>
            <button className={`next-${title.replace(/\s+/g, '-').toLowerCase()}`}>→</button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: `.prev-${title.replace(/\s+/g, '-').toLowerCase()}`,
            nextEl: `.next-${title.replace(/\s+/g, '-').toLowerCase()}`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="premium-swiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              {type === 'category' ? (
                <Link to={`/packages?category=${item.title}`} className="category-card-link">
                  <div className="category-card-premium">
                    <div className="category-img">
                      <img src={item.thumbSrc} alt={item.title} />
                    </div>
                    <div className="category-info">
                      <h3>{item.title}</h3>
                      <p>Explore Now</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <PackageCard item={item} type={type} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SliderSection;
