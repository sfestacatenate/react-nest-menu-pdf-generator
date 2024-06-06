import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-700">Welcome to the Menu Management App!</h1>
                <p className="text-xl md:text-2xl mb-4">
                    Manage your restaurant menus effortlessly. Create, edit, and delete menus with ease.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link to="/menus" className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                        View Menus
                    </Link>
                    <Link to="/menu-creation" className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                        Create New Menu
                    </Link>
                </div>
                <div className="mt-12">
                    <img src="https://via.placeholder.com/600x400" alt="Restaurant" className="mx-auto rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default Home;
