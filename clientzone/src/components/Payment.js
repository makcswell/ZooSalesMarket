import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = ({ totalAmount, onPaymentSuccess }) => {
    const [insertedCoins, setInsertedCoins] = useState(0);
    const [message, setMessage] = useState('');
    const [coinCounts, setCoinCounts] = useState({
        1: 0,
        2: 0,
        5: 0,
        10: 0,
    });
    const navigate = useNavigate(); // Хук для навигации

    const handleCoinInsert = (value) => {
        setCoinCounts(prev => ({
            ...prev,
            [value]: prev[value] + 1,
        }));
        setInsertedCoins(prev => prev + value);
    };

    const handleCoinRemove = (value) => {
        if (coinCounts[value] > 0) {
            setCoinCounts(prev => ({
                ...prev,
                [value]: prev[value] - 1,
            }));
            setInsertedCoins(prev => prev - value);
        }
    };

    const handlePayment = () => { 
            if (insertedCoins >= totalAmount) {
                const change = insertedCoins - totalAmount;
                onPaymentSuccess(change);
                navigate('/payment-success');
            } else {
                setMessage('Недостаточно средств для оплаты.');
            }
        };

        return (
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
                <h1>Оплата</h1>
                <div className="total">
                    <span>Итоговая сумма: {totalAmount} руб.</span>
                </div>
                <div className="coin-container">
                    {[1, 2, 5, 10].map(value => (
                        <div className="row" key={value}>
                            <div className="nominal">
                                <div className="circle">{value}</div>
                                <span>{value} руб.</span>
                            </div>
                            <div className="quantity">
                                <button onClick={() => handleCoinRemove(value)}>-</button>
                                <input type="text" value={coinCounts[value]} readOnly />
                                <button onClick={() => handleCoinInsert(value)}>+</button>
                            </div>
                            <div>{value} руб.</div>
                        </div>
                    ))}
                </div>
                <div className="total">
                    <span>Внесенные монеты: {insertedCoins} руб.</span>
                    <span style={{ color: insertedCoins >= totalAmount ? 'green' : 'red' }}>
                        {insertedCoins >= totalAmount ? 'Достаточно средств' : 'Недостаточно средств'}
                    </span>
                </div>
                <div className="buttons">
                    <button onClick={handlePayment} style={{ background: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                        Оплатить
                    </button>
                </div>
                {message && <p style={{ color: 'red' }}>{message}</p>}
            </div>
        );
    };

    export default Payment;

