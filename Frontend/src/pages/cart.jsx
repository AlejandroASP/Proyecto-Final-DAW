import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

// Componente Product
const Product = ({ id, name, price, addToCart }) => (
  <div className="border p-4 mb-4 bg-white bg-opacity-75">
    <h2>{name}</h2>
    <p>Precio: ${price}</p>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart({ id, name, price })}>Agregar al carrito</button>
  </div>
);

// Componente CartItem
const CartItem = ({ id, name, price, removeFromCart }) => (
  <div className="border p-4 mb-4 bg-white bg-opacity-75">
    <h2>{name}</h2>
    <p>Precio: ${price}</p>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeFromCart(id)}>Eliminar</button>
  </div>
);

// Componente Cart
const Cart = ({ cart, removeFromCart, clearCart, completePurchase }) => (
  <div className="bg-white bg-opacity-75 p-4 mb-4">
    <h1>Carrito de Compras</h1>
    {cart.length === 0 ? (
      <div>
        <p>El carrito está vacío</p>
        <button className="bg-gray-300 text-gray-600 py-2 px-4 rounded cursor-not-allowed" disabled>Comprar</button>
      </div>
    ) : (
      <>
        {cart.map(item => (
          <CartItem key={item.id} {...item} removeFromCart={removeFromCart} />
        ))}
        <h2>Total: ${cart.reduce((acc, item) => acc + item.price, 0)}</h2>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={clearCart}>Vaciar Carrito</button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={completePurchase}>Comprar</button>
      </>
    )}
  </div>
);

// Componente principal
function CartPage() {
  const [cart, setCart] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const addToCart = product => {
    setCart([...cart, { ...product, id: cart.length + 1 }]);
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const completePurchase = () => {
    setCart([]);
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
    }, 3000); // Resetear el estado de compra exitosa después de 3 segundos
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-5 bg-white bg-opacity-20">
        <h1>Tienda Online</h1>
        <div className="grid grid-cols-1 gap-1">
          <Product id={1} name="Producto 1" price={10} addToCart={addToCart} />
          <Product id={2} name="Producto 2" price={20} addToCart={addToCart} />
          <Product id={3} name="Producto 3" price={30} addToCart={addToCart} />
        </div>
        {purchaseSuccess ? (
          <p>Compra realizada con éxito</p>
        ) : (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            completePurchase={completePurchase}
          />
        )}
        <h1>Productos Relacionados</h1>
        <div className="grid grid-cols-3 gap-1">
          <Product id={4} name="Producto 4" price={40} addToCart={addToCart} />
          <Product id={5} name="Producto 5" price={50} addToCart={addToCart} />
          <Product id={6} name="Producto 6" price={60} addToCart={addToCart} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
