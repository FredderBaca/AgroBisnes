import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Estadisticas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: '👋 Hola, ¿en qué puedo ayudarte hoy?', isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const chartData = {
    labels: ['Frijoles', 'Maíz', 'Arroz', 'Sorgo', 'Café'],
    datasets: [
      {
        label: 'Quintales vendidos',
        data: [120, 190, 95, 70, 45],
        backgroundColor: [
          'rgba(192, 75, 75, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(210, 180, 140, 0.6)',
          'rgba(111, 78, 55, 0.6)'
        ],
        borderColor: [
          'rgba(192, 75, 75, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(210, 180, 140, 1)',
          'rgba(111, 78, 55, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ventas Mensuales por Producto',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad en Quintales'
        }
      },
    },
  };

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
        text: "🤖 Estoy procesando tu consulta sobre estadísticas. ¿Te interesa algún dato específico sobre ventas o tendencias del mercado?", 
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
        <div className="relative z-10">
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
            <Link to="/ofertas" className="w-1/2 py-3 text-center font-semibold text-gray-500 hover:text-green-700">Ofertas</Link>
            <Link to="/estadistica" className="w-1/2 py-3 text-center font-semibold border-b-2 border-green-700 text-green-700">Estadísticas</Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-100">
        <div className="bg-gray-200 py-1 px-4"></div>

        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Productos más vendidos (Quintales/Mes)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 items-center bg-white p-6 rounded-xl shadow-lg">
            <div className="md:col-span-2">
              <div className="h-80">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
            
            <div className="md:col-span-1 bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                ¡Temporada de Maíz! 🌽
              </h3>
              <p className="text-gray-600">
                Aprovecha la cosecha de <strong>Postrera</strong> (Agosto a Octubre). 
                Es el mejor momento para encontrar maíz fresco y a buen precio en toda Nicaragua. 
                ¡Ideal para tus nacatamales, güirilas y más!
              </p>
              <Link to="/ofertas">
                <button className="mt-4 bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition-colors w-full">
                  Ver ofertas de Maíz
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">190</div>
              <div className="text-gray-600">Quintales de Maíz vendidos</div>
              <div className="text-sm text-green-600 mt-2">+15% vs mes anterior</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">120</div>
              <div className="text-gray-600">Quintales de Frijoles vendidos</div>
              <div className="text-sm text-green-600 mt-2">+8% vs mes anterior</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">520</div>
              <div className="text-gray-600">Total quintales vendidos</div>
              <div className="text-sm text-green-600 mt-2">+12% crecimiento mensual</div>
            </div>
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

export default Estadisticas;