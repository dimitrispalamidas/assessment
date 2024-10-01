"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
  imagePath?: string;
  active: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://be.givelink.app/data")
      .then((response) => {
        console.log(response.data);
        setProducts(Object.values(response.data.products));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Error fetching data");
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-4 p-2'>
      {products
        .filter((product) => product.active)
        .map((product, index) => (
          <div
            key={index}
            className='cursor-pointer flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
          >
            <Image
              alt='product image'
              src={
                `https://be.givelink.app/images/products/${product.imagePath} ` ||
                ""
              }
              height={150}
              width={150}
              className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48'
            />
            <h3 className='line-clamp-3 text-sm md:text-lg'>{product.name}</h3>
            <p className='font-bold text-sm md:text-lg'>{product.price}€</p>
          </div>
        ))}
    </div>
  );
};

export default Products;
