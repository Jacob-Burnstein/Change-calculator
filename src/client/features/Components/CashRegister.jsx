import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../store/productsSlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import CartCard from "./CartCard";
import Popup from "./popup";
import { useState, useEffect } from "react";


const CashRegister = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const navigate = useNavigate();

  let total = useSelector((state) => state.cart.totalPrice);
  total = Math.abs(total.toFixed(2));
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  //Popup: useState and useEffect for Popup function
  const [timedPopup, setTimedPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 200);
  }, []);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <div className="product-container">
        <ul className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
      <div className="cart">
        <ul className="cart-list">
          {cartItems.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </ul>
        <h2>Total: {total}</h2>
      </div>
      <button onClick={() => navigate("/received-bills")}>Checkout</button>
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <h1 className="popup-header">Greet the customer:</h1>
        <p className="popup-para">Hello, how can I help you today?</p>
      </Popup>
    </div>
  );
};

export default CashRegister;
