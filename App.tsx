
import React, { useState, useEffect, useMemo } from 'react';
import { Product } from './types';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 30;

  // Load data from static JSON file
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await fetch('./data.json');
        const data = await response.json();
        
        // For demonstration, if we had 3000 items in data.json it would load here.
        // We'll simulate a larger set if data.json is small.
        if (data.length < 50) {
            const simulatedData: Product[] = [];
            for (let i = 0; i < 3000; i++) {
                const baseItem = data[i % data.length];
                simulatedData.push({
                    ...baseItem,
                    id: i + 1,
                    name: `${baseItem.name} ${i + 1}`,
                    image: `https://picsum.photos/seed/${i + 1}/400/300`
                });
            }
            setProducts(simulatedData);
        } else {
            setProducts(data);
        }
      } catch (error) {
        console.error('Error loading catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gray-900 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">QuickCatalog Pro</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Premium static catalog for businesses. Fast, responsive, and always online.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          totalCount={filteredProducts.length} 
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading catalog items...</p>
          </div>
        ) : (
          <>
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {currentItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500">Try adjusting your search terms.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 font-semibold hover:text-blue-500"
                >
                  Clear all filters
                </button>
              </div>
            )}

            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 pt-8 pb-12 px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} QuickCatalog Pro. Built with performance in mind.
        </p>
      </footer>
    </div>
  );
};

export default App;
