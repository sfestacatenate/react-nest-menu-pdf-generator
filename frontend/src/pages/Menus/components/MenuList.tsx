import React from 'react';
import { MenuDish } from '../../../models/Models';

const MenuList: React.FC = () => {
    const menuItems: MenuDish[] = [
        { name: 'Pizza', price: 5.99 },
        { name: 'Burger', price: 3.99 },
        { name: 'Pasta', price: 2.99 },
        { name: 'Salad', price: 1.99 },
    ];

    return (
        <div className='mt-40'>
            <h2>Menu List</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuList;
