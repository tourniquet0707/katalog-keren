
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, totalCount }) => {
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-4 sm:px-6 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
            placeholder="Search products by name..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="text-sm font-medium text-gray-500 whitespace-nowrap">
          Showing <span className="text-gray-900">{totalCount}</span> items
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
