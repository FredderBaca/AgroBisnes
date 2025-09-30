import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Inicio from "./pages/inicio";
import Busqueda from "./pages/busqueda";
import Productos from "./pages/productos";
import Ofertas from "./pages/ofertas";
import Estadisticas from "./pages/estadistica";
import Notificacion from "./pages/notificacion";
import Mensajes from "./pages/mensajes";
import PerfilBusiness from "./pages/business/perfil";
import PerfilProducto from "./pages/business/producto_perfil";

import RegistroBusiness from "./pages/business/registro";
import RegistroUsuario from "./pages/user/registro"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

       <Route path="/user/registro" element={<RegistroUsuario />} />
       <Route path="/business/registro" element={<RegistroBusiness />} />
       <Route path="/inicio" element={<Inicio />} />
       <Route path="/busqueda" element={<Busqueda />} />
       <Route path="/productos" element={<Productos />} />
       <Route path="/ofertas" element={<Ofertas />} />
       <Route path="/estadistica" element={<Estadisticas />} />
       <Route path="/notificacion" element={<Notificacion />} />
       <Route path="/mensajes" element={<Mensajes />} />
       <Route path="/business/perfil" element={<PerfilBusiness />} />
       <Route path="/business/producto_perfil" element={<PerfilProducto />} />

    </Routes>
  );
}

export default App;
