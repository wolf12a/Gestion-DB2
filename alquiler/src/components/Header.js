import React from "react";
import { Link, NavLink } from 'react-router-dom'

export function Header(){
    return(
        <nav className='nav'>
            <div>
                <Link to='/'>
                    <h1>FastCar</h1>
                </Link>
            </div>
            <div>
                <NavLink className='btn-link btn_home' to='/clientes' >Modulo de clientes</NavLink>
                <NavLink className='btn-link btn_home' to='/alquiler' >Nuevo alquiler</NavLink>
                <NavLink className='btn-link btn_home' to='/finalizar-alquiler' >Finalizar alquiler</NavLink>
                <NavLink className='btn-link btn_home' to='/empleados' >Manejo de Empleado</NavLink>
                <NavLink className='btn-link btn_home' to='/vehiculos' >Inventario de vehiculo</NavLink>
                <NavLink className='btn-link btn_home' to='/mantenimientos' >Mantenimientos de vehiculo</NavLink>
                <NavLink className='btn-link btn_no' to='/mg-alquiler' >Nuevo Alquiler NOSQL</NavLink>
            </div>
          </nav>
    )
}