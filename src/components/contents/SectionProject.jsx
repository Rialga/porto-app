import React, {useState} from 'react'
import Project from "../../data/project.json"
import Aos from 'aos'



export const SectionProject = () => {

    var  value = 3

    if(getWindowDimensions() <= 768){
      value = Object.keys(Project).length  
    }
    const [numData, setNumData] = useState(value);
    const [showButton, setShowButton] = useState('Show More');
    const slice = Project.slice(0, numData);


    function getWindowDimensions() {
        const { innerWidth: width } = window;
        return width;
      }

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
                            
                            <img src={item.preview ? process.env.PUBLIC_URL+"/"+item.preview : process.env.PUBLIC_URL+"/tes.png"} className="adjust-image" alt="/"/>
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
