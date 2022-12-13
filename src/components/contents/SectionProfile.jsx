import React from 'react'

export const SectionProfile = () => {
  return (
    <div id="about" className='section profile'>
        
        <div className="row" data-aos="fade-down" aos_offset="100">
          <div className="col-lg-5 picture-part">
              <div className="picture d-flex justify-content-center">
                <img src={process.env.PUBLIC_URL+"/me.png"} alt="/"  className="img-fluid" width="300" height="300"/>
              </div>

          </div>
          <div className="col-lg-7">
            <div className="description">
                <h6>Hi, my name is</h6>
                <h4> Muhamad Febri Algani. </h4>
                <h5> Im a Software Developer </h5>
                <span>
                  I enjoy translating business processes or ideas into Software Application. I started focusing in programming about 4 years ago. I have built several web or mobile based (Android) applications. I also have work experience as a Software Engineer with responsibility for the development of the front end system <br/><br/>
                  Here are a few technologies I've been working with recently :<br/>
                  Java Scritp , PHP , Laravel, React, and Kotlin
                  </span>
            </div>

          </div>

        </div>

    </div>
  )
}
