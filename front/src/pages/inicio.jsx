import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Inicio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: '👋 Hola, ¿en qué puedo ayudarte hoy?', isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  const sliderRef = useRef(null);
  const bannerContainerRef = useRef(null);
  const navigate = useNavigate();

  const searchProduct = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/busqueda?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchProduct();
    }
  };

  const toggleAssistant = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (chatInput.trim() === '') return;

    const newUserMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');

    setTimeout(() => {
      const botResponse = { 
        text: "🤖 Estoy procesando tu consulta... En una versión completa, aquí integraríamos un servicio de IA para responder tus preguntas sobre productos agrícolas.", 
        isUser: false 
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const sliderItems = slider.querySelectorAll("a");
    let itemWidth = 0;
    let scrollInterval;
    let direction = 1;
    const scrollSpeed = 3000;

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
        
        if (direction === 1) {
          if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
            direction = -1;
          } else {
            slider.scrollLeft += itemWidth;
          }
        } else {
          if (slider.scrollLeft <= 0) {
            direction = 1;
          } else {
            slider.scrollLeft -= itemWidth;
          }
        }
      }, scrollSpeed);
    };

    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    if (document.readyState === 'complete') {
      initSlider();
    } else {
      window.addEventListener('load', initSlider);
    }

    slider.addEventListener("mouseenter", stopScroll);
    slider.addEventListener("mouseleave", startScroll);

    let isMouseDown = false;
    let startX, scrollLeft;

    const handleMouseDown = (e) => {
      isMouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      stopScroll();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      startScroll();
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(scrollInterval);
      slider.removeEventListener("mouseenter", stopScroll);
      slider.removeEventListener("mouseleave", startScroll);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('load', initSlider);
    };
  }, []);

  useEffect(() => {
    const banners = document.querySelectorAll(".banner");
    let currentIndex = 0;
    const intervalTime = 5000;

    function showBanner(index) {
      banners.forEach((banner, i) => {
        banner.style.opacity = (i === index) ? "1" : "0";
      });
    }

    function nextBanner() {
      currentIndex = (currentIndex + 1) % banners.length;
      showBanner(currentIndex);
    }

    const bannerInterval = setInterval(nextBanner, intervalTime);

    return () => {
      clearInterval(bannerInterval);
    };
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white">
            <Link to="/inicio">
              <h1 className="text-4xl font-bold text-black">Agro<span className="text-green-700 font-bold">Bisnes</span></h1>
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link className="text-black border-b-2 border-green-700 hover:text-green-700 font-bold transition-colors" to="/inicio">Inicio</Link>
              <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/productos">Productos</Link>
              <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/notificacion">Notificaciones</Link>
              <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/business/perfil">Perfil</Link>
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
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </section>
      </header>

      <main className="min-h-screen">
        <section className="relative bg-white py-12 md:py-24">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x800/dcfce7/15803d?text=Agro+Marketplace')] bg-cover bg-center opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-green-800">Tu Mercado Agrícola Digital</h2>
            <p className="mt-4 text-lg md:text-2xl text-green-700 font-medium">Conectando a la comunidad con productos frescos, locales y de alta calidad.</p>
            <Link to="/productos">
              <button className="mt-8 px-6 py-3 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition-colors shadow-lg">
                ¡Comienza a comprar ahora!
              </button>
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10 flex justify-center bg-gray-100">
          <div className="relative w-full">
            <div
              ref={sliderRef}
              id="slider"
              className="flex overflow-x-auto gap-6 scrollbar-hide px-4 md:px-12 justify-start md:justify-center snap-x snap-mandatory scroll-smooth"
            >
              <Link to="/proveedores" id="proveedores">
                <div className="flex-none flex flex-col items-center min-w-[100px] group snap-start">
                  <img
                    src="/img/1.png"
                    alt="Icono de proveedores"
                    className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition"
                  />
                  <span className="text-sm mt-2 text-center text-green-600">Proveedores</span>
                </div>
              </Link>

              <Link to="/granos-basicos" id="granos-basicos">
                <div className="flex-none flex flex-col items-center min-w-[100px] group snap-start">
                  <img
                    src="/img/2.png"
                    alt="Icono de granos basicos"
                    className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition"
                  />
                  <span className="text-sm mt-2 text-center text-green-600">Granos Básicos</span>
                </div>
              </Link>

              <Link to="/frutas" id="frutas">
                <div className="flex-none flex flex-col items-center min-w-[100px] group snap-start">
                  <img
                    src="/img/3.png"
                    alt="Icono de frutas"
                    className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition"
                  />
                  <span className="text-sm mt-2 text-center text-green-600">Frutas</span>
                </div>
              </Link>

              <Link to="/verduras" id="verduras">
                <div className="flex-none flex flex-col items-center min-w-[100px] group snap-start">
                  <img
                    src="/img/4.png"
                    alt="Icono de verduras"
                    className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition"
                  />
                  <span className="text-sm mt-2 text-center text-green-600">Verduras</span>
                </div>
              </Link>

              <Link to="/categoria-libre" id="categoria-libre">
                <div className="flex-none flex flex-col items-center min-w-[100px] group snap-start">
                  <img
                    src="/img/free.png"
                    alt="Icono de categoria libre"
                    className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition"
                  />
                  <span className="text-sm mt-2 text-center text-green-600">Categoría libre</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative w-full h-[400px] overflow-hidden">
          <div id="bannerContainer" className="w-full h-full relative">
            <div className="banner absolute inset-0 bg-cover bg-center flex items-center justify-center text-white text-center transition-opacity duration-1000 opacity-100"
                 style={{backgroundImage: "url(/img/B1.png)"}}>
              <Link to="/productos" className="px-6 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
                Ver más información
              </Link>
            </div>
            <div className="banner absolute inset-0 bg-cover bg-center flex items-center justify-center text-white text-center transition-opacity duration-1000 opacity-0"
                 style={{backgroundImage: "url('https://placehold.co/1920x400/15803d/ffffff?text=Oferta+2')"}}>
              <Link to="/productos" className="px-6 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
                Ver más información
              </Link>
            </div>
            <div className="banner absolute inset-0 bg-cover bg-center flex items-center justify-center text-white text-center transition-opacity duration-1000 opacity-0"
                 style={{backgroundImage: "url('https://placehold.co/1920x400/16a34a/ffffff?text=Oferta+3')"}}>
              <Link to="/productos" className="px-6 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
                Ver más información
              </Link>
            </div>
            <div className="banner absolute inset-0 bg-cover bg-center flex items-center justify-center text-white text-center transition-opacity duration-1000 opacity-0"
                 style={{backgroundImage: "url('https://placehold.co/1920x400/22c55e/ffffff?text=Oferta+4')"}}>
              <Link to="/productos" className="px-6 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
                Ver más información
              </Link>
            </div>
            <div className="banner absolute inset-0 bg-cover bg-center flex items-center justify-center text-white text-center transition-opacity duration-1000 opacity-0"
                 style={{backgroundImage: "url('https://placehold.co/1920x400/4ade80/ffffff?text=Oferta+5')"}}>
              <Link to="/productos" className="px-6 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
                Ver más información
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10 bg-white">
          <h2 className="text-3xl font-bold text-center mb-10 text-black">Ofertas Especiales</h2>
          <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start bg-amber-50">
              <img src="/img/naranjas.jpeg" alt="Naranjas Frescas" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Naranjas Frescas</h3>
              <p className="text-gray-600 text-sm truncate">Del huerto a tu mesa</p>
              <div className="mt-2">
                <span className="text-gray-400 line-through text-sm">$12</span>
                <span className="text-green-700 font-bold text-lg ml-2">$8</span>
              </div>
              <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-35%</span>
            </div>

            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start bg-amber-50">
              <img src="/img/tomate.jpg" alt="Tomates Orgánicos" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Tomates Orgánicos</h3>
              <p className="text-gray-600 text-sm truncate">Cultivo local certificado</p>
              <div className="mt-2">
                <span className="text-gray-400 line-through text-sm">$15</span>
                <span className="text-green-700 font-bold text-lg ml-2">$10</span>
              </div>
              <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-30%</span>
            </div>

            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start bg-amber-50">
              <img src="/img/tipos-cebollas.jpg" alt="Cebollas Moradas" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Cebollas Moradas</h3>
              <p className="text-gray-600 text-sm truncate">Directo del productor</p>
              <div className="mt-2">
                <span className="text-gray-400 line-through text-sm">$10</span>
                <span className="text-green-700 font-bold text-lg ml-2">$7</span>
              </div>
              <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-25%</span>
            </div>

            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start flex items-center justify-center">
              <Link to="/productos#ofertas" className="h-full w-full flex flex-col justify-center items-center text-center text-gray-700 hover:text-green-700 transition">
                <i className="fas fa-tags text-3xl mb-2 text-green-700"></i>
                <span className="font-semibold">Ver más ofertas</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-10">Productos Destacados</h2>
          <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/arrozf.jpeg" alt="Canasta de Frutas" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Saco de Arroz</h3>
              <p className="text-gray-600 text-sm truncate">Frescas de temporada</p>
              <span className="text-green-700 font-bold">$20</span>
            </div>
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/sacoMaiz.webp" alt="Saco de Maíz" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Saco de Maíz</h3>
              <p className="text-gray-600 text-sm truncate">Grano básico nacional</p>
              <span className="text-green-700 font-bold">$35</span>
            </div>
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/mani.jpg" alt="Saco de Maní" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Saco de Mani</h3>
              <p className="text-gray-600 text-sm truncate">Grano básico nacional</p>
              <span className="text-green-700 font-bold">$35</span>
            </div>

            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/canastas.jpeg" alt="Saco de Arroz" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Canasta de Vegetales</h3>
              <p className="text-gray-600 text-sm truncate">Grano básico nacional</p>
              <span className="text-green-700 font-bold">$35</span>
            </div>
  
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <Link to="/productos" className="h-full w-full flex flex-col justify-center items-center text-center text-gray-700 hover:text-green-700 transition">
                <i className="fas fa-arrow-right text-3xl mb-2"></i>
                <span className="font-semibold">Ver más productos</span>
              </Link>
            </div>
          </div>
        </section>


        <section className="max-w-7xl mx-auto px-4 py-10 bg-white mb-2">
          <h2 className="text-3xl font-bold text-center mb-10">Proveedores Destacados</h2>
          <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
          
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/jacinto.jpeg" alt="Granja Orgánica" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Jacinto Barba</h3>
              <p className="text-gray-600 text-sm truncate">Ganadero</p>
              <span className="text-green-700 font-bold">5.0 <i className="fas fa-star text-yellow-400"></i></span>
            </div>
           
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/maria.webp" alt="Lácteos Frescos" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Marta Galo</h3>
              <p className="text-gray-600 text-sm truncate">Productos lácteos de la granja</p>
              <span className="text-green-700 font-bold">4.9 <i className="fas fa-star text-yellow-400"></i></span>
            </div>
            
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/payo.jpg" alt="Huertos Locales" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Rafael Hernandez</h3>
              <p className="text-gray-600 text-sm truncate">Frutas de temporada</p>
              <span className="text-green-700 font-bold">4.7 <i className="fas fa-star text-yellow-400"></i></span>
            </div>
           
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <img src="/img/Farm boy.jpg" alt="Huertos Locales" className="rounded-lg w-full h-32 object-cover mb-4" />
              <h3 className="text-md font-bold truncate">Rafael Hernandez</h3>
              <p className="text-gray-600 text-sm truncate">Frutas de temporada</p>
              <span className="text-green-700 font-bold">4.7 <i className="fas fa-star text-yellow-400"></i></span>
            </div>
       
            <div className="flex-none w-48 sm:w-56 md:w-64 border rounded-xl p-4 shadow-md hover:shadow-lg transition snap-start">
              <Link to="/proveedores" className="h-full w-full flex flex-col justify-center items-center text-center text-gray-700 hover:text-green-700 transition">
                <i className="fas fa-arrow-right text-3xl mb-2"></i>
                <span className="font-semibold">Ver más proveedores</span>
              </Link>
            </div>
          </div>
        </section>

    
        <section className="relative bg-green-800 py-16">
          <div className="absolute inset-0 bg-[url('/img/publicidas.jpg')] bg-cover bg-center opacity-30"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">AGROBISNES</h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl mb-6">
              Somos la primera plataforma digital gratuita que conecta a productores, distribuidores y consumidores 
              en tiempo real. Eliminamos intermediarios innecesarios y construimos un mercado más 
              <span className="font-bold text-yellow-300"> justo, transparente y accesible</span> para todos.
            </p>

            <Link to="/productos" 
                  className="inline-block px-8 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition">
              ¡Descubre nuestras ofertas!
            </Link>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-6 opacity-90">
              <img src="/img/unan.png" alt="Aliado 1" className="h-12" />
              <img src="/img/Novabyte.png" alt="Aliado 2" className="h-12" />
              <img src="/img/enabas.png" alt="Aliado 3" className="h-12" />
            </div>
          </div>
        </section>
      </main>

      <div className="w-full bg-white"><img src="/img/trap.png" alt="Trap" /></div>

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
              <li><Link to="#" className="hover:underline">Lo más vendido</Link></li>
              <li><Link to="#" className="hover:underline">Top ciudades</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Socios</h3>
            <ul className="space-y-2">
              <li><Link to="/business/registro" className="hover:underline">Registra tu negocio</Link></li>
              <li><Link to="#" className="hover:underline">Centro de Socios</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
                <i className="fab fa-facebook h-6 w-6 text-xl"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
                <i className="fab fa-instagram h-6 w-6 text-xl"></i>
              </a>
 
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
                <i className="fab fa-tiktok h-6 w-6 text-xl"></i>
              </a>
          
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
                <i className="fab fa-x-twitter h-6 w-6 text-xl"></i>
              </a>
         
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">
                <i className="fab fa-linkedin h-6 w-6 text-xl"></i>
              </a>
            </div>
          </div>
        </div>

       
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
          <p>NovaByte © 2025 - Todos los derechos reservados</p>
        </div>
      </footer>

    
      <div 
        id="assistantBubble" 
        className="fixed bottom-6 right-6 bg-green-700 text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center cursor-pointer z-50 hover:scale-110 transition-transform"
        onClick={toggleAssistant}
      >
        <i className="fas fa-comments text-2xl"></i>
      </div>

    
      <div 
        id="assistantChat" 
        className={`fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl flex-col z-50 overflow-hidden ${isChatOpen ? 'flex' : 'hidden'}`}
      >
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-3 flex justify-between items-center">
          <span className="font-semibold"><i className="fas fa-seedling mr-2"></i> Asistente Agro</span>
          <button onClick={toggleAssistant} className="hover:text-red-300 text-lg">✖</button>
        </div>
        <div className="p-4 h-72 overflow-y-auto text-sm space-y-2" id="assistantMessages">
          {chatMessages.map((message, index) => (
            <div 
              key={index} 
              className={`px-3 py-2 rounded-xl max-w-[80%] ${
                message.isUser 
                  ? "bg-green-600 text-white ml-auto" 
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="p-2 border-t flex bg-gray-50">
          <input 
            id="assistantInput" 
            type="text" 
            placeholder="Escribe un mensaje..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 px-3 py-2 text-sm border rounded-l-xl focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <button 
            onClick={sendMessage} 
            className="bg-green-700 text-white px-4 rounded-r-xl hover:bg-green-800"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;