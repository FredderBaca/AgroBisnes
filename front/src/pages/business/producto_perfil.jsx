import { useState } from 'react';
import { Link } from 'react-router-dom';

const PerfilProducto = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [promotingProduct, setPromotingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Saco de Arroz',
      image: '/img/arrozf.jpeg',
      description: 'Fresco de temporada',
      price: 'C$ 200'
    },
    {
      id: 2,
      name: 'Saco de Maíz',
      image: '/img/sacoMaiz.webp',
      description: 'Grano básico nacional',
      price: 'C$ 180'
    },
    {
      id: 3,
      name: 'Saco de Maní',
      image: '/img/mani.jpg',
      description: 'Grano de exportación',
      price: 'C$ 220'
    },
    {
      id: 4,
      name: 'Canasta de Vegetales',
      image: '/img/canastas.jpeg',
      description: 'Frescos de temporada',
      price: 'C$ 150'
    },
    {
      id: 5,
      name: 'Saco de Frijol',
      image: '/img/frijoles.jpg',
      description: 'Grano rojo de primera',
      price: 'C$ 210'
    },
    {
      id: 6,
      name: 'Botellas de Leche',
      image: '/img/leche.jpeg',
      description: 'Leche fresca pasteurizada',
      price: 'C$ 80'
    },
    {
      id: 7,
      name: 'Frascos de Miel',
      image: '/img/miel.jpeg',
      description: 'Miel 100% natural',
      price: 'C$ 120'
    }
  ]);

  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    image: null
  });

  const [promoteForm, setPromoteForm] = useState({
    price: '',
    duration: ''
  });

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price.replace('C$ ', ''),
      image: null
    });
    setShowEditModal(true);
  };

  const openPromoteModal = (product) => {
    setPromotingProduct(product);
    setPromoteForm({ price: '', duration: '' });
    setShowPromoteModal(true);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowPromoteModal(false);
    setEditingProduct(null);
    setPromotingProduct(null);
  };

  const showSuccess = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };

  const saveChanges = () => {
    if (editingProduct) {
      setProducts(products.map(product =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: editForm.name,
              price: `C$ ${editForm.price}`,
              image: editForm.image ? URL.createObjectURL(editForm.image) : product.image
            }
          : product
      ));
    }
    closeModals();
    showSuccess();
  };

  const savePromotion = () => {
    console.log('Promoción guardada:', promoteForm);
    closeModals();
    showSuccess();
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    showSuccess();
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handlePromoteChange = (e) => {
    const { name, value } = e.target;
    setPromoteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
            <Link to="/inicio">
              <h1 className="text-4xl font-bold text-black">Agro<span className="text-green-700">Bisnes</span></h1>
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link to="/inicio" className="text-black hover:text-green-700 font-bold">Inicio</Link>
              <Link to="/productos" className="text-black hover:text-green-700 font-bold">Productos</Link>
              <Link to="/notificacion" className="text-black hover:text-green-700 font-bold">Notificaciones</Link>
              <Link to="/business/perfil" className="text-green-700 border-b-2 border-green-700 font-bold">Perfil</Link>
            </nav>
          </div>
        </div>
        <div className="bg-green-700 py-2"></div>
      </header>

      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto mt-6 md:mt-10">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="relative h-40 md:h-64 bg-cover bg-center mb-20" 
              style={{ backgroundImage: "url('/img/Fondo.png')" }}
            >
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div className="p-4 md:p-6 -mt-16 md:-mt-20 flex flex-col items-center md:items-start md:flex-row">
              <img 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover" 
                src="/img/perfil2.jpg" 
                alt="Foto de Perfil" 
              />
              <div className="mt-4 md:mt-12 md:ml-6 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">Andrés Bermúdez</h1>
                <p className="text-gray-500">Ingeniero en Telemática</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-gray-500">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>León, Nicaragua</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-4 md:mt-0 px-4 md:px-6 py-3 flex justify-center md:justify-start gap-6">
              <Link to="/business/perfil" className="text-gray-600 hover:text-green-700 font-semibold">
                Publicaciones
              </Link>
              <Link to="/business/producto_perfil" className="text-green-700 font-bold border-b-2 border-green-700 pb-2">
                Productos
              </Link>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-center mb-10">Productos publicados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group relative cursor-pointer border rounded-xl p-4 shadow-md hover:shadow-lg transition bg-white"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="rounded-lg w-full h-32 object-cover mb-4"
                />
                <h3 className="text-md font-bold truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                <span className="text-green-700 font-bold">{product.price}</span>
                
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity">
                  <button 
                    onClick={() => openEditModal(product)}
                    className="w-2/3 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="w-2/3 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Eliminar
                  </button>
                  <button 
                    onClick={() => openPromoteModal(product)}
                    className="w-2/3 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Promocionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-2xl font-bold text-center mb-4">Editar Producto</h3>
            <input 
              type="file" 
              name="image"
              onChange={handleEditChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input 
              type="text" 
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Nuevo nombre"
              className="w-full mb-3 p-2 border rounded"
            />
            <input 
              type="text" 
              name="price"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Nuevo precio"
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-between gap-4">
              <button 
                onClick={closeModals}
                className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={saveChanges}
                className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPromoteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-2xl font-bold text-center mb-4">Promocionar Producto</h3>
            <input 
              type="number" 
              name="price"
              value={promoteForm.price}
              onChange={handlePromoteChange}
              placeholder="Nuevo precio de oferta"
              className="w-full mb-3 p-2 border rounded"
            />
            <input 
              type="text" 
              name="duration"
              value={promoteForm.duration}
              onChange={handlePromoteChange}
              placeholder="Duración de la oferta"
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-between gap-4">
              <button 
                onClick={closeModals}
                className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={savePromotion}
                className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
            <i className="fa-solid fa-circle-check text-green-600 text-4xl mb-2"></i>
            <p className="text-lg font-bold text-gray-800">¡Acción realizada con éxito!</p>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default PerfilProducto;