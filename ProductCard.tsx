
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">
            {formattedPrice}
          </span>
          <button className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
