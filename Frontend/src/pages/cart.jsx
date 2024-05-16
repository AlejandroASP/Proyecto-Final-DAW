import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductoBeta from "../assets/productoBeta.jpg";

// Componente Product
const Product = ({ id, name, price, addToCart }) => (
  <div className="p-4 mb-4 mx-4 rounded bg-white bg-opacity-75 md:flex justify-between md:h-25">
    <div className="md:flex items-center">
      <img
        src={ProductoBeta}
        alt="helldivers"
        className="w-full md:w-1/3 rounded-xl"
      />
      <h2 className="md:ml-4">{name}</h2>
    </div>
    <div className="flex flex-col">
      <p>Precio: ${price}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-4 rounded"
        onClick={() => addToCart({ id, name, price })}
      >
        Agregar al carrito
      </button>
    </div>
  </div>
);

// Componente RecommendProduct
const RecommendProduct = ({ id, name, price, addToCart }) => (
  <div className="p-4 mb-4 mx-4 rounded bg-white bg-opacity-75 md:flex flex-row justify-baseline md:h-25">
    <div className="md:w-1/2 flex">
      <img src={ProductoBeta} alt="helldivers" className="w-full rounded-xl" />
    </div>
    <div className="flex flex-col items-baseline">
      <p className="md:ml-4">{name}</p>
      <p>Precio: ${price}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:mr-4 mt-3 py-2 px-4 rounded"
        onClick={() => addToCart({ id, name, price })}
      >
        Agregar al carrito
      </button>
    </div>
  </div>
);

// Componente CartItem
const CartItem = ({ id, name, price, removeFromCart }) => (
  <div className="border p-4 mb-4 bg-white bg-opacity-75">
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <img src={ProductoBeta} alt="helldivers" className="w-1/4 rounded" />
          <h2 className="ml-4">{name}</h2>
        </div>
        <p>${price}</p>
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold mt-3 py-2 px-4 rounded"
        onClick={() => removeFromCart(id)}
      >
        Eliminar
      </button>
    </div>
  </div>
);

// Componente Cart
const Cart = ({ cart, removeFromCart, clearCart, completePurchase }) => (
  <div className="bg-black bg-opacity-45 p-4 mb-4 md:w-2/6 rounded-xl border border-white-500 border-4 mt-4 md:mt-0">
    <h1 className="text-white text-2xl font-extrabold mb-4">
      Carrito de Compras
    </h1>
    {cart.length === 0 ? (
      <div>
        <p className="text-white">El carrito está vacío</p>
        {/* <button className="bg-gray-300 text-gray-600 py-2 px-4 font-bold rounded cursor-not-allowed" disabled>Comprar</button> */}
      </div>
    ) : (
      <>
        <div className="overflow-auto max-h-72">
          {cart.map((item) => (
            <CartItem key={item.id} {...item} removeFromCart={removeFromCart} />
          ))}
        </div>
        <h2 className="text-white">
          Total: ${cart.reduce((acc, item) => acc + item.price, 0)}
        </h2>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={clearCart}
        >
          Vaciar Carrito
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={completePurchase}
        >
          Comprar
        </button>
      </>
    )}
  </div>
);

// Componente principal
function CartPage() {
  const [cart, setCart] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, { ...product, id: cart.length + 1 }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
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
      <div className="bg-gradient-to-b from-violet-900 to-pink-900">
        <div className="container mx-auto p-5">
          <h1 className="text-white text-3xl font-extrabold mb-4">Carrito</h1>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-4/5 bg-black bg-opacity-45 md:mr-7 rounded-xl border border-white-500 border-4 pb-4">
              <div className="h-15">
                <h1 className="text-white text-2xl font-extrabold m-4">
                  Productos seleccionados
                </h1>
              </div>
              <div className="overflow-auto h-96">
                <Product
                  id={1}
                  name="Producto 1"
                  price={10}
                  addToCart={addToCart}
                />
                <Product
                  id={2}
                  name="Producto 2"
                  price={20}
                  addToCart={addToCart}
                />
                <Product
                  id={3}
                  name="Producto 3"
                  price={30}
                  addToCart={addToCart}
                />
                <Product
                  id={3}
                  name="Producto 3"
                  price={30}
                  addToCart={addToCart}
                />
                <Product
                  id={3}
                  name="Producto 3"
                  price={30}
                  addToCart={addToCart}
                />
                <Product
                  id={3}
                  name="Producto 3"
                  price={30}
                  addToCart={addToCart}
                />
                <Product
                  id={3}
                  name="Producto 3"
                  price={30}
                  addToCart={addToCart}
                />
              </div>
            </div>
            {purchaseSuccess ? (
              <p className="bg-black bg-opacity-45 md:w-2/6 rounded-xl mt-4 border border-white-500 border-4 text-white text-center p-4">
                Compra realizada con éxito
              </p>
            ) : (
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                completePurchase={completePurchase}
              />
            )}
          </div>
          <div className="bg-black bg-opacity-45 mt-7 rounded-xl border border-white-500 border-4 pb-4">
            <h1 className="text-white text-2xl font-extrabold m-4">
              Productos Relacionados
            </h1>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3 overflow-auto md:overflow-none h-96 md:h-40">
              <RecommendProduct
                id={4}
                name="Producto 4"
                price={40}
                addToCart={addToCart}
              />
              <RecommendProduct
                id={5}
                name="Producto 5"
                price={50}
                addToCart={addToCart}
              />
              <RecommendProduct
                id={6}
                name="Producto 6"
                price={60}
                addToCart={addToCart}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
