import { useState } from 'react';
import '../styles/Categories.css';

interface Category {
  id: string;
  name: string;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const Categories = ({ categories, selectedCategory, onSelectCategory }: CategoriesProps) => {
  return (
    <div className="categories">
      <button
        className={`category-button ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        Tümü
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}; 