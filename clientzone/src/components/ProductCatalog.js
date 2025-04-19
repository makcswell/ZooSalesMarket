import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
    { id: 1, name: 'University S Софа серая д/собак 40*60см', price: 10, image: 'https://samizoo.ru/upload/iblock/397/p57tf3s1oiytennua116lpkpx7j5q2x9.jpg', available: true, brand: 'University' },
    { id: 2, name: 'Шлейка розовая, бархатная, со стразами 600х710', price: 5, image: 'https://www.ppets.ru/image/cache/catalog/photo/7/p-ru-upload-files-new-e7-a5-48-20466_1600x1600-600x710.jpg', available: true, brand: 'TITBIT' },
    { id: 3, name: 'Лакомство для собак МИРАТОРГ', price: 2, image: 'https://avatars.mds.yandex.net/get-mpic/5259100/img_id4662004047618413511.jpeg/orig', available: true, brand: 'МИРАТОРГ' },
    { id: 4, name: 'Лакомство для собак TITBIT мясные палочки', price: 2, image: 'https://cdn1.ozone.ru/s3/multimedia-w/6073585652.jpg', available: false, brand: 'TITBIT' },
    { id: 5, name: 'Массажная силиконовая щетка для мытья собак желтая', price: 1, image: 'https://ir.ozone.ru/s3/multimedia-1-o/wc1000/7310239836.jpg', available: true, brand: 'University' },
    { id: 6, name: 'Миска для кошек собак', price: 3, image: 'https://ir.ozone.ru/s3/multimedia-1-c/wc1000/7237150176.jpg', available: true, brand: 'TITBIT' },
    { id: 7, name: 'Корм для собак сухой 3 кг гипоаллергенный ZILLII', price: 3, image: 'https://ir.ozone.ru/s3/multimedia-1-w/wc1000/7394232524.jpg', available: true, brand: 'ZILLII' },
];

const ProductCatalog = ({ onSelect, onProceed }) => {
    const navigate = useNavigate();

    // Состояния для фильтров
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10);
    const [cart, setCart] = useState([]); 
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleProceedToOrder = () => {
        onProceed();
        navigate('/order');
    };

    const handleSelect = (product) => {
        if (!cart.includes(product.id)) {
            setCart([...cart, product.id]);
        }
        setSelectedProductId(product.id);
        onSelect(product);
    };

    const filteredProducts = products
        .filter(product => {
            const withinPriceRange = product.price >= minPrice && product.price <= maxPrice;
            const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
            return withinPriceRange && matchesBrand;
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

    return (
        <div>
            <h1>Зоомагазин</h1>
            <div className="filters">
                <label>Выберите бренд</label>
                <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
                    <option value="">Все</option>
                    <option>МИРАТОРГ</option>
                    <option>TITBIT</option>
                    <option>University</option>
                    <option>ZILLII</option>
                </select>
                <label>Сортировать</label>
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="desc">по убыванию</option>
                    <option value="asc">по возрастанию</option>
                </select>
                <input
                    type="number"
                    value={minPrice}
                    onChange={e => setMinPrice(Number(e.target.value))}
                    placeholder="от 0 руб"
                />
                <input
                    type="number"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    placeholder="до 10 руб"
                />
                <button className="select-button green" onClick={() => {}}>
                    Применить
                </button>
            </div>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.name} width="200" height="200" />
                        <p>{product.name}</p>
                        <p><strong>{product.price} руб.</strong></p>
                        {product.available ? (
                            <button
                                className={`select-button ${cart.includes(product.id) ? 'green' : (selectedProductId === product.id ? 'active' : 'yellow')}`}
                                onClick={() => handleSelect(product)}
                            >
                                {cart.includes(product.id) ? 'Добавлено' : 'Выбрать'}
                            </button>
                        ) : (
                            <button className="out-of-stock">Закончился</button>
                        )}
                    </div>
                ))}
            </div>
            <button style={{ width: '150px', height: '50px' }} onClick={handleProceedToOrder}>
                Перейти к оформлению заказа
            </button>
        </div>
    );
};

export default ProductCatalog;

