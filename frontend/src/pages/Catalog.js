import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Catalog = () => {
  const { cart, addToCart } = useCart();
  const [alertMessage, setAlertMessage] = useState('');

  const products = [
    { id: 1, name: 'iPhone 13 Pro', price: 999, image: 'https://clevercel.mx/cdn/shop/files/iPhone-13-Pro-Graphite_Back-side_1200x.jpg?v=1712354499' },
    { id: 2, name: 'Samsung Galaxy S21', price: 799, image: 'https://cell-shop.com.mx/wp-content/uploads/2022/06/180350-800-auto.jpg' },
    { id: 3, name: 'Google Pixel 6', price: 599, image: 'https://gadgetward.com.mx/cdn/shop/products/GooglePixel6128GB8GB_RAM_SortaSeafoam_1200x1200.jpg?v=1638485939' },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAlertMessage(`Producto agregado al carrito: ${product.name}`);
    setTimeout(() => setAlertMessage(''), 3000); // El mensaje desaparece después de 3 segundos
  };

  return (
    <div className="p-6">
      <nav className="flex justify-end mb-4">
        <Link to="/cart">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Ver Carrito ({cart.length})
          </button>
        </Link>
      </nav>

      <h1 className="text-3xl font-bold text-center mb-6">Catálogo de Celulares</h1>

      {alertMessage && (
        <div role="alert" className="bg-green-100 text-green-800 p-2 rounded mb-4">
          {alertMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={`Imagen del celular ${product.name}`}
              className="w-full mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                Ver Detalles
              </button>
            </Link>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
