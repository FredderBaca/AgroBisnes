import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegistroBusiness() {
  const [phoneToggle, setPhoneToggle] = useState(false);
  const [formData, setFormData] = useState({
    responsibleFirstName: '',
    responsibleLastName: '',
    phoneNumber: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessCity: '',
    businessDescription: '',
    businessProfilePicture: null
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'businessProfilePicture') {
      setFormData(prev => ({
        ...prev,
        [id]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handlePhoneToggle = () => {
    setPhoneToggle(!phoneToggle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Formulario de negocio enviado:', formData);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = '/inicio';
    }, 3000);
  };

  const handleGmailLogin = () => {
    console.log('Iniciar sesión con Google');
  };

  return (
    <div 
      className="min-h-screen p-4 flex items-center justify-center"
      style={{
        backgroundImage: `url('/img/fondo1.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Open Sans', sans-serif"
      }}
    >
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full">
          <h1 className="text-green-700 text-4xl font-bold mb-6 text-center">
            Registro de Negocio
          </h1>
          
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Datos del Propietario
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                id="responsibleFirstName"
                placeholder="Nombre del responsable"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                value={formData.responsibleFirstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="responsibleLastName"
                placeholder="Apellido del responsable"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                value={formData.responsibleLastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phoneToggle" className="flex items-center cursor-pointer mb-2">
                <input
                  type="checkbox"
                  id="phoneToggle"
                  className="sr-only peer"
                  checked={phoneToggle}
                  onChange={handlePhoneToggle}
                />
                <span className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></span>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  No tengo número de teléfono
                </span>
              </label>
              
              {!phoneToggle && (
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Número de celular"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  required={!phoneToggle}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              )}
              
              {phoneToggle && (
                <button
                  type="button"
                  onClick={handleGmailLogin}
                  className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-md hover:bg-red-600 transition mt-2"
                >
                  <i className="fab fa-google mr-2"></i> Iniciar sesión con Google
                </button>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Datos del Negocio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                id="businessName"
                placeholder="Nombre del negocio"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                value={formData.businessName}
                onChange={handleInputChange}
              />
              <select
                id="businessType"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                value={formData.businessType}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>A qué campo se dedica</option>
                <option value="agricultor">Agricultor</option>
                <option value="negociante">Negociante</option>
                <option value="ganadero">Ganadero</option>
                <option value="granjero">Granjero</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                id="businessAddress"
                placeholder="Dirección del negocio"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                value={formData.businessAddress}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="businessCity"
                placeholder="Ciudad"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                value={formData.businessCity}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="businessDescription" className="block text-gray-700 font-bold mb-2">
                Descripción de su negocio (opcional)
              </label>
              <textarea
                id="businessDescription"
                rows="4"
                placeholder="Describe tu negocio, productos o servicios..."
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                value={formData.businessDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="businessProfilePicture">
                Foto de Perfil del Negocio
              </label>
              <input
                type="file"
                id="businessProfilePicture"
                accept="image/*"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-md hover:bg-green-800 transition"
            >
              Registrar Negocio
            </button>

            <button
              type="submit"
              className="w-full bg-gray-600 mt-2 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-700 transition"
            >
              Registrar Empresa
            </button>
          </form>

          <div className="border-t border-gray-300 my-6"></div>
          <div className="text-center">
            <Link to="/" className="text-green-600 hover:underline font-bold">
              Cancelar Inscripción
            </Link>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          ¡Registro de negocio exitoso!
        </div>
      )}
    </div>
  );
}