"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";

const ColorSchema = z.object({
  colorName: z.string(),
  images: z.array(z.string().url()),
});

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  rating: z.number().min(0).max(5),
  colors: z.array(ColorSchema),
});

type Color = z.infer<typeof ColorSchema>;
type Product = z.infer<typeof ProductSchema>;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const parsedProduct = ProductSchema.parse(product);

  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<Color>(
    parsedProduct.colors[0]
  );

  const handleMouseEnter = (): void => setHovered(true);
  const handleMouseLeave = (): void => setHovered(false);

  const handleColorChange = (color: Color): void => {
    setSelectedColor(color);
    setHovered(false);
  };

  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5 w-full max-w-[409.66px] mx-auto text-[#000000] cursor-pointer">
      <div
        className="w-full aspect-[2/3] relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/product/${parsedProduct.id}`}>
          <Image
            src={hovered ? selectedColor.images[1] : selectedColor.images[0]}
            alt={`${parsedProduct.name} - ${selectedColor.colorName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-sm transition-opacity duration-300 ease-in-out"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3 md:gap-[15px] w-full">
        <div className="flex flex-col gap-1 sm:gap-[7px]">
          <div className="flex flex-col gap-[1px]">
            <Link href={`/product/${parsedProduct.id}`}>
              <h1 className="font-light text-[11.25px] leading-[20px] tracking-[0.24px]">
                {parsedProduct.name}
              </h1>
              <h3 className="font-normal text-[13.13px] leading-[19px] tracking-[0.28px]">
                {parsedProduct.description}
              </h3>
            </Link>
          </div>
          <p className="font-light text-[10.31px] leading-[19px] tracking-[0.24px]">
            {parsedProduct.price}
          </p>
        </div>

        <div className="flex gap-2">
          {parsedProduct.colors.map((color, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleColorChange(color);
              }}
              className={`w-4 h-4 rounded-full border border-[#808080] ${
                selectedColor.colorName === color.colorName
                  ? "border-2 border-black"
                  : ""
              }`}
              style={{ backgroundColor: color.colorName.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
