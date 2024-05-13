import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

// Componente Product
const Product = ({ id, name, price, addToCart }) => (
  <div className="border p-4 mb-4">
    <h2>{name}</h2>
    <p>Precio: ${price}</p>
    <button onClick={() => addToCart({ id, name, price })}>Agregar al carrito</button>
  </div>
);

// Componente CartItem
const CartItem = ({ id, name, price, removeFromCart }) => (
  <div className="border p-4 mb-4">
    <h2>{name}</h2>
    <p>Precio: ${price}</p>
    <button onClick={() => removeFromCart(id)}>Eliminar</button>
  </div>
);

// Componente Cart
const Cart = ({ cart, removeFromCart, clearCart }) => (
  <div>
    <h1>Carrito de Compras</h1>
    {cart.map(item => (
      <CartItem key={item.id} {...item} removeFromCart={removeFromCart} />
    ))}
    <h2>Total: ${cart.reduce((acc, item) => acc + item.price, 0)}</h2>
    <button onClick={clearCart}>Vaciar Carrito</button>
  </div>
);

// Componente principal
function CartPage() {
  const [cart, setCart] = useState([]);

  const addToCart = product => {
    setCart([...cart, { ...product, id: cart.length + 1 }]);
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1>Tienda Online</h1>
        <div className="grid grid-cols-3 gap-4">
          <Product id={1} name="Producto 1" price={10} addToCart={addToCart} />
          <Product id={2} name="Producto 2" price={20} addToCart={addToCart} />
          <Product id={3} name="Producto 3" price={30} addToCart={addToCart} />
        </div>
        <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
