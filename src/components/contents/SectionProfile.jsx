import React from 'react'

export const SectionProfile = () => {
  return (
    <div className='section profile'>
        
        <div className="row">
          <div className="col-lg-5 picture-part">
              <div className="picture d-flex justify-content-center">
                <img src="/laptop.png" alt="/"  className="img-fluid" width="300" height="300"/>
              </div>

          </div>
          <div className="col-lg-7">
            <div className="description">
                <h6>Hi, my name is</h6>
                <h4> Muhamad Febri Algani. </h4>
                <h4> Im a Software Developer </h4>
                <span> In nulla adipisicin quis eu sit id ut ex duis dolor. Irure laboris sunt non Lorem incididunt irure elit. Lorem tempor nulla Lorem reprehenderit proident aute incididunt tempor sint duis proident consectetur sint eu. Occaecat ad aliquip non fugiat aute eiusmod.</span>
            </div>

          </div>

        </div>

    </div>
  )
}
