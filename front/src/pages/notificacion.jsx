import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Notificacion = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: '👋 Hola, ¿en qué puedo ayudarte hoy?', isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nueva oferta en maíz',
      message: 'Un productor ha bajado el precio del maíz en tu zona.',
      read: false
    },
    {
      id: 2,
      title: 'Promoción en Granos',
      message: 'Descuentos especiales en granos básicos esta semana.',
      read: false
    },
    {
      id: 3,
      title: 'Compra confirmada',
      message: 'Tu pedido de tomates fue aceptado por el productor.',
      read: false
    },
    {
      id: 4,
      title: 'Nuevo mensaje',
      message: 'Tienes un nuevo mensaje de Juan Pérez.',
      read: true
    },
    {
      id: 5,
      title: 'Producto agotado',
      message: 'El saco de arroz que seguías ya no está disponible.',
      read: true
    }
  ]);

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

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
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
        text: "🤖 Estoy procesando tu consulta sobre notificaciones. ¿Necesitas ayuda con alguna notificación en particular?", 
        isUser: false 
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white">
            <Link to="/inicio">
              <h1 className="text-4xl font-bold text-black">Agro<span className="text-green-700 font-bold">Bisnes</span></h1>
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link className="text-black hover:text-green-700 font-bold transition-colors" to="/inicio">Inicio</Link>
              <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/productos">Productos</Link>
              <Link className="text-black text-lg border-b-2 border-green-700 hover:text-green-700 font-bold transition-colors" to="/notificacion">Notificaciones</Link>
              <Link className="text-black text-lg hover:text-green-700 font-bold transition-colors" to="/business/perfil">Perfil</Link>
            </nav>
          </div>
        </div>
        <div className="bg-green-700 py-2"></div>

        <section className="py-6 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex">
              <input 
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
            <Link 
              to="/notificacion" 
              className="w-1/2 py-3 text-center font-semibold border-b-2 border-green-700 text-green-700"
            >
              Notificaciones {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link 
              to="/mensajes" 
              className="w-1/2 py-3 text-center font-semibold border-b-2 border-transparent text-gray-500 hover:text-green-700"
            >
              Mensajes
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-lg shadow-md mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Notificaciones {unreadCount > 0 && `(${unreadCount} sin leer)`}
          </h2>
          {notifications.length > 0 && (
            <button 
              onClick={clearAllNotifications}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Limpiar todas
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`bg-white p-4 rounded-lg shadow flex justify-between items-center border-l-4 ${
                  notification.read ? 'border-gray-300' : 'border-green-500'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-bold ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">Hace 2 horas</p>
                </div>
                <div className="flex gap-2 ml-4">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm"
                    >
                      Marcar como leída
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-bell text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-500">No hay notificaciones</h3>
              <p className="text-gray-400 mt-2">Todas las notificaciones aparecerán aquí</p>
            </div>
          )}
        </div>
      </main>

      <div className="bg-amber-500 py-2 mt-5"></div>

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
    </div>
  );
};

export default Notificacion;