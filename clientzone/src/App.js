import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import Order from './components/Order';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';

const App = () => {
    const [selectedProducts, setSelectedProducts] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [change, setChange] = useState(0);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const handleSelect = (product) => {
        setSelectedProducts(prev => ({
            ...prev,
            [product.id]: product
        }));
    };

    const handleProceedToOrder = () => {
        const total = Object.keys(selectedProducts).reduce((total, productId) => {
            const product = selectedProducts[productId];
            return total + product.price;
        }, 0);
        setTotalAmount(total);
    };

    const removeProduct = (id) => {
        setSelectedProducts(prev => {
            const newProducts = { ...prev };
            delete newProducts[id];
            return newProducts;
        });
    };

    const handlePaymentSuccess = (change) => {
        setChange(change);
        setIsPaymentSuccessful(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductCatalog onSelect={handleSelect} onProceed={handleProceedToOrder} />} />
                <Route
                    path="/order"
                    element={<Order selectedProducts={selectedProducts} totalAmount={totalAmount} onProceed={handleProceedToOrder} removeProduct={removeProduct} />}
                />
                <Route
                    path="/payment"
                    element={<Payment totalAmount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />}
                />
                <Route
                    path="/payment-success"
                    element={<PaymentSuccess change={change} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
