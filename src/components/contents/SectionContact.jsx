import React from 'react'
import { SocialIcon } from 'react-social-icons';

export const SectionContact = () => {
  return (
    <div id='contact' className='contact-section'>
    
        <div className="contact">
            <h2> Contact Me </h2> <br/>
            <a href='mailto:febrialganios@gmail.com'><img src="/gmail_icon.png" className='icon-edit' alt="/" width="50"/></a> &nbsp;&nbsp;
            <SocialIcon  url="https://www.linkedin.com/in/muhamad-febri-algani-311533205/" /> &nbsp;&nbsp;
            <SocialIcon url="https://github.com/Rialga" /> &nbsp;&nbsp;
        </div>
    
    </div>
  )
}
