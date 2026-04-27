import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './TeamSection.css';

const TeamSection = ({ data }) => {
  return (
    <section className="team-section-premium section-padding bg-light">
      <div className="container">
        <div className="text-center mb-6">
          <span className="section-subtitle">Our Experts</span>
          <h2 className="section-title">The People Behind the Miracle</h2>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
          className="team-swiper"
        >
          {data.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="team-card-premium">
                <div className="team-img-wrap">
                  <img src={member.teamSrc} alt={member.title} />
                </div>
                <div className="team-info-premium">
                  <h3>{member.title}</h3>
                  <p>{member.designation}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSection;
