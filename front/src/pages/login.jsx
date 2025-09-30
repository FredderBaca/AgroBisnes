import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage(false);
    setSuccessMessage(false);

    if (email.trim() === "" || password.trim() === "" || !email.includes("@")) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    } else {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        window.location.href = "inicio.html";
      }, 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-no-repeat"
      style={{ backgroundImage: "url(/img/fondo1.jpg)" }}
    >
      <div className="flex flex-col items-center w-full max-w-sm">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full">
          <h1 className="text-green-700 text-5xl font-bold mb-6 text-center">
            Agro<span className="text-black">Bisnes</span>
          </h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico o número de teléfono"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-md hover:bg-green-800 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          <a
            href="#"
            className="block text-center text-green-600 hover:underline mt-4"
          >
            ¿Olvidaste tu contraseña?
          </a>
          <div className="border-t border-gray-300 my-6"></div>

          <div className="text-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-500 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 transition"
            >
              Crear cuenta nueva
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="fixed bottom-8 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg">
          Por favor, ingresa un correo y contraseña válidos.
        </div>
      )}
      {successMessage && (
        <div className="fixed bottom-8 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          ¡Inicio de sesión exitoso! Redireccionando...
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white p-8 rounded-lg shadow-xl relative w-full max-w-sm mx-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-5 text-gray-500 hover:text-gray-800 text-2xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              ¿Cómo quieres registrarte?
            </h2>
            <div className="flex flex-col space-y-4">
             <Link 
             to="/user/registro"
             className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-md text-center hover:bg-green-800 transition"
             >
              Registrarse como Usuario
             </Link>

              <Link 
              to="/business/registro"
              className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-md text-center hover:bg-gray-600 transition"
              >
                Registrarse como Negocio
              </Link>

            </div>
            <div className="w-full bg-white mt-8">
              <img src="/img/trap.png" alt="Trap" />
            </div>
            <div className="bg-amber-500 py-1"></div>
          </div>
        </div>
      )}
    </div>
  );
}
