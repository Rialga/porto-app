import React, {useState} from 'react'
import Project from "../../data/project.json"
import Aos from 'aos'



export const SectionProject = () => {

    const [numData, setNumData] = useState(3);
    const [showButton, setShowButton] = useState('Show More');
    const slice = Project.slice(0, numData);



    const ShowButton  = () => {
        Aos.refresh();

        if (showButton === 'Show More'){
          setNumData(Project.length)
          setShowButton('Show Less')  
          
        }
        else{
            setNumData(3)
            setShowButton('Show More') 
        }

    }

    return (

    <div id="project" className='section'>
        <div data-aos="fade-down" aos_offset="100" className="title">
            <h1> My Project </h1>
        </div>
    
        <div className="porto-container col d-flex justify-content-center">
            <div  className="slide-container">
                {slice.map(item => (            
                    <div data-aos="fade-down" aos_offset="100" className="project-content" key={item.id}>
                        <div className="preview">
                            
                            <img src={item.preview ? "/"+item.preview : "/tes.png"} className="adjust-image" alt="/"/>
                        </div>
                        <div className="project-desc">
                            <h4>{item.name}</h4> 
                            {item.url ? <p className='detail_project'> {item.description}  <a href={item.url} target='__blank' className='link-url'> Preview </a> </p> : <p className='detail_project'> {item.description} </p> }
                            
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
