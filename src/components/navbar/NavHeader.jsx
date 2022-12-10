import React , { useState } from 'react';
import './NavHeader.css'
import { Nav, Navbar } from 'react-bootstrap';


export function NavHeader() {

    const[navbar , setNavbar] = useState(false)
    const navbarAnimation = () => {
        
        if(window.innerWidth > 800){
            if(window.scrollY >= 80){
                setNavbar(true)
            }else{
                setNavbar(false)

            }
        }
    }

    window.addEventListener('scroll',navbarAnimation)

    return (
      
    <Navbar className={navbar? ' nav-pad active': 'navbar nav-pad'} variant="dark" sticky="top" expand="lg">
        <div data-aos="zoom-in" aos_offset="100"  className='container'>
            <Navbar.Brand className="shake">
                 &lt;/&gt; 
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className='nav-item justify-content-center'>
                <ul className='navbar-nav ms-auto'>
                    <li className="nav-item">
                        <Nav.Link href="#about"> About </Nav.Link> 
                    </li>                       
                    <li className="nav-item">
                        <Nav.Link href="#project"> Project </Nav.Link>
                    </li>                       
                    <li className="nav-item">
                        <Nav.Link href="#contact"> Contact </Nav.Link>
                    </li>                       
                </ul>
            </Navbar.Collapse>
        </div>
    </Navbar>
   

    );
}
