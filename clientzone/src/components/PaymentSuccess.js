import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ change }) => {
    const navigate = useNavigate();

    const handleCatalogClick = () => {
        navigate('/product-catalog'); 
    };

    return (
        <div style={styles.container}>
            <h1>Спасибо за покупку!</h1>
            <p style={styles.change}>Пожалуйста, возьмите вашу сдачу: {change} руб.</p>
            <div style={styles.coinsLabel}>Ваши монеты:</div>
            <div style={styles.coins}>
                <CoinRow value={1} count={4} />
                <CoinRow value={2} count={0} />
                <CoinRow value={5} count={2} />
                <CoinRow value={10} count={2} />
            </div>
            <button onClick={handleCatalogClick} style={styles.button}>Каталог зоотоваров</button>
        </div>
    );
};

const CoinRow = ({ value, count }) => {
    return (
        <div style={styles.coinRow}>
            <div style={styles.circle}>{value}</div>
            <span>{count} шт.</span>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '0 15px',
        textAlign: 'center',
    },
    change: {
        color: 'green',
        fontSize: '18px',
        marginBottom: '20px',
    },
    coinsLabel: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    coins: {
        marginBottom: '30px',
    },
    coinRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
    },
    circle: {
        width: '30px',
        height: '30px',
        border: '2px solid #ccc',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        fontSize: '14px',
    },
    button: {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        background: '#f5c518',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
    },
};

export default PaymentSuccess;
