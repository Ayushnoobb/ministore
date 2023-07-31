import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from './productSlice';
import { fetchProducts } from "../../assets/lib/product/productSlice";
import { addToCart, removeFromCart } from '../../assets/lib/cart/cartSlice';


const Shop = () => {
  const dispatch = useDispatch();
  const [productS, setProducts] = useState([]);
  let item = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  // const status = "loading"
  const error = useSelector((state) => state.products.error);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    setProducts(item);
  }, [item]);

  // console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <>
      <div className="container">
        <ul className="skeletion-loadings grid grid-cols-3 gap-x-32 gap-y-12 py-12">
          {Array.from({ length: 9 }).map((element, index) => {
            return (
                <li
                  role="status-loading"
                  className="w-full p-4 border border-gray-900 rounded-lg shadow animate-pulse md:py-10 md:px-6
                   dark:border-slate-500 bg-gray-300 py-32"
                   key={index}
                  >
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-700 rounded dark:bg-gray-700">
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-zinc-600 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-zinc-700"></div>
                  {/* <div className="flex items-center mt-4 space-x-3">
                    <svg
                      className="text-gray-200 w-14 h-14 dark:text-gray-700"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </div> */}
                  <span className="sr-only">Loading...</span>
                </li>
            );
          })}
        </ul>
      </div>
      </>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // console.log(products.length)

  return (
    <div className="container py-12">
      <ul className="grid grid-cols-3 py-12 gap-x-32 gap-y-12">
        {productS.map((product) => {
          let discountedPrice =
            product.price - (product.discountPercentage / 100) * product.price;
            let item = {
              ...product , 
              actualPrice : discountedPrice,
              quantity : 1 ,
            }
          return (
            <li key={product.id}>
              <div className="relative  flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl self-center"
                  href="#"
                >
                  <img
                    className="object-cover"
                    src={product.thumbnail}
                    alt="product image"
                    loading="lazy"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    {product.discountPercentage}%
                  </span>
                </a>
                <div className="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {product.title}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        ${Math.floor(discountedPrice)}
                      </span>
                      <span className="text-2xl text-slate-900 line-through ml-6 font-medium">
                        ${product.price}
                      </span>
                    </p>
                    <div className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xl font-semibold text-slate-700 ">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={()=>handleAddToCart(item)}
                    className="flex items-center justify-center rounded-md bg-indigo-600 px-5 py-6 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
                  >
                    <span className="mr-4">Add to Cart</span>
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
                    
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Shop;
