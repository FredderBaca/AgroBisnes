import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Ofertas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: '👋 Hola, ¿en qué puedo ayudarte hoy?', isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const sliderRef = useRef(null);
  const modalContentRef = useRef(null);
  const navigate = useNavigate();

  // Datos de productos en oferta
  const products = [
    { 
      id: 1,
      title: 'Saco de Arroz', 
      image: '/img/arrozf.jpeg', 
      description: 'Arroz de alta calidad, ideal para consumo familiar o comercial.', 
      short_desc: 'Fresco de temporada',
      old_price: 'C$ 250', 
      new_price: 'C$ 200', 
      provider: 'Cesar Bermudez',
      discount: '-20%'
    },
    { 
      id: 2,
      title: 'Saco de Maíz', 
      image: '/img/sacoMaiz.webp', 
      description: 'Maíz amarillo de grano entero, excelente para tortillas.', 
      short_desc: 'Grano básico nacional',
      old_price: 'C$ 220', 
      new_price: 'C$ 180', 
      provider: 'Fredder Baca',
      discount: '-18%'
    },
    { 
      id: 3,
      title: 'Saco de Maní', 
      image: '/img/mani.jpg', 
      description: 'Maní seco y seleccionado, perfecto para snacks o mantequilla.', 
      short_desc: 'Grano de exportación',
      old_price: 'C$ 270', 
      new_price: 'C$ 220', 
      provider: 'Jacinto Barba',
      discount: '-19%'
    },
    { 
      id: 4,
      title: 'Canasta de Vegetales', 
      image: '/img/canastas.jpeg', 
      description: 'Canasta variada con vegetales frescos de temporada.', 
      short_desc: 'Frescos de temporada',
      old_price: 'C$ 180', 
      new_price: 'C$ 150', 
      provider: 'Messi Ronaldo',
      discount: '-17%'
    }
  ];

  const categories = [
    { id: 'proveedores', name: 'Proveedores', image: '/img/1.png', href: '/proveedores' },
    { id: 'granos-basicos', name: 'Granos Básicos', image: '/img/2.png', href: '/granos-basicos' },
    { id: 'frutas', name: 'Frutas', image: '/img/3.png', href: '/frutas' },
    { id: 'verduras', name: 'Verduras', image: '/img/4.png', href: '/verduras' },
    { id: 'categoria-libre', name: 'Categoría libre', image: '/img/free.png', href: '/categoria-libre' }
  ];

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

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
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
        text: "🤖 Estoy procesando tu consulta sobre ofertas especiales. ¿Te interesa alguna oferta en particular?", 
        isUser: false 
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const categoryItems = slider.querySelector("#category-items");
    if (!categoryItems) return;

    const items = categoryItems.innerHTML;
    categoryItems.innerHTML = items + items;

    const handleMouseEnter = () => {
      categoryItems.classList.add('paused');
    };

    const handleMouseLeave = () => {
      categoryItems.classList.remove('paused');
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white">
          <Link to="/inicio">
            <h1 className="text-4xl font-bold text-black">Agro<span className="text-green-700 font-bold">Bisnes</span></h1>
          </Link>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link className="text-black hover:text-green-700 font-bold transition-colors" to="/inicio">Inicio</Link>
            <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/productos">Productos</Link>
            <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/notificacion">Notificaciones</Link>
            <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/business/perfil">Perfil</Link>
          </nav>
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

        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto flex">
            <Link to="/productos" className="w-1/2 py-3 text-center font-semibold text-gray-500 hover:text-green-700">Productos</Link>
            <Link to="/ofertas" className="w-1/2 py-3 text-center font-semibold border-b-2 border-green-700 text-green-700">Ofertas</Link>
            <Link to="/estadistica" className="w-1/2 py-3 text-center font-semibold border-b-2 border-transparent text-gray-500 hover:text-green-700">Estadísticas</Link>
          </div>
        </div>
      </header>

      <main 
        className="min-h-screen"
        style={{
          backgroundImage: "url('/img/fondo1.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="bg-gray-100 py-2">
          <section className="max-w-7xl mx-auto px-4 py-10 flex justify-center bg-gray-100">
            <div className="relative w-full overflow-hidden">
              <div 
                ref={sliderRef}
                id="slider" 
                className="flex gap-6 animate-carousel md:animate-none md:justify-center"
              >
                <div id="category-items" className="flex gap-6">
                  {categories.map((category) => (
                    <Link 
                      key={category.id} 
                      to={category.href} 
                      className="flex-none flex flex-col items-center min-w-[100px] group"
                    >
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="rounded-full w-20 h-20 object-cover group-hover:scale-110 transition" 
                      />
                      <span className="text-sm mt-2">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-gray-200 py-1 px-4"></div>

        <section className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-800">Ofertas Especiales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="product-card cursor-pointer border rounded-xl p-4 shadow-md hover:shadow-lg bg-white transition-all duration-300 relative"
                onClick={() => openModal(product)}
              >
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {product.discount}
                </div>
                
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="rounded-lg w-full h-32 object-cover mb-4" 
                />
                <h3 className="text-md font-bold truncate">{product.title}</h3>
                <p className="text-gray-600 text-sm truncate">{product.short_desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-400 line-through text-sm">{product.old_price}</span>
                  <span className="text-green-700 font-bold">{product.new_price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full bg-white mt-8">
          <img src="/img/trap.png" alt="Banner promocional" />
        </div>
      </main>

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

      {isModalOpen && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            ref={modalContentRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform scale-95 opacity-0 transition-all duration-300 p-6 relative flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalEnter 0.3s ease-out forwards'
            }}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-500 hover:text-white rounded-full p-2 transition"
            >
              ✖
            </button>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="rounded-xl object-cover w-full h-64 md:h-80 shadow-md"
                />
              </div>

              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedProduct.title}</h3>
                  <p className="text-gray-600 mb-3">{selectedProduct.description}</p>
                  <div className="mb-4">
                    <span className="text-gray-400 line-through mr-2">{selectedProduct.old_price}</span>
                    <span className="text-green-700 font-bold text-xl">{selectedProduct.new_price}</span>
                    <span className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      {selectedProduct.discount}
                    </span>
                  </div>
                  <div className="text-gray-700 mb-6">
                    <span className="font-semibold">Proveedor:</span> {selectedProduct.provider}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button className="w-full bg-green-700 text-white px-5 py-2.5 rounded-xl shadow hover:bg-green-800 transition">
                    Chatear
                  </button>
                  <button 
                    onClick={closeModal}
                    className="w-full border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-gray-100 transition"
                  >
                    Cerrar
                  </button>
                  <a 
                    href={`https://wa.me/50588888888?text=Hola%20${encodeURIComponent(selectedProduct.provider)},%20me%20interesa%20la%20oferta%20de%20${encodeURIComponent(selectedProduct.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white px-5 py-2.5 rounded-xl shadow hover:bg-green-600 transition text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="fixed bottom-6 right-6 bg-green-700 text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center cursor-pointer z-50 hover:scale-110 transition-transform"
        onClick={toggleAssistant}
      >
        <i className="fas fa-comments text-2xl"></i>
      </div>

      <div 
        className={`fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl flex-col z-50 overflow-hidden ${isChatOpen ? 'flex' : 'hidden'}`}
      >
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-3 flex justify-between items-center">
          <span className="font-semibold"><i className="fas fa-seedling mr-2"></i> Asistente Agro</span>
          <button onClick={toggleAssistant} className="text-lg hover:text-red-300">✖</button>
        </div>
        <div className="p-4 h-72 overflow-y-auto text-sm space-y-2">
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
            type="text" 
            placeholder="Escribe un mensaje..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 px-3 py-2 text-sm border rounded-l-xl focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <button 
            onClick={sendMessage}
            className="bg-green-700 text-white px-4 rounded-r-xl hover:bg-green-800 transition"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes modalEnter {
          to { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 768px) {
          .animate-carousel { 
            display: flex; 
            width: max-content; 
            animation: scrollLoop 20s linear infinite; 
          }
          .paused { 
            animation-play-state: paused !important; 
          }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Ofertas;