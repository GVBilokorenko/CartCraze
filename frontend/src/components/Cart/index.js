import React from 'react';
import { useGlobal } from 'context/globalContext.js';

const CartItem = ({ item }) => {
  const { removeCartItem } = useGlobal();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <span className="font-semibold">{item.name}</span>
      <span>${item.price.toFixed(2)}</span>
      <button
        className="btn btn-error btn-xs"
        onClick={() => removeCartItem(item)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

const CartPage = () => {
  const { cartItems } = useGlobal();
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
              <div className="p-4 border-t">
                <span className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
