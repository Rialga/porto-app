import React from 'react'
// import _ from "lodash";
import Project from "../../data/project.json"

import { Link } from 'react-router-dom'

export const SectionProject = () => {
    
  return (

    <div className='section'>
        <div className="title">
            <h1> My Project </h1>
        </div>
 
        <div className="slide-container">
            {Project.map(item => (            

                    <div className="project-content" key={item.id}>

                        <div className="preview">
                            <img src="/tes.png" alt="/"/>
                        </div>

                        <div className="project-desc">
                            <h4>{item.name}</h4>
                            <p> {item.description}</p>
                            <ul className="nav list-inline ml-auto ul-highlight">
                                {item.tools.map(tool => (
                                    <li key={tool.toString()} className="list-inline-item highlight"><b>{tool}</b></li>
                                ))}                             
                            </ul>
                        </div>
            
                    </div>

                
            ))}
            </div> 

    </div>
  )
}
