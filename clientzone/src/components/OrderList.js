import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5073/api/orders');
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setError('Полученные данные не являются массивом.');
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(`Не удалось загрузить заказы: ${error?.message || 'Неизвестная ошибка'}`); 
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Список заказов</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Дата заказа</th>
                        <th>Состав заказа</th>
                        <th>Общая сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.items.map(item => `${item.brand} ${item.name} (${item.quantity})`).join(', ')}</td>
                            <td>{order.totalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersList;
