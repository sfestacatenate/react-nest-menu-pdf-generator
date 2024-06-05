import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto">
                <ul className="flex flex-col md:flex-row md:space-x-4">
                    <li className="mb-2 md:mb-0">
                        <Link className="text-white hover:text-gray-200" to="/">Home</Link>
                    </li>
                    <li className="mb-2 md:mb-0">
                        <Link className="text-white hover:text-gray-200" to="/menus">Menus</Link>
                    </li>
                    <li className="mb-2 md:mb-0">
                        <Link className="text-white hover:text-gray-200" to="/menu-creation">Menu Creation</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;
