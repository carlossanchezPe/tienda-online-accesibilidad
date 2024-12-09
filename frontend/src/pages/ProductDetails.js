import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const ProductDetails = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL

  // Datos ficticios de productos (puedes conectar esto a un backend más tarde)
  const products = [
    {
      id: '1',
      name: 'iPhone 13 Pro',
      price: '$999',
      image: 'https://clevercel.mx/cdn/shop/files/iPhone-13-Pro-Graphite_Back-side_1200x.jpg?v=1712354499',
      description: 'El nuevo iPhone 13 Pro con tecnología avanzada.',
      features: ['Pantalla Super Retina XDR', 'Cámara Pro', 'A15 Bionic Chip'],
    },
    {
      id: '2',
      name: 'Samsung Galaxy S21',
      price: '$799',
      image: 'https://cell-shop.com.mx/wp-content/uploads/2022/06/180350-800-auto.jpg',
      description: 'El poderoso Samsung Galaxy S21.',
      features: ['Pantalla AMOLED', 'Cámara de 108MP', 'Exynos 2100'],
    },
    {
      id: '3',
      name: 'Google Pixel 6',
      price: '$599',
      image: 'https://gadgetward.com.mx/cdn/shop/products/GooglePixel6128GB8GB_RAM_SortaSeafoam_1200x1200.jpg?v=1638485939',
      description: 'El innovador Google Pixel 6.',
      features: ['Android Puro', 'Tensor Chip', 'Cámara Dual con IA'],
    },
  ];

  const product = products.find((product) => product.id === id);

  const [input, setInput] = useState(''); // Para el campo de comentarios
  const [comments, setComments] = useState([]); // Lista de comentarios
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Para mostrar el teclado

  const handleInputChange = (input) => {
    setInput(input);
  };

  const toggleKeyboard = () => {
    setKeyboardOpen(!keyboardOpen);
  };

  const publishComment = () => {
    if (input.trim()) {
      setComments([...comments, input]); // Agrega el comentario a la lista
      setInput(''); // Limpia el campo de texto
    }
  };

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={`Imagen del celular ${product.name}`}
        style={{ width: '300px', margin: '20px auto' }}
      />
      <p>{product.description}</p>
      <h2>{product.price}</h2>
      <ul style={{ textAlign: 'left', margin: '20px auto', maxWidth: '400px' }}>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        aria-label={`Agregar ${product.name} al carrito`}
        onClick={() => alert(`Agregado al carrito: ${product.name}`)}
      >
        Agregar al Carrito
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Comentarios</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un comentario..."
          rows="3"
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={toggleKeyboard}
          style={{
            marginTop: '10px',
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {keyboardOpen ? 'Cerrar Teclado' : 'Abrir Teclado'}
        </button>
        <button
          onClick={publishComment}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Publicar Comentario
        </button>
        {keyboardOpen && (
          <div style={{ marginTop: '20px' }}>
            <Keyboard
              onChange={handleInputChange}
              onKeyPress={(button) => console.log(`Presionado: ${button}`)}
            />
          </div>
        )}
        <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
          <h4>Comentarios Publicados:</h4>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
                {comment}
              </p>
            ))
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>
      </div>
      <Link to="/">
        <button
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Volver al Catálogo
        </button>
      </Link>
    </div>
  );
};

export default ProductDetails;
