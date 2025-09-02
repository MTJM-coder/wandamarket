import React from 'react'
import NavBar from '@/Layouts/Navbar'
import DropdownMenu from '@/Layouts/DropDownMenu'
import FilterSideBar from '@/Layouts/FilterSideBar'
import Products from '@/Layouts/Products'
import { useState } from 'react';
import Footer from '@/Layouts/footer'
const PoductPage = () => {
  const [filters, setFilters] = useState({
    city: [],
    category: [],
    minPrice: 0,
    maxPrice: 1000000,
    rating: null
  });
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <div className="block">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="mt-32 px-4 flex flex-col lg:flex-row gap-6">
  {/* Sidebar */}
  <div className="lg:w-1/4 w-full md-display-hidden">
    <FilterSideBar filters={filters} setFilters={setFilters} />
  </div>

  {/* Produits */}
  <div className="lg:w-3/4 w-full">
    <Products filters={filters} searchTerm={searchTerm} />
  </div>

</div>
    <Footer></Footer>

    </>
  )
}

export default PoductPage