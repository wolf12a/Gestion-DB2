import React from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const goCliente = () => {
        navigate('/clientes')
    }
    const goAlquiler = () => {
        navigate('/alquiler')
    }
    const goMongoAlquiler = () => {
        navigate('/mg-alquiler')
    }
    const goAlquilerFin = () => {
        navigate('/finalizar-alquiler')
    }
    const goEmpleados = () => {
        navigate('/empleados')
    }
    const goVehiculos = () => {
        navigate('/vehiculos')
    }
    const goMantenimientos = () => {
        navigate('/mantenimientos')
    }


    return (
        <div className='center'>
          <h2>Inicio FastCar</h2>
          <button className='btn btn_home' onClick={goCliente}>Modulo de clientes</button>  
          <button className='btn btn_home' onClick={goAlquiler}>Nuevo alquiler</button> 
          <button className='btn btn_home' onClick={goAlquilerFin}>Finalizar alquiler</button> 
          <button className='btn btn_home' onClick={goEmpleados}>Manejo de Empleado</button>  
          <button className='btn btn_home' onClick={goVehiculos}>Inventario de vehiculo</button>  
          <button className='btn btn_home' onClick={goMantenimientos}>Mantenimientos de vehiculo</button>  
          <button className='btn btn_no' onClick={goMongoAlquiler}>Nuevo Alquiler NOSQL</button>  
        </div>
    )
}

export default Home
