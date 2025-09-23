import React from "react";

export const SectionProfile = () => (
  <section id="about" className="section profile">
    <div className="row" data-aos="fade-down" data-aos-offset="100">
      <div className="col-lg-5 picture-part d-flex justify-content-center align-items-center">
        <img
          src={`${process.env.PUBLIC_URL}/me.png`}
          alt="Profile"
          className="img-fluid"
          width={300}
          height={300}
          loading="lazy"
        />
      </div>
      <div className="col-lg-7">
        <div className="description">
          <h6>Hi, my name is</h6>
          <h4>Muhamad Febri Algani.</h4>
          <h5>I'm a Frontend Developer</h5>
          <p>
            Experienced Front-end Developer with over 3 years in modern web
            development, specializing in building and optimizing user focused
            applications. Proficient in ReactJS, VueJS, Redux, and Vuex for
            effective state management. I excel at crafting intuitive user
            interfaces and efficiently resolving issues. Known for adaptability
            and quick learning, I thrive in both independent and collaborative
            environments, delivering high-quality, tailored solutions that meet
            client needs and enhance user experience
          </p>
        </div>
      </div>
    </div>
  </section>
);
