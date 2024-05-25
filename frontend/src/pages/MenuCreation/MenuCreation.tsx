import React, { useState } from 'react';
import MenuItem from './components/MenuItem';

const MenuCreation: React.FC = () => {
    const [menuItems, setMenuItems] = useState<number[]>([]);

    const addMenuItem = () => {
        setMenuItems(prevItems => [...prevItems, prevItems.length]);
    };

    return (
        <div>
            <p>Menu Creation</p>
            <button onClick={addMenuItem}>+ Aggiungi Menu Item</button>
            {menuItems.map((item, index) => (
                <MenuItem key={index} />
            ))}
        </div>
    );
};

export default MenuCreation;