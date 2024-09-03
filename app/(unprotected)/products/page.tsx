import React from "react";
import ProductCard from "./product-card";
import ProductList from "./product-list";

const Products: React.FC = () => {
  return (
    <main className="w-full min-h-screen mt-[calc(40px+56px+48px)]">
      <div className="flex items-center justify-center py-8 sm:py-12 md:py-16 text-black bg-brand-offwhite">
        <h2 className="text-xl sm:text-2xl md:text-[28.13px] tracking-[0.64px] leading-[1.25] text-[#000000]">
          Polos & Shirts for Her
        </h2>
      </div>
      {/* product quantity  */}
      <div className="flex flex-col sm:flex-row items-center justify-between border border-[#CDCBC7]">
        <div className="flex items-center justify-center gap-4 px-4 sm:px-8 md:px-12 py-3 sm:py-5 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-[#CDCBC7]">
          <svg
            role="presentation"
            width="18"
            viewBox="0 0 18 18"
            fill="none"
            className="cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M0 0h8v8H0zM0 10h8v8H0zM10 0h8v8h-8zM10 10h8v8h-8z"
            ></path>
          </svg>
          <svg
            role="presentation"
            width="18"
            viewBox="0 0 18 18"
            fill="none"
            className="cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M0 0h4v4H0zM0 7h4v4H0zM0 14h4v4H0zM7 0h4v4H7zM7 7h4v4H7zM7 14h4v4H7zM14 0h4v4h-4zM14 7h4v4h-4zM14 14h4v4h-4z"
            ></path>
          </svg>
          <svg
            role="presentation"
            width="18"
            viewBox="0 0 18 18"
            fill="none"
            className="cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M0 0h18v2H0zm0 4h18v2H0zm0 4h18v2H0zm0 4h18v2H0zm0 4h18v2H0z"
            ></path>
          </svg>
        </div>
        <div className="flex items-center py-3 sm:py-5 w-full justify-center">
          <p className="text-sm sm:text-base tracking-[0.28px] leading-[23.8px]">
            40 Products
          </p>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <div className="py-3 sm:py-5 px-4 sm:px-8 md:px-[46px] cursor-pointer border-t sm:border-t-0 sm:border-l border-[#CDCBC7] w-1/2 sm:w-auto text-center">
            Filter
          </div>
          <div className="py-3 sm:py-5 px-4 sm:px-8 md:px-[46px] cursor-pointer border-t sm:border-t-0 border-l border-[#CDCBC7] w-1/2 sm:w-auto text-center">
            <select className="bg-transparent">
              <option>Sort By</option>
            </select>
          </div>
        </div>
      </div>

      {/* products list */}
      <ProductList />
    </main>
  );
};
// #f0efea;
export default Products;
