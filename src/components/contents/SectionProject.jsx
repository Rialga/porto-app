import React, {useState} from 'react'
import Project from "../../data/project.json"
import Aos from 'aos'



export const SectionProject = () => {

    const [numData, setNumData] = useState(4);
    const [showButton, setShowButton] = useState('Show More');
    const slice = Project.slice(0, numData);



    const ShowButton  = () => {
        Aos.refresh();

        if (showButton === 'Show More'){
          setNumData(Project.length)
          setShowButton('Show Less')  
          
        }
        else{
            setNumData(4)
            setShowButton('Show More') 
        }

    }

    return (

    <div className='section'>
        <div data-aos="fade-down" aos_offset="100" className="title">
            <h1> My Project </h1>
        </div>
    
        <div className="porto-container col d-flex justify-content-center">
            <div  className="slide-container">
                {slice.map(item => (            
                    <div data-aos="fade-down" aos_offset="100" className="project-content" key={item.id}>
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
        <div className="btn-load">
            <button id='btn_show' onClick={ShowButton}> {showButton} </button> 
        </div>

    </div>
  )
}
