import React, { useState } from 'react';
import { MenuCategory, MenuDish } from '../../models/Models';

const MenuCreation: React.FC = () => {
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);

    const addMenuCategory = () => {
        const newCategory: MenuCategory = {
            id: menuCategories.length,
            category: '',
            dishes: []
        };
        setMenuCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const updateCategory = (index: number, value: string) => {
        const updatedCategories = [...menuCategories];
        updatedCategories[index].category = value;
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

    return (
        <div>
            <p>Menu Creation</p>
            <button onClick={addMenuCategory}>+ Aggiungi Categoria Menu</button>
            {menuCategories.map((category, catIndex) => (
                <div key={catIndex} className="mt-12">
                    <input
                        type="text"
                        placeholder="Categoria"
                        value={category.category}
                        onChange={(e) => updateCategory(catIndex, e.target.value)}
                    />
                    <button onClick={() => addDish(catIndex)}>Aggiungi Piatto</button>
                    {category.dishes.map((dish, dishIndex) => (
                        <div key={dish.id + category.id} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={dish.name}
                                onChange={(e) => updateDish(catIndex, dishIndex, 'name', e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <input
                                type="number"
                                placeholder="Prezzo"
                                value={dish.price}
                                onChange={(e) => updateDish(catIndex, dishIndex, 'price', parseFloat(e.target.value))}
                                style={{ marginRight: '10px' }}
                            />
                            <button onClick={() => removeDish(catIndex, dish.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MenuCreation;
