import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, setCart } = useCart(); // Incluye setCart para limpiar el carrito

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const finalizePurchase = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert('Compra finalizada con éxito. ¡Gracias por tu compra!');
    setCart([]); // Limpia el carrito
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Tu carrito está vacío.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 mb-4 shadow"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-700 mb-4">Precio: ${item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <label
                    htmlFor={`quantity-${item.id}`}
                    className="mr-2 text-gray-700"
                  >
                    Cantidad:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                    className="w-16 border rounded px-2 py-1"
                    aria-label={`Cantidad de ${item.name}`}
                  />
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Eliminar ${item.name} del carrito`}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="text-right mt-6">
            <h2 className="text-xl font-bold text-blue-600">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4"
              onClick={finalizePurchase}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
      {/* Botón para regresar al catálogo */}
      <div className="mt-6 text-center">
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Regresar al Catálogo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
