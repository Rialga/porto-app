import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavHeader } from './components/navbar/NavHeader';
import { Content } from './components/contents/Content';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'



function App() {
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
