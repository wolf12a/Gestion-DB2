import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Empleado from './components/Empleado'
import Vehiculo from './components/Vehiculo'
import Cliente from './components/Cliente'
import Home from './components/Home'
import Alquiler from './components/Alquiler'
import Nuevo from './components/Nuevo'
import AlquilerFin from './components/AlquilerFin'
import Mantenimiento from './components/Mantenimiento';
import MgAlquiler from './components/MgAlquiler';
require('react-dom');
function App() {

  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/empleados' element={<Empleado />}/>
          <Route path='/vehiculos' element={<Vehiculo />}/>
          <Route path='/clientes' element={<Cliente />}/>
          <Route path='/alquiler' element={<Alquiler />}/>
          <Route path='/mg-alquiler' element={<MgAlquiler />}/>
          <Route path='/finalizar-alquiler' element={<AlquilerFin />}/>
          <Route path='/mantenimientos' element={<Mantenimiento />}/>
          <Route path='/tipo' element={<Nuevo nombre={"tipo"} />}/>
          <Route path='/titulo' element={<Nuevo nombre={"titulo"} />}/>
          <Route path='/genero' element={<Nuevo nombre={"genero"} />}/>
          <Route path='/ciudad' element={<Nuevo nombre={"ciudad"}/>}/>
          <Route path='/auspiciante' element={<Nuevo nombre={"auspiciante"} />}/>
          <Route path='/modelo' element={<Nuevo nombre={"modelo"} />}/>
          <Route path='/marca' element={<Nuevo nombre={"marca"} />}/>
          <Route path='/seguro' element={<Nuevo nombre={"seguro"} />}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
