import React , {useState , useMemo, useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart , clearCart } from '../../assets/lib/cart/cartSlice';
import { Link } from "react-router-dom";
import Button from "../../components/buttons/button";
// import { useState } from 'react';

function Cart() {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);


  const subTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.actualPrice * item.quantity, 0);
  }, [cartItems]);

  const [total , setTotal] = useState(0);

  const [shipping , setShipping] = useState(0);

  useEffect(()=>{
    setTotal(
      subTotalPrice + 4.99
    )
  },[subTotalPrice])


    const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleRemoveAll = () =>{
    dispatch(clearCart(cartItems))
  }

  return (
    <>
      <div className="container">
        <div className="h-2/4 bg-gray-100 py-20 w-full rounded-xl">
          <h2 className="mb-10 text-center text-4xl font-bold text-slate-700 ">Cart Items</h2>
          <div className="mx-auto max-w-5xl justify-center px-12 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              <ul className="flex flex-col gap-4">
                {
                  cartItems.length == 0 ? 
                  <div className="information-cart flex flex-col">
                    <span className="text-black text-2xl font-bold mb-8">Your cart is empty ! please enter into the cart</span>
                    <Button title={"Explore More"} path={"/gallery"} />
                    
                  </div>
                    
                  :  
                  cartItems.map((product)=>{
                    return(
                        <li key={product.id}>
                          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img
                              src={product.thumbnail}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between flex-col">
                              <div className="mt-5 sm:mt-0">
                                <h2 className="text-2xl font-bold text-gray-900">
                                  {product.title}
                                </h2>
                                <p className="mt-1 text-lg text-gray-700 mb-4">${Math.floor(product.actualPrice)}</p>
                              </div>
                              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div className="flex items-center border-gray-100">
                                  <span className="cursor-pointer text-slate-700 rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                    Quantity : {product.quantity}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <p className="text-sm">259.000 ₭</p>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </div>
                              </div>

                              <button onClick={() => handleRemoveFromCart(product.id)} className="bg-indigo-600 py-6 hover:opacity-95 rounded-xl">
                                Remove from Cart
                              </button>
                            </div>
                          </div>
                        </li>
                      )
                  })
                }
              </ul>
            </div>
            {/* total */}
            <form className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" action="/api/product/checkout" method="POST" >
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700 text-lg">Subtotal</p>
                <p className="text-gray-700">${subTotalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 text-lg">Shipping</p>
                <p className="text-gray-700">{cartItems.length > 0 ? "$4.99" : "$0"}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold text-lg text-gray-700">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold text-gray-500 text-right">${cartItems.length > 0 ? total.toFixed(2) : 0}</p>
                  <p className="text-sm text-gray-700 text-lg">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-indigo-600 py-1.5 font-medium text-blue-50 hover:bg-blue-600" type="submit">
                Check out
              </button>
            </form>
          </div>
          <div className={cartItems.length > 0 ? `cart__buttons m-x-auto w-full flex justify-center h-16 gap-4 mt-16` : "hidden"}>
            <Button title={"Explore More"} path={"/shop"} />
              <button className="p-4 rounded-md bg-indigo-600 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleRemoveAll} >
                  remove all
              </button>
          </div>
        </div>
      </div>
    </>
  );  
}

export default Cart;
