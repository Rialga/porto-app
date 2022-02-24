import React from 'react'
import './Content.css'
import {SectionProfile} from './SectionProfile'
import {SectionProject} from './SectionProject'

export const Content = () => {
  return (

    <div className='container content'>
        
        <SectionProfile/>
        <SectionProject/>

    </div>
  )
}
