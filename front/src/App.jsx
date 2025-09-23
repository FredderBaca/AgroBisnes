import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaArrowRight, FaStar, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaLinkedin } from 'react-icons/fa';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRef = useRef(null);

  // Busqueda de productos
  const searchProduct = () => {
    if (searchQuery.trim() !== '') {
      window.location.href = `/busqueda?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Manejar la tecla Enter en la búsqueda
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchProduct();
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchProduct={searchProduct}
        handleKeyPress={handleKeyPress}
      />
      <MainContent sliderRef={sliderRef} />
      <Footer />
    </div>
  );
};

const Header = ({ searchQuery, setSearchQuery, searchProduct, handleKeyPress }) => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white">
        <a href="/inicio">
          <h1 className="text-4xl font-bold text-black">Agro<span className="text-green-700 font-bold">Bisnes</span></h1>
        </a>
        <nav className="flex gap-6 mt-4 md:mt-0">
          <a className="text-black border-b-2 border-green-700 hover:text-green-700 font-bold transition-colors" href="/inicio">Inicio</a>
          <a className="text-black text-lg hover:text-green-700 font-bold transition-colors" href="/producto">Productos</a>
          <a className="text-black text-lg hover:text-green-700 font-bold transition-colors" href="/notificacion">Notificaciones</a>
          <a className="text-black text-lg hover:text-green-700 font-bold transition-colors" href="/negocio/perfil">Perfil</a>
        </nav>
      </div>
    </div>
    <div className="bg-green-700 py-2"></div>

    <section className="py-6 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex">
          <input 
            id="searchInput" 
            type="text" 
            placeholder="Buscar productos o usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-green-700"
          />
          <button 
            onClick={searchProduct} 
            className="bg-green-700 px-4 py-2 rounded-r-full text-white hover:bg-green-800 transition-colors"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  </header>
);

const MainContent = ({ sliderRef }) => (
  <main className="min-h-screen">
    <HeroSection />
    <CategoriesSection sliderRef={sliderRef} />
    <FeaturedProducts />
    <FeaturedSuppliers />
  </main>
);

const HeroSection = () => (
  <section className="relative bg-white py-12 md:py-24">
    <div className="absolute inset-0 bg-[url('https://placehold.co/1920x800/dcfce7/15803d?text=Agro+Marketplace')] bg-cover bg-center opacity-30"></div>
    <div className="relative max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-4xl md:text-6xl font-extrabold text-green-800">Tu Mercado Agrícola Digital</h2>
      <p className="mt-4 text-lg md:text-2xl text-green-700 font-medium">Conectando a la comunidad con productos frescos, locales y de alta calidad.</p>
      <a href="/producto">
        <button className="mt-8 px-6 py-3 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition-colors shadow-lg">
          ¡Comienza a comprar ahora!
        </button>
      </a>
    </div>
  </section>
);

const CategoriesSection = ({ sliderRef }) => {
  const categories = [
    { id: 'proveedores', name: 'Proveedores', image: 'img/1.png', href: '/proveedores' },
    { id: 'granos-basicos', name: 'Granos Básicos', image: 'img/2.png', href: '/granos-basicos' },
    { id: 'frutas', name: 'Frutas', image: 'img/3.png', href: '/frutas' },
    { id: 'verduras', name: 'Verduras', image: 'img/4.png', href: '/verduras' },
    { id: 'categoria-libre', name: 'Categoría libre', image: 'img/free.png', href: '/categoria-libre' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 flex justify-center bg-gray-100">
      <div className="relative w-full">
        <div 
          ref={sliderRef}
          id="slider"
          className="flex overflow-x-auto gap-6 scrollbar-hide px-4 md:px-12 justify-start md:justify-center snap-x snap-mandatory scroll-smooth"
        >
          {categories.map((category) => (
            <a key={category.id} href={category.href} id={category.id}>
              <div className="flex-none flex flex-col items-center min-w-[100px] group snap-start">
                <img
                  src={category.image}
                  alt={`Icono de ${category.name}`}
                  className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition"
                />
                <span className="text-sm mt-2 text-center text-green-600">{category.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: 'Saco de Arroz', description: 'Frescas de temporada', price: '$20', image: 'img/arrozf.jpeg' },
    { id: 2, name: 'Saco de Maíz', description: 'Grano básico nacional', price: '$35', image: 'img/sacoMaiz.webp' },
    { id: 3, name: 'Saco de Mani', description: 'Grano básico nacional', price: '$35', image: 'img/mani.jpg' },
    { id: 4, name: 'Canasta de Vegetales', description: 'Grano básico nacional', price: '$35', image: 'img/canastas.jpeg' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-10">Productos Destacados</h2>
      <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
            <img src={product.image} alt={product.name} className="rounded-lg w-full h-32 object-cover mb-4" />
            <h3 className="text-md font-bold truncate">{product.name}</h3>
            <p className="text-gray-600 text-sm truncate">{product.description}</p>
            <span className="text-green-700 font-bold">{product.price}</span>
          </div>
        ))}
        <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
          <a href="/producto" className="h-full w-full flex flex-col justify-center items-center text-center text-gray-700 hover:text-green-700 transition">
            <FaArrowRight className="text-3xl mb-2" />
            <span className="font-semibold">Ver más productos</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const FeaturedSuppliers = () => {
  const suppliers = [
    { id: 1, name: 'Jacinto Barba', description: 'Ganadero', rating: '5.0', image: 'img/jacinto.jpeg' },
    { id: 2, name: 'Marta Galo', description: 'Productos lácteos de la granja', rating: '4.9', image: 'img/maria.webp' },
    { id: 3, name: 'Rafael Hernandez', description: 'Frutas de temporada', rating: '4.7', image: 'img/payo.jpg' },
    { id: 4, name: 'Rafael Hernandez', description: 'Frutas de temporada', rating: '4.7', image: 'img/payo.jpg' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Proveedores Destacados</h2>
      <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
            <img src={supplier.image} alt={supplier.name} className="rounded-lg w-full h-32 object-cover mb-4" />
            <h3 className="text-md font-bold truncate">{supplier.name}</h3>
            <p className="text-gray-600 text-sm truncate">{supplier.description}</p>
            <span className="text-green-700 font-bold">
              {supplier.rating} <FaStar className="text-yellow-400 inline" />
            </span>
          </div>
        ))}
        <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
          <a href="/proveedores" className="h-full w-full flex flex-col justify-center items-center text-center text-gray-700 hover:text-green-700 transition">
            <FaArrowRight className="text-3xl mb-2" />
            <span className="font-semibold">Ver más proveedores</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <>
    <div className="w-full bg-white">
      <img src="img/trap.png" alt="Trap" />
    </div>

    <div className="bg-amber-500 py-2"></div>
    
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Agro<span className="text-green-700">Bisnes</span></h1>
          <p className="mt-2 text-sm">Conectando productores y compradores en toda la región.</p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Explora</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Lo más vendido</a></li>
            <li><a href="#" className="hover:underline">Top ciudades</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Socios</h3>
          <ul className="space-y-2">
            <li><a href="/negocio/registro" className="hover:underline">Registra tu negocio</a></li>
            <li><a href="#" className="hover:underline">Centro de Socios</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
              <FaFacebook className="h-6 w-6 text-xl" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
              <FaInstagram className="h-6 w-6 text-xl" />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
              <FaTiktok className="h-6 w-6 text-xl" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
              <FaTwitter className="h-6 w-6 text-xl" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
              <FaLinkedin className="h-6 w-6 text-xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
        <p>NovaByte © 2025 - Todos los derechos reservados</p>
      </div>
    </footer>
  </>
);

// Hook personalizado para el carrusel
const useSlider = (sliderRef) => {
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const sliderItems = slider.querySelectorAll("a");
    let itemWidth = 0;
    let scrollInterval;
    let direction = 1; // 1 = derecha, -1 = izquierda
    const scrollSpeed = 3000; // cada 3 segundos

    const initSlider = () => {
      const style = getComputedStyle(slider);
      const gap = parseInt(style.columnGap || style.gap || 0);
      if (sliderItems.length > 0) {
        itemWidth = sliderItems[0].offsetWidth + gap;
        startScroll();
      }
    };

    const startScroll = () => {
      clearInterval(scrollInterval);
      scrollInterval = setInterval(() => {
        if (!slider) return;
        
        // Si estamos yendo a la derecha
        if (direction === 1) {
          if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
            direction = -1; // cambiar a izquierda
          } else {
            slider.scrollLeft += itemWidth;
          }
        } 
        // Si estamos yendo a la izquierda
        else {
          if (slider.scrollLeft <= 0) {
            direction = 1; // cambiar a derecha
          } else {
            slider.scrollLeft -= itemWidth;
          }
        }
      }, scrollSpeed);
    };

    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    // Esperar a que carguen las imágenes
    if (document.readyState === 'complete') {
      initSlider();
    } else {
      window.addEventListener('load', initSlider);
    }

    // Pausar/reanudar al pasar el mouse
    slider.addEventListener("mouseenter", stopScroll);
    slider.addEventListener("mouseleave", startScroll);

    // Arrastre manual
    let isMouseDown = false;
    let startX, scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      stopScroll();
    });

    slider.addEventListener("mouseup", () => {
      isMouseDown = false;
      startScroll();
    });

    slider.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Cleanup
    return () => {
      clearInterval(scrollInterval);
      slider.removeEventListener("mouseenter", stopScroll);
      slider.removeEventListener("mouseleave", startScroll);
      window.removeEventListener('load', initSlider);
    };
  }, [sliderRef]);
};

// Componente wrapper que usa el hook del carrusel
const HomePageWithSlider = () => {
  const sliderRef = useRef(null);
  useSlider(sliderRef);

  return <HomePage sliderRef={sliderRef} />;
};

export default HomePageWithSlider;