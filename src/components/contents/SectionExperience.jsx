import React from "react";

export const SectionExperience = () => {
  const current = new Date();
  const limit_date = new Date("2022-12-15");
  // var last_day = current >= limit_date ? "Dec 2022" : "Now";
  var last_day =  "Now";

  return (
    <div data-aos="fade-down" aos_offset="100" className="section">
      <div className="title">
        <h1> Work Experience</h1>
      </div>

      <div className="d-flex justify-content-center align-items-center ">
        <div className="timeline">
          <ul className="timeline-point">
            <li className="timeline-item">
              <h5> PCS Payment Indonesia </h5>
              <h6 className="text-muted"> Feb 2023 - {last_day} </h6>
              <ul className="mb-10">
                <li>Work as Frontend Developer</li>
                <li>Convert UI/UX into System</li>
                <li>ReactJs, Vite, Vue, Tailwind, RTK Query</li>
              </ul>
            </li>

            <li className="timeline-item">
              <h5> Tigernix Solution Indonesia </h5>
              <h6 className="text-muted"> Aug 2021 - Dec 2022 </h6>
              <ul className="mb-10">
                <li>Work as Software Engineer in Front End Team</li>
                <li>Convert UI/UX into System</li>
                <li>Using MVC pattern in Odoo ERP </li>
              </ul>
            </li>

            <li className="timeline-item">
              <h5> Padang Department of Communication and Information </h5>
              <h6 className="text-muted"> Dec 2018 - Feb 2019 </h6>
              <ul className="mb-10">
                <li>Work as Programmer</li>
                <li>Using Laravel (PHP) as a tools</li>
                <li>Build library management application</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
