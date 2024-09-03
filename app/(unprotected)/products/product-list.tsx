import ProductCard from "./product-card";
import products from "@/../../public/products.json";

const ProductList: React.FC = () => {
  const repeatedProducts = Array(10).fill(products).flat();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-2 sm:gap-x-3 gap-y-9 sm:gap-y-16 px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16  ">
      {repeatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
