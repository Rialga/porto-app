import React from 'react'
import './Content.css'
import {SectionProfile} from './SectionProfile'
import {SectionExperience} from './SectionExperience'
import {SectionProject} from './SectionProject'
import {SectionContact} from './SectionContact'
export const Content = () => {

  return (

    <div className='container content'>
        
        <SectionProfile />
        <SectionExperience/>
        <SectionProject/>
        <SectionContact/>

    </div>
  )
}
