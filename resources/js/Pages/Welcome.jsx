import React from 'react'
import NavBar from '@/Layouts/Navbar'
import DropdownMenu from '@/Layouts/DropDownMenu'
import FilterSideBar from '@/Layouts/FilterSideBar'
import Products from '@/Layouts/Products'
import { useState } from 'react';
import Footer from '@/Layouts/footer'
import { FaStore } from 'react-icons/fa'
const HomePage = () => {

  const [filters, setFilters] = useState({
    city: [],
    category: [],
    minPrice: 0,
    maxPrice: 1000000,
    rating: null
  });
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter,setShowFilter]=useState(false)
  const [activeTab,setActiveTab]=useState('Accueil')

  return (
    <>
      <div className="block">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="mt-32 px-4 flex flex-col lg:flex-row gap-6">
  {/* Sidebar */}
  <div className={`lg:w-1/4 w-full md-display-hidden  ${showFilter?  "inline-block":"hidden" } md:inline-block`}>
    <FilterSideBar filters={filters} setFilters={setFilters} />
  </div>

  {/* Produits */}
  <div className="lg:w-3/4 w-full">
    <Products filters={filters} searchTerm={searchTerm} />
  </div>

</div>
    <Footer></Footer>

    

          <section className="py-16 bg-[#071726] text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Vous êtes artisan ou commerçant ?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Rejoignez WANDA MARKET et augmentez votre visibilité en vendant vos produits à travers tout le Cameroun
              </p>
              <a
                href="/create-shop"
                className="inline-flex items-center px-8 py-4 bg-[#ec8d0c] text-white font-bold rounded-lg hover:bg-[#d93d0f] transition transform hover:scale-105"
              >
                Créer ma boutique gratuitement <FaStore className="ml-3" />
              </a>
            </div>
          </section>
        

        {/* Pied de page */}
       {/* <footer className="bg-gray-900 text-gray-300 py-12"></footer> */}
      
    </>
  );
};

export default HomePage;
