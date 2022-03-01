import React from 'react'
import './Content.css'
import {SectionProfile} from './SectionProfile'
import {SectionProject} from './SectionProject'
import {SectionExperience} from './SectionExperience'
export const Content = () => {

  return (

    <div className='container content'>
        
        <SectionProfile />
        <SectionExperience/>
        <SectionProject/>

    </div>
  )
}
