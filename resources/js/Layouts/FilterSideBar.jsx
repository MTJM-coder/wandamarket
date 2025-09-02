import React from "react";
import { FiX } from "react-icons/fi";

const FilterSideBar = ({ filters, setFilters }) => {
  // Ajoute ou retire un élément dans un tableau (toggle)
  const toggleValue = (array, value) => {
    return array.includes(value)
      ? array.filter((v) => v !== value) // retire
      : [...array, value]; // ajoute
  };

  // Gestion catégories multiples
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: toggleValue(prev.category, category),
    }));
  };

  // Gestion villes multiples
  const handleCityChange = (city) => {
    setFilters((prev) => ({
      ...prev,
      city: toggleValue(prev.city, city),
    }));
  };

  // Gestion prix
  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: parseInt(e.target.value),
    }));
  };

  return (
    <div className="left-0 top-0 h-full w-64 bg-white shadow-lg z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Filtres</h2>
      
      </div>

      {/* Contenu */}
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        {/* Catégories */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Catégories</h3>
          <ul className="space-y-1">
            {["Électronique", "Vêtements", "Accessoires"].map((cat) => (
              <li key={cat}>
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <span className="ml-2">{cat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prix */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Prix</h3>
          <input
            type="range"
            min="0"
            max="1000000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0 FCFA</span>
            <span>{filters.maxPrice.toLocaleString()} FCFA</span>
          </div>
        </div>

        {/* Ville */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Ville</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              "Douala",
              "Yaoundé",
              "Dschang",
              "Edéa",
              "Buea",
              "Ebolowa",
              "Bamenda",
              "Bagangté",
              "Bafoussam",
            ].map((city) => (
              <li key={city}>
                <input
                  type="checkbox"
                  checked={filters.city.includes(city)}
                  onChange={() => handleCityChange(city)}
                />
                <span className="ml-2">{city}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Note */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Note</h3>
          <ul className="space-y-1">
            {[4, 3, 2].map((rating) => (
              <li key={rating}>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, rating }))
                  }
                />
                <span className="ml-2">{rating}★ et plus</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
