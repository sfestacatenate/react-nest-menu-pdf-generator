import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/menus">Menus</Link></li>
                <li><Link to="/menu-creation">Menu Creation</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;