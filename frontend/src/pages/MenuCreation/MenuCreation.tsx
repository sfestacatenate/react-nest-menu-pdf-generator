import React, { useEffect, useState } from 'react';
import { Menu, MenuCategory, MenuDish } from '../../models/Models';
import useCreate from '../../hooks/useCreate';

const MenuCreation: React.FC = () => {
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
    const [menu, setMenu] = useState<Menu>({} as Menu);
    const { create: saveMenuData, loading, error } = useCreate<Menu>(`${process.env.REACT_APP_SERVER_URL}/menu/createmenu`);

    useEffect(() => {
        setMenu((prevMenu) => ({
            ...prevMenu,
            categories: menuCategories
        }));
    }, [menuCategories]);

    const addMenuCategory = () => {
        const newCategory: MenuCategory = {
            id: menuCategories.length,
            name: '',
            dishes: []
        };
        setMenuCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const updateCategory = (index: number, value: string) => {
        const updatedCategories = [...menuCategories];
        updatedCategories[index].name = value;
        setMenuCategories(updatedCategories);
    };

    const addDish = (categoryIndex: number) => {
        const newDish: MenuDish = {
            id: menuCategories[categoryIndex].dishes.length,
            name: '',
            price: 0
        };
        const updatedCategories = [...menuCategories];
        updatedCategories[categoryIndex].dishes.push(newDish);
        setMenuCategories(updatedCategories);
    };

    const removeDish = (categoryIndex: number, dishId: number) => {
        const updatedCategories = [...menuCategories];
        updatedCategories[categoryIndex].dishes = updatedCategories[categoryIndex].dishes.filter(dish => dish.id !== dishId);
        setMenuCategories(updatedCategories);
    };

    const updateDish = <K extends keyof MenuDish>(categoryIndex: number, dishIndex: number, key: K, value: MenuDish[K]) => {
        const updatedCategories = [...menuCategories];
        updatedCategories[categoryIndex].dishes[dishIndex][key] = value;
        setMenuCategories(updatedCategories);
    };

    const handleDishPriceChange = (categoryIndex: number, dishIndex: number, value: string) => {
        const normalizedValue = value.replace(',', '.');
        const price = parseFloat(normalizedValue);
        if (!isNaN(price)) {
            updateDish(categoryIndex, dishIndex, 'price', parseFloat(price.toFixed(2)));
        }
    };

    const saveMenu = async () => {
        try {
            await saveMenuData(menu);
            alert('Menu saved on db');
        } catch (error) {
            alert('Error saving menu');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Menu Creation</h1>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">Menu Name</label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={menu.name}
                    onChange={(e) => setMenu({ ...menu, name: e.target.value })}
                />
            </div>
            <div className="flex space-x-4 mb-6">
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={saveMenu}
                    disabled={loading}
                >
                    Save Menu
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={addMenuCategory}
                >
                    + Add Menu Category
                </button>
            </div>
            {menuCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-8 p-4 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <input
                            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Category"
                            value={category.name}
                            onChange={(e) => updateCategory(catIndex, e.target.value)}
                        />
                        <button
                            className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            onClick={() => addDish(catIndex)}
                        >
                            Add Dish
                        </button>
                    </div>
                    {category.dishes.map((dish, dishIndex) => (
                        <div key={dish.id} className="flex items-center mb-2">
                            <input
                                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Dish Name"
                                value={dish.name}
                                onChange={(e) => updateDish(catIndex, dishIndex, 'name', e.target.value)}
                            />
                            <input
                                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Price"
                                onChange={(e) => handleDishPriceChange(catIndex, dishIndex, e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={() => removeDish(catIndex, dish.id)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            ))}
            {error && <p className="text-red-600">{error.message}</p>}
        </div>
    );
};

export default MenuCreation;
