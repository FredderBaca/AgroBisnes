import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PerfilBusiness = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Andrés Bermúdez',
      avatar: '/img/perfil2.jpg',
      time: 'Hace 3 horas',
      content: '¡Cosecha fresca de tomates cherry! 🍅 listos para ser entregados en la ciudad.',
      image: '/img/tomate.jpg',
      likes: 25,
      comments: 8
    }
  ]);

  const [fotoForm, setFotoForm] = useState({
    file: null,
    description: ''
  });

  const [productoForm, setProductoForm] = useState({
    nombre: '',
    detalles: '',
    file: null,
    precio: '',
    duracion: '',
    categoria: ''
  });

  const [profileSettings, setProfileSettings] = useState({
    name: 'Andrés Bermúdez',
    description: 'Ingeniero en Telemática',
    backgroundFile: null,
    profileFile: null
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const productoFileInputRef = useRef(null);

  const searchProduct = () => {
    if (searchQuery.trim() !== '') {
      navigate(`../busqueda?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchProduct();
    }
  };

  const publicarTexto = () => {
    if (postText.trim() === '') return;

    const newPost = {
      id: Date.now(),
      user: 'Andrés Bermúdez',
      avatar: '/img/perfil2.jpg',
      time: 'Ahora mismo',
      content: postText,
      image: null,
      likes: 0,
      comments: 0
    };

    setPosts(prev => [newPost, ...prev]);
    setPostText('');
    showSuccess();
  };

  const publicarFoto = (e) => {
    e.preventDefault();
    if (!fotoForm.file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPost = {
        id: Date.now(),
        user: 'Andrés Bermúdez',
        avatar: '/img/perfil2.jpg',
        time: 'Ahora mismo',
        content: fotoForm.description,
        image: e.target.result,
        likes: 0,
        comments: 0
      };

      setPosts(prev => [newPost, ...prev]);
      setShowFotoModal(false);
      setFotoForm({ file: null, description: '' });
      showSuccess();
    };
    reader.readAsDataURL(fotoForm.file);
  };

  const publicarProducto = (e) => {
    e.preventDefault();
    if (!productoForm.file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPost = {
        id: Date.now(),
        user: 'Andrés Bermúdez',
        avatar: '/img/perfil2.jpg',
        time: 'Ahora mismo',
        content: `Producto: ${productoForm.nombre}`,
        image: e.target.result,
        productDetails: {
          precio: productoForm.precio,
          duracion: productoForm.duracion,
          categoria: productoForm.categoria,
          detalles: productoForm.detalles
        },
        likes: 0,
        comments: 0
      };

      setPosts(prev => [newPost, ...prev]);
      setShowProductoModal(false);
      setProductoForm({
        nombre: '',
        detalles: '',
        file: null,
        precio: '',
        duracion: '',
        categoria: ''
      });
      showSuccess();
    };
    reader.readAsDataURL(productoForm.file);
  };

  const saveProfileChanges = () => {
    if (profileSettings.name.trim()) {
      setProfileSettings(prev => ({ ...prev, name: profileSettings.name }));
    }
    if (profileSettings.description.trim()) {
      setProfileSettings(prev => ({ ...prev, description: profileSettings.description }));
    }
    setShowSettingsModal(false);
    showSuccess();
  };

  const showSuccess = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };

  const handleFotoChange = (e) => {
    const { name, value, files } = e.target;
    setFotoForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleProductoChange = (e) => {
    const { name, value, files } = e.target;
    setProductoForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSettingsChange = (e) => {
    const { name, value, files } = e.target;
    setProfileSettings(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const removeFotoFile = () => {
    setFotoForm(prev => ({ ...prev, file: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeProductoFile = () => {
    setProductoForm(prev => ({ ...prev, file: null }));
    if (productoFileInputRef.current) productoFileInputRef.current.value = '';
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white">
            <Link to="/inicio">
              <h1 className="text-4xl font-bold text-black">Agro<span className="text-green-700 font-bold">Bisnes</span></h1>
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link to="../inicio" className="text-black hover:text-green-700 font-bold transition-colors">Inicio</Link>
              <Link to="../productos" className="text-black hover:text-green-700 font-bold transition-colors">Productos</Link>
              <Link to="../notificacion" className="text-black text-lg hover:text-green-700 font-bold transition-colors">Notificaciones</Link>
              <Link to="/business/perfil" className="text-black text-lg border-b-2 border-green-700 hover:text-green-700 font-bold transition-colors">Perfil</Link>
            </nav>
          </div>
        </div>
        <div className="bg-green-700 py-2"></div>

        <section className="py-6">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Buscar productos o usuarios..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-green-700"
              />
              <button 
                onClick={searchProduct}
                className="bg-green-700 px-4 py-2 rounded-r-full text-white hover:bg-green-800 transition"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </section>
      </header>

      <main className="max-w-4xl mx-auto mt-6 md:mt-10 px-4 md:px-0">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="relative h-40 md:h-64 bg-cover bg-center mb-20 mt-0" 
            style={{ backgroundImage: "url('/img/Fondo.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>

          <div className="p-4 md:p-6 -mt-16 md:-mt-20 flex flex-col items-center md:items-start md:flex-row">
            <img 
              onClick={() => setShowProfilePicModal(true)}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer" 
              src="/img/perfil2.jpg" 
              alt="Foto de Perfil" 
            />
            <div className="mt-4 md:mt-12 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{profileSettings.name}</h1>
              <p className="text-gray-500">{profileSettings.description}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-gray-500">
                <i className="fas fa-map-marker-alt"></i>
                <span>León, Nicaragua</span>
              </div>
            </div>
            <div className="mt-4 md:mt-12 md:ml-auto flex gap-3">
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
              >
                <i className="fa-solid fa-gear"></i> Ajustes
              </button>
              <Link to="../mensajes">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                  <i className="fas fa-envelope mr-1"></i> Mensajería
                </button>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 md:mt-0 px-4 md:px-6 py-3 flex justify-center md:justify-start gap-6">
            <Link to="/business/perfil" className="text-green-700 font-bold border-b-2 border-green-700 pb-2">
              Publicaciones
            </Link>
            <Link to="/business/producto_perfil" className="text-gray-600 font-semibold hover:text-green-700 transition">
              Productos
            </Link>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Acerca de</h3>
              <p className="text-gray-600 mb-4">
                Soy un productor agrícola apasionado por cultivar productos orgánicos frescos. Mis cosechas de verduras y frutas están disponibles para la venta.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-briefcase w-5"></i>
                  <span>Produce verduras orgánicas en Finca El Huerto</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-graduation-cap w-5"></i>
                  <span>Estudió en la UNAN-León</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-home w-5"></i>
                  <span>Vive en León, Nicaragua</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-heart w-5"></i>
                  <span>Estado de ánimo: Chambeando</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-map-marked-alt text-green-700 text-2xl"></i>
                  <p className="text-gray-600">Finca El Huerto, León, Nicaragua</p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone-alt text-green-700 text-2xl"></i>
                  <p className="text-gray-600">+505 8888-8888</p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-star text-green-700 text-2xl"></i>
                  <div>
                    <div className="flex items-center text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <p className="text-sm text-gray-500">4.5 de 5</p>
                  </div>
                </div>
              </div>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition mt-4 w-full">
                Calificar Negocio
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-3">
                <img className="w-10 h-10 rounded-full object-cover" src="/img/perfil2.jpg" alt="Foto de perfil" />
                <input 
                  type="text" 
                  placeholder="¿Qué estás cosechando hoy, Andrés?" 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none text-sm"
                />
              </div>
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowFotoModal(true)}
                    className="text-gray-500 hover:text-green-700 transition"
                  >
                    <i className="fas fa-image mr-1"></i> Foto
                  </button>
                  <button 
                    onClick={() => setShowProductoModal(true)}
                    className="text-gray-500 hover:text-green-700 transition"
                  >
                    <i className="fas fa-tag mr-1"></i> Producto
                  </button>
                </div>
                <button 
                  onClick={publicarTexto}
                  className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-green-800 transition"
                >
                  Publicar
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full object-cover" src={post.avatar} alt="Foto de Perfil" />
                      <div>
                        <h4 className="font-bold text-gray-900">{post.user}</h4>
                        <span className="text-xs text-gray-500">{post.time}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                  <p className="mt-4 text-gray-700">{post.content}</p>
                  {post.image && (
                    <img className="mt-4 rounded-lg w-full object-cover" src={post.image} alt="Imagen de la publicación" />
                  )}
                  {post.productDetails && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 font-semibold">Precio: C${post.productDetails.precio}</p>
                      <p className="text-gray-600 text-sm">Duración: {post.productDetails.duracion == 0 ? "Ilimitada" : post.productDetails.duracion + " meses"}</p>
                      <p className="text-gray-600 text-sm">Categoría: {post.productDetails.categoria}</p>
                      {post.productDetails.detalles && (
                        <p className="text-gray-600 text-sm mt-2">{post.productDetails.detalles}</p>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between items-center text-gray-500 mt-4 border-t pt-3">
                    <div className="flex items-center gap-4">
                      <button className="hover:text-green-700 transition">
                        <i className="fas fa-thumbs-up mr-1"></i> 
                        <span>{post.likes} Me gusta</span>
                      </button>
                      <button className="hover:text-green-700 transition">
                        <i className="fas fa-comment mr-1"></i> 
                        <span>{post.comments} Comentarios</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showProfilePicModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <button 
              onClick={() => setShowProfilePicModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 hover:scale-110 shadow-lg"
            >
              ×
            </button>
            <img 
              src="/img/perfil2.jpg" 
              alt="Foto de Perfil" 
              className="w-full h-auto object-contain max-h-[80vh]" 
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button 
                onClick={() => setShowProfilePicModal(false)}
                className="bg-gray-800/80 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-auto relative">
            <button 
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              ×
            </button>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Ajustes del Perfil</h3>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Cambiar fondo</label>
                <input 
                  type="file" 
                  name="backgroundFile"
                  onChange={handleSettingsChange}
                  className="w-full text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Cambiar foto de perfil</label>
                <input 
                  type="file" 
                  name="profileFile"
                  onChange={handleSettingsChange}
                  className="w-full text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Cambiar nombre</label>
                <input 
                  type="text" 
                  name="name"
                  value={profileSettings.name}
                  onChange={handleSettingsChange}
                  className="w-full text-gray-700 rounded-lg p-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  placeholder="Nuevo nombre"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Editar descripción</label>
                <textarea 
                  name="description"
                  value={profileSettings.description}
                  onChange={handleSettingsChange}
                  className="w-full text-gray-700 rounded-lg p-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  rows="3"
                  placeholder="Nueva descripción"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={saveProfileChanges}
                className="bg-green-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {showFotoModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowFotoModal(false)}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Subir Foto</h2>
            <form onSubmit={publicarFoto} className="space-y-4">
              <div>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  name="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
                {fotoForm.file && (
                  <button 
                    type="button" 
                    onClick={removeFotoFile}
                    className="text-red-600 text-sm mt-2 hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-trash mr-1"></i>Eliminar imagen
                  </button>
                )}
              </div>
              <div>
                <textarea 
                  name="description"
                  value={fotoForm.description}
                  onChange={handleFotoChange}
                  placeholder="Descripción de la foto..."
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  rows="3"
                />
                {fotoForm.description && (
                  <button 
                    type="button" 
                    onClick={() => setFotoForm(prev => ({ ...prev, description: '' }))}
                    className="text-red-600 text-sm mt-2 hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-trash mr-1"></i>Eliminar descripción
                  </button>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowFotoModal(false)}
                  className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
                >
                  <i className="fas fa-upload mr-2"></i>Subir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProductoModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowProductoModal(false)}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Publicar Producto</h2>
            <form onSubmit={publicarProducto} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  name="nombre"
                  value={productoForm.nombre}
                  onChange={handleProductoChange}
                  placeholder="Nombre del producto"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
              <div>
                <textarea 
                  name="detalles"
                  value={productoForm.detalles}
                  onChange={handleProductoChange}
                  placeholder="Detalles del producto..."
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  rows="3"
                />
              </div>
              <div>
                <input 
                  ref={productoFileInputRef}
                  type="file" 
                  name="file"
                  accept="image/*"
                  onChange={handleProductoChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
                {productoForm.file && (
                  <button 
                    type="button" 
                    onClick={removeProductoFile}
                    className="text-red-600 text-sm mt-2 hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-trash mr-1"></i>Eliminar imagen
                  </button>
                )}
              </div>
              <div>
                <input 
                  type="number" 
                  name="precio"
                  value={productoForm.precio}
                  onChange={handleProductoChange}
                  placeholder="Precio (C$)"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
              </div>
              <div>
                <select 
                  name="duracion"
                  value={productoForm.duracion}
                  onChange={handleProductoChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Seleccione duración</option>
                  <option value="1">1 mes</option>
                  <option value="6">6 meses</option>
                  <option value="12">1 año</option>
                  <option value="0">Ilimitado</option>
                </select>
              </div>
              <div>
                <select 
                  name="categoria"
                  value={productoForm.categoria}
                  onChange={handleProductoChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Seleccione categoría</option>
                  <option>Granos básicos</option>
                  <option>Frutas</option>
                  <option>Verduras</option>
                  <option>Otros</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowProductoModal(false)}
                  className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
                >
                  <i className="fas fa-tag mr-2"></i>Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {showSuccessToast && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 transition-opacity duration-500">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-lg text-center">
            <i className="fa-solid fa-circle-check text-green-600 text-5xl mb-2"></i>
            <p className="text-lg font-bold text-gray-800">¡Listo!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilBusiness;