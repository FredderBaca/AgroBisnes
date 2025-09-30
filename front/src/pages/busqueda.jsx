import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Busqueda = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const data = [
    { nombre: "Saco de Arroz", tipo: "producto", descripcion: "Grano fresco de temporada", img: "/img/arrozf.jpeg" },
    { nombre: "Saco de Maíz", tipo: "producto", descripcion: "Grano básico nacional", img: "/img/sacoMaiz.webp" },
    { nombre: "Andres Bermudez", tipo: "usuario", descripcion: "Ganadero", img: "/img/perfil2.jpg" },
    { nombre: "Jacinto Barba", tipo: "usuario", descripcion: "Ganadero", img: "/img/jacinto.jpeg" },
    { nombre: "Saco de Trigo", tipo: "producto", descripcion: "Grano de alta calidad", img: "/img/sacoMaiz.webp" },
    { nombre: "Saco de Frijol", tipo: "producto", descripcion: "Frijol negro premium", img: "/img/sacoMaiz.webp" },
    { nombre: "Saco de Café", tipo: "producto", descripcion: "Café orgánico", img: "/img/sacoMaiz.webp" },
    { nombre: "Saco de Cebada", tipo: "producto", descripcion: "Cebada para malta", img: "/img/sacoMaiz.webp" },
    { nombre: "Saco de Avena", tipo: "producto", descripcion: "Avena integral", img: "/img/sacoMaiz.webp" },
    { nombre: "Saco de Soja", tipo: "producto", descripcion: "Soja no transgénica", img: "/img/sacoMaiz.webp" },
    { nombre: "Carlos Rojas", tipo: "usuario", descripcion: "Agricultor", img: "/img/sacoMaiz.webp" },
    { nombre: "Marta Bermudez", tipo: "usuario", descripcion: "Productora de lácteos", img: "/img/maria.webp" }
  ];

  const searchProduct = (query = null) => {
    const q = (query || searchQuery || "").toLowerCase().trim();
    
    if (q === '') {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const filteredResults = data.filter(item => 
      item.nombre.toLowerCase().includes(q)
    );
    
    setResults(filteredResults);
    setHasSearched(true);

    if (q) {
      setSearchParams({ q });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
      searchProduct(q);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      searchProduct();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <Link to="/inicio" className="text-3xl font-bold text-black mb-4 md:mb-0">
            Agro<span className="text-green-700">Bisnes</span>
          </Link>
          
          <div className="flex w-full md:w-auto max-w-md">
            <input 
              id="searchInput"
              type="text" 
              placeholder="Buscar productos o usuarios..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleSearch}
              className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-green-700"
            />
            <button 
              onClick={handleSearch}
              className="bg-green-700 px-4 py-2 rounded-r-full text-white hover:bg-green-800 transition-colors"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          <Link to="/inicio" className="text-green-700 font-bold hover:underline mt-4 md:mt-0">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">
          {hasSearched && searchQuery ? `Resultados para "${searchQuery}"` : 'Resultados de búsqueda'}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasSearched ? (
            results.length > 0 ? (
              results.map((result, index) => {
                const link = result.tipo === "usuario"
                  ? `/business/perfil?id=${encodeURIComponent(result.nombre)}`
                  : `/productos?id=${encodeURIComponent(result.nombre)}`;

                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition animate-fadeIn"
                  >
                    <Link to={link}>
                      <img 
                        src={result.img} 
                        className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition" 
                        alt={result.nombre}
                      />
                    </Link>
                    <div>
                      <h3 className="text-lg font-bold">{result.nombre}</h3>
                      <p className="text-gray-600">{result.descripcion}</p>
                      <span className={`text-sm px-2 py-1 rounded ${
                        result.tipo === "usuario" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {result.tipo}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center bg-white p-10 rounded-lg shadow animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-700">❌ Dato no encontrado</h3>
                <p className="text-gray-500 mt-2">
                  No se encontraron resultados para <span className="font-semibold">"{searchQuery}"</span>.
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  Intenta con otros términos de búsqueda.
                </p>
              </div>
            )
          ) : (
            <div className="col-span-full text-center bg-white p-10 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-700">🔍 Realiza una búsqueda</h3>
              <p className="text-gray-500 mt-2">
                Escribe en la barra de búsqueda para encontrar productos o usuarios.
              </p>
            </div>
          )}
        </div>

        {hasSearched && results.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>Se encontraron {results.length} resultado{results.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Busqueda;