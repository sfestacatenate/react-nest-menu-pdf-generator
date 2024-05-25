import React from 'react';
import { MenuDish } from '../../../models/Models';

const MenuItem: React.FC = () => {
    const [category, setCategory] = React.useState<string>('');
    const [dishes, setDishes] = React.useState<MenuDish[]>([]);

    const addDish = () => {
        const newDish: MenuDish = {
            name: '',
            price: 0,
        };

        setDishes(prevDishes => [...prevDishes, newDish]);
        console.log(dishes);
    };

    const removeDish = (index: number) => {
        setDishes(prevDishes => prevDishes.filter((_, i) => i !== index));
    };

    const updateDish = <K extends keyof MenuDish>(index: number, key: K, value: MenuDish[K]) => {
        const updatedDishes = [...dishes];
        updatedDishes[index][key] = value;
        setDishes(updatedDishes);
    };

    return (
        <div className="mt-12">
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button onClick={addDish}>Add Dish</button>
            {dishes.map((dish, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={dish.name}
                        onChange={(e) => updateDish(index, 'name', e.target.value)}
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={dish.price}
                        onChange={(e) => updateDish(index, 'price', parseFloat(e.target.value))}
                        style={{ marginRight: '10px' }}
                    />
                    <button onClick={() => removeDish(index)}>x</button>
                </div>
            ))}
        </div>
    );
};

export default MenuItem;
