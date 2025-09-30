import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Mensajes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [modalMessageInput, setModalMessageInput] = useState('');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const modalMessagesEndRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Jacinto Barba',
      avatar: '/img/jacinto.jpeg',
      profileUrl: '/business/perfil',
      lastMessage: 'Hola, muchacho',
      unread: true,
      messages: [
        { id: 1, text: '¡Hola!', sender: 'them', time: '10:30 AM' },
        { id: 2, text: 'Hola, muchacho', sender: 'them', time: '10:31 AM' }
      ]
    },
    {
      id: 2,
      name: 'María López',
      avatar: '/img/maria.webp',
      profileUrl: '/business/perfil',
      lastMessage: 'Estoy interesada en tu maíz.',
      unread: false,
      messages: [
        { id: 1, text: 'Buenos días', sender: 'them', time: '09:15 AM' },
        { id: 2, text: 'Estoy interesada en tu maíz.', sender: 'them', time: '09:16 AM' },
        { id: 3, text: 'Claro, tengo disponible', sender: 'me', time: '09:20 AM' }
      ]
    }
  ]);

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

  const openChat = (chat) => {
    setActiveChat(chat);
    
    setChats(prevChats => 
      prevChats.map(c => 
        c.id === chat.id ? { ...c, unread: false } : c
      )
    );

    if (window.innerWidth < 768) {
      setIsMobileModalOpen(true);
    }
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    if (!activeChat) {
      const newChat = {
        id: Date.now(),
        name: 'Nueva conversación',
        avatar: '/img/user-default.png',
        profileUrl: '/business/perfil',
        lastMessage: messageInput,
        unread: false,
        messages: [
          {
            id: Date.now(),
            text: messageInput,
            sender: 'me',
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      
      setChats(prevChats => [newChat, ...prevChats]);
      setActiveChat(newChat);
    } else {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: 'me',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat.id 
            ? { 
                ...chat, 
                messages: [...chat.messages, newMessage], 
                lastMessage: messageInput 
              }
            : chat
        )
      );
    }

    setMessageInput('');
  };

  const sendModalMessage = () => {
    if (modalMessageInput.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: modalMessageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat.id 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage], 
              lastMessage: modalMessageInput 
            }
          : chat
      )
    );

    setModalMessageInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  useEffect(() => {
    modalMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isMobileModalOpen]);

  const handleMessageKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      if (type === 'desktop') {
        sendMessage();
      } else {
        sendModalMessage();
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
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
              className="w-1/2 py-3 text-center font-semibold border-b-2 border-transparent text-gray-500 hover:text-green-700"
            >
              Notificaciones
            </Link>
            <Link 
              to="/mensajes" 
              className="w-1/2 py-3 text-center font-semibold border-b-2 border-green-700 text-green-700"
            >
              Mensajes
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-lg shadow-md mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[500px]">
        
        <div className="space-y-4 md:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Conversaciones</h2>
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={`bg-white p-4 rounded-lg shadow flex items-center gap-3 cursor-pointer transition-all ${
                activeChat?.id === chat.id ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'
              }`}
              onClick={() => openChat(chat)}
            >
              <img className="w-12 h-12 rounded-full object-cover" src={chat.avatar} alt={chat.name} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-800 truncate">{chat.name}</p>
                  {chat.unread && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 flex flex-col bg-gray-50 rounded-lg shadow">
          {activeChat ? (
            <>
              <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-t-lg">
                <img className="w-10 h-10 rounded-full object-cover" src={activeChat.avatar} alt={activeChat.name} />
                <div className="flex-1">
                  <h3 className="font-bold">{activeChat.name}</h3>
                </div>
                <Link 
                  to={activeChat.profileUrl}
                  className="text-white hover:text-green-200 transition text-sm"
                >
                  <i className="fas fa-user mr-1"></i>
                  Perfil
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64 scrollbar-hide">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'me'
                        ? 'bg-green-700 text-white ml-auto'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-green-200' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center text-gray-500">
                <i className="fas fa-comments text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Selecciona una conversación</h3>
                <p>Elige un chat de la lista o escribe un mensaje para empezar una nueva conversación</p>
              </div>
            </div>
          )}

          <div className="border-t border-gray-300 p-4 bg-white rounded-b-lg">
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                placeholder={
                  activeChat 
                    ? `Escribe un mensaje para ${activeChat.name}...` 
                    : "Escribe un mensaje para empezar una nueva conversación..."
                }
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => handleMessageKeyPress(e, 'desktop')}
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                disabled={!activeChat} 
              />
              <button 
                onClick={sendMessage}
                disabled={!activeChat && messageInput.trim() === ''}
                className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            {!activeChat && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Selecciona una conversación de la lista para enviar mensajes
              </p>
            )}
          </div>
        </div>
      </main>

      {isMobileModalOpen && activeChat && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center md:hidden">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 flex flex-col h-[80vh]">
            <div className="flex items-center gap-3 bg-green-700 text-white px-4 py-3 rounded-t-lg">
              <button 
                onClick={closeMobileModal}
                className="text-white hover:text-gray-200 transition"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <img className="w-10 h-10 rounded-full object-cover" src={activeChat.avatar} alt={activeChat.name} />
              <div className="flex-1">
                <h3 className="font-bold">{activeChat.name}</h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-green-700 text-white ml-auto'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div>{message.text}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-green-200' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </div>
                </div>
              ))}
              <div ref={modalMessagesEndRef} />
            </div>

            <div className="border-t border-gray-300 p-3 bg-white rounded-b-lg">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder={`Escribe un mensaje para ${activeChat.name}...`}
                  value={modalMessageInput}
                  onChange={(e) => setModalMessageInput(e.target.value)}
                  onKeyPress={(e) => handleMessageKeyPress(e, 'mobile')}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                />
                <button 
                  onClick={sendModalMessage}
                  className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition shadow-lg"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-500 py-2 mt-5"></div>

      <footer className="bg-gray-900 text-gray-300 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
          <p>NovaByte © 2025 - Todos los derechos reservados</p>
        </div>
      </footer>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Mensajes;