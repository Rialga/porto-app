import './App.css';
import Aos from 'aos'
import 'aos/dist/aos.css'
import {useEffect}from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavHeader } from './components/navbar/NavHeader';
import { Content } from './components/contents/Content';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'



function App() {


  useEffect(()=>{
    Aos.init();    <div class="container">
        
    </div>
  } ,[])


  return (
    <div className='main'>
      <NavHeader/>
      <Content/>
      <Router>
        <Routes>
          <Route path='/' exact/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
