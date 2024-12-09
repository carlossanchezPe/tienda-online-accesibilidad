import React, { useState } from 'react';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
    { id: 3, name: 'Producto 3', price: 300 },
  ]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} agregado al carrito`);
  };

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleAddToCart(product)}>Agregar al Carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
