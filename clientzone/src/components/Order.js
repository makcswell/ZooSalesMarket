import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ selectedProducts, onProceed, removeProduct }) => {
    const navigate = useNavigate();

   
    const [quantities, setQuantities] = useState(
        Object.fromEntries(Object.keys(selectedProducts).map(id => [id, 1]))
    );

    const handleQuantityChange = (id, change) => {
        setQuantities(prev => {
            const newQuantity = prev[id] + change;
            return {
                ...prev,
                [id]: newQuantity < 1 ? 1 : newQuantity 
            };
        });
    };

  
    const calculateTotalAmount = () => {
        return Object.keys(quantities).reduce((total, id) => {
            const product = selectedProducts[id];
            return total + (product.price * quantities[id]);
        }, 0);
    };

    const [totalAmount, setTotalAmount] = useState(calculateTotalAmount());

    useEffect(() => {
        setTotalAmount(calculateTotalAmount());
    }, [quantities, selectedProducts]);

    const handleCheckout = () => {
        onProceed(quantities); 
        navigate('/payment');
    };

    return (
        <div>
            <h1>Оформление заказа</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span>Товар</span>
                <span>Количество</span>
                <span>Цена</span>
            </div>
            <div className="cart-items">
                {Object.values(selectedProducts).map(product => (
                    <div className="cart-item" key={product.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={product.image} alt={product.name} width="50" />
                            <span>{product.name}</span>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                            <input type="text" value={quantities[product.id]} readOnly />
                            <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                        </div>
                        <span className="price">{product.price * quantities[product.id]} руб.</span>
                        <button
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                            onClick={() => {
                                removeProduct(product.id);
                                setQuantities(prev => {
                                    const newQuantities = { ...prev };
                                    delete newQuantities[product.id]; 
                                    return newQuantities;
                                });
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
            <div className="total">
                Итоговая сумма: {totalAmount} руб.
            </div>
            <div className="actions">
                <button className="back" onClick={() => window.history.back()}>Вернуться</button>
                <button className="checkout" onClick={handleCheckout}>Оплатить</button>
            </div>
        </div>
    );
};

export default Order;
