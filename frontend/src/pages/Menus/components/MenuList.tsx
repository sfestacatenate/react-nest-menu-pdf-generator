import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useDelete from '../../../hooks/useDelete';
import { Menu } from '../../../models/Models';
import { useNavigate } from 'react-router-dom';

const MenuList: React.FC = () => {
    const navigate = useNavigate();
    const { data: menus, error, loading, refresh } = useFetch<Menu[]>(`${process.env.REACT_APP_SERVER_URL}/menu/getall`);
    const handleDelete = useDelete(`${process.env.REACT_APP_SERVER_URL}/menu/deletemenu`);

    const handleMenuDelete = async (menuId: number) => {
        try {
            const deletedId = await handleDelete.remove(menuId);
            if (deletedId === 0) {
                throw new Error('Error deleting menu');
            } 
            refresh();
        } catch (error) {
            alert('Error deleting menu');
        }
    };

    const handleMenuEdit = (menuId: number) => {
        navigate(`/menu-edit/${menuId}`);
    };
    
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
                                    <button  onClick={() => handleMenuEdit(menu.id)} className="px-4 mr-2 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Edit</button>
                                    <button onClick={() => handleMenuDelete(menu.id)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
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
