import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


function Header() {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  return (
    <header>
      <Link to="/" relative="path" className="header__logo">
        <h1 className="brand__name text-4xl font-bold">Mini Store</h1>
      </Link>
      <nav className="nav">
        <ul className="nav__links">
          <li className="nav__link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__link">
            <Link to="/about">About</Link>
          </li>
          <li className="nav__link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="nav__link">
            <Link to="/cart" className="flex items-center gap-2 relative">
              <span className={cartItems.length > 0 ? `cart__info absolute flex items-center justify-center text-sm text-bold` : 'hidden'}>{cartItems.length}</span>
              Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
