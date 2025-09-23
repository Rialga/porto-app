import React, { useState, useEffect } from 'react';
import './NavHeader.css';
import { Nav, Navbar } from 'react-bootstrap';

const navLinks = [
    { href: '#about', label: 'About' },
    // { href: '#project', label: 'Project' },
    { href: '#contact', label: 'Contact' },
];

export function NavHeader() {
    const [navbar, setNavbar] = useState(false);

    useEffect(() => {
        const navbarAnimation = () => {
            if (window.innerWidth > 800) {
                setNavbar(window.scrollY >= 80);
            }
        };
        window.addEventListener('scroll', navbarAnimation);
        return () => window.removeEventListener('scroll', navbarAnimation);
    }, []);

    return (
        <Navbar className={navbar ? 'nav-pad active' : 'navbar nav-pad'} variant="dark" sticky="top" expand="lg">
            <div data-aos="zoom-in" aos_offset="100" className="container">
                <Navbar.Brand className="shake">
                    &lt;/&gt;
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="nav-item justify-content-center">
                    <ul className="navbar-nav ms-auto">
                        {navLinks.map(({ href, label }) => (
                            <li className="nav-item" key={href}>
                                <Nav.Link href={href}>{label}</Nav.Link>
                            </li>
                        ))}
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
