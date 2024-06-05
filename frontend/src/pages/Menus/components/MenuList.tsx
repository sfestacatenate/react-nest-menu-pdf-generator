import React from 'react';
import useFetch from '../../../hooks/useFetch';
import { Menu } from '../../../models/Models';

const MenuList: React.FC = () => {
    const { data: menus, error, loading } = useFetch<Menu[]>(`${process.env.REACT_APP_SERVER_URL}/menu/getall`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4">Menu List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">PDF Name</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {menus && menus.map((menu, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border-b border-gray-200">{menu.id}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{menu.name}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{menu.pdfName}</td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Edit</button>
                                    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuList;
