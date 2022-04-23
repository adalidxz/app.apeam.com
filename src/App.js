
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Entradas from './Pages/Entradas';
import NotFound from './Pages/NotFound';
import Productos from './Pages/Productos';
import Proveedores from './Pages/Proveedores';
import Venta from './Pages/Venta';

function App() {
  return (
      <Router>
          <Routes>
            
            <Route path='/' element={<Layout />}>
              <Route path="productos/*" >
                <Route index element={<Productos />}  />
                <Route path="Inventario/" element={<Entradas />} />
                <Route path="Ventas/" element={<Venta />} />
              </Route>
              {/* <Route path="/proveedores" exact element={<Proveedores />} /> */}
              <Route path="/proveedores" exact element={<Proveedores />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
          </Routes>
      </Router>
  );
}

export default App;
