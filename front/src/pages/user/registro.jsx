import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function RegistroUsuario() {
  const [useGmail, setUseGmail] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    age: "",
    profilePicture: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Formulario enviado:", {
      ...formData,
      contact: useGmail ? "Gmail" : formData.phoneNumber,
    });

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("../inicio");
    }, 3000);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundImage: "url(/img/fondo1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-lg">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full">
          <h1 className="text-green-700 text-4xl font-bold mb-6 text-center">
            Registro de Usuario
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={useGmail}
                  onChange={() => setUseGmail(!useGmail)}
                  className="sr-only peer"
                />
                <span className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></span>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  No tengo número de teléfono
                </span>
              </label>

              {!useGmail ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Número de teléfono"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  required
                />
              ) : (
                <button
                  type="button"
                  className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-md hover:bg-red-600 transition mt-2 flex justify-center items-center"
                >
                  <i className="fab fa-google mr-2"></i> Iniciar sesión con
                  Google
                </button>
              )}
            </div>

            <div className="mb-4">
              <input
                type="number"
                name="age"
                placeholder="¿Cuántos años tiene?"
                min="1"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Foto de Perfil
              </label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-md hover:bg-green-800 transition"
            >
              Registrarse
            </button>
          </form>

          <div className="border-t border-gray-300 my-6"></div>
          <div className="text-center">
            <a href="/" className="text-green-600 hover:underline font-bold">
              Cancelar Inscripción
            </a>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          ¡Registro exitoso! Redirigiendo...
        </div>
      )}
    </div>
  );
}